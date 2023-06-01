import { useState, useEffect } from 'react';
import { FlatList, View, Alert } from 'react-native';
import { Container, ContainerLoading, ContainerTreinos, ContainerExercicios, Header, DivideView } from "./styles";

import { CardItem } from "@components/CardItem";
import { Button } from "@components/Button";
import { SmallButton } from "@components/SmallButton";
import { Loading } from '@components/Loading';

import { Treino } from '@dtos/Treino';
import { Exercicio, SerializeExercicio } from '@dtos/Exercicio';

import { api } from '@services/api';

import { GetTreinosStorage, SetTreinosStorage, GetTreinoSelecionado , SetTreinoSelecionadoStorage } from '@storage/treino/storageTreino';
import { GetExerciciosStorage, SetExerciciosStorage } from '@storage/exercicio/storageExercicio';

export function Home(){
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [treinos, setTreinos] = useState<Treino[]>([]);
    const [treinoSelecionado, setTreinoSelecionado] = useState<string>("");
    const [exercicios, setExercicios] = useState<Exercicio[]>([]);

    async function BuscaTreinosAndExercicios(){

        setIsLoading(true);
        
        let treinosStorage: Treino[] = await GetTreinosStorage();

        if(treinosStorage !== null && treinosStorage.length > 0) {

            console.log("PEGOU TREINO DO DISPOSITIVO")

            setTreinos(treinosStorage);
            await BuscaExerciciosPorTreino(treinosStorage);
            return;
        }

        console.log("CHAMOU API PRA TREINO");

        const treinosAPI: Treino[] = await fetchGetTreinos();
        setTreinos(treinosAPI);
        await SetTreinosStorage(treinos);
        
        await BuscaExerciciosPorTreino(treinosAPI);
    } 

    async function BuscaExerciciosPorTreino(treinosParam: Treino[]){
        try {
            let exerciciosStorage: Exercicio[] = await GetExerciciosStorage();

            if(exerciciosStorage !== null && exerciciosStorage.length > 0) {

                console.log("PEGOU EXERCICIO DO DISPOSITIVO")

                setExercicios(exerciciosStorage); 

                let treinoSelecionadoStorage: string = await GetTreinoSelecionado() as string;

                setTreinoSelecionado(treinoSelecionadoStorage);
                setIsLoading(false);

                return;
            }
            
            console.log("CHAMOU API PRA EXERCICIOS")

            await fetchGetExercicios(treinosParam);
            await SetExerciciosStorage(exercicios);

            setIsLoading(false);
            
            return;
        } catch (error) {
            throw error;
        } 
    } 

    async function fetchGetTreinos(): Promise<Treino[]> {
        try {

            let treinos: Treino[] = [];

            await api.get("/blocks/40c882c189644ca595e386bce54ca823/children?page_size=10")
            .then((result) => {
                for (let i = 0; i < result.data.results.length; i++) {  
                    
                    const id = result.data.results[i].id;
                    const letra = result.data.results[i].toggle.rich_text[0].plain_text;
    
                    if(letra !== undefined)
                        treinos.push({ id, letra });
                }
            });  
            
            return treinos;
        } catch (error) {
            throw error;
        }
    }

    async function fetchGetExercicios(treinosParam: Treino[]){
        try {
            let exercicios: Exercicio[] = [];

            for (let i = 0; i < treinosParam.length; i++) {
                
                let exerciciosPorTreino: Exercicio[] = await fetchGetExerciciosPorTreino(
                    treinosParam[i].id, treinosParam[i].letra);
                
                exercicios.push( ...exerciciosPorTreino);
            }

            setExercicios(exercicios);

            setTreinoSelecionado(treinosParam[0].letra);
            await SetTreinoSelecionadoStorage(treinoSelecionado);

        } catch (error) {
           throw error; 
        }
    }

    async function fetchGetExerciciosPorTreino(id: string, letra: string){
        const exercicios: Exercicio[] = [];

        await api.get(`/blocks/${id}/children?page_size=10`)
        .then((result) => {

            const exerciciosTexto : string[] = result.data.results[0].paragraph.rich_text[0].plain_text.split("|");

            for (let i = 0; i < exerciciosTexto.length; i++) {
                if(exerciciosTexto[i] !== ""){
                    exercicios.push(
                        SerializeExercicio(exerciciosTexto[i].trim(), letra)
                    )
                }
            }
        })

        return exercicios;
    }

    async function handleEscolheTreino(letra: string){
        try {
            
            setTreinoSelecionado(letra);
            await SetTreinoSelecionadoStorage(letra);
            
        } catch (error) {
            
        }
    }

    async function handleMarcaExercicioRealizado(exercicioModificado: Exercicio){
        let novosExercicios: Exercicio[] = [];

        for (let i = 0; i < exercicios.length; i++) {
            if(exercicios[i].nome === exercicioModificado.nome &&
               exercicios[i].letra === exercicioModificado.letra)
            {
                novosExercicios.push(
                    {
                        letra: exercicioModificado.letra,
                        nome: exercicioModificado.nome,
                        tipoDeTreino: exercicioModificado.tipoDeTreino,
                        foiRealizado: !exercicioModificado.foiRealizado
                    }
                );   
            }
            else
            { novosExercicios.push(exercicios[i]); }
        }

        setExercicios(novosExercicios);
        await SetExerciciosStorage(novosExercicios);

        console.log("MARCOU COMO REALIZADO"); 

        return;
    }

    async function handleFinalizaTreino(){
        try {
            
            const indiceAtual = treinos.findIndex(x => x.letra === treinoSelecionado);

            let proximoIndice = 0;

            if(indiceAtual + 1 !== treinos.length)
                proximoIndice = indiceAtual + 1;

            const proximaLetra = treinos[proximoIndice].letra;

            await desmarcaTodosOsTreinos();

            setTreinoSelecionado(proximaLetra);
            await SetTreinoSelecionadoStorage(proximaLetra);

            return;
        } catch (error) {
            throw error;
        }
    }

    function handleLimpaDadosStorage(){

        Alert.alert("Apagar Dados Treinos", "Desja apagar os dados para busca-los novamente?", [
            { text: "Sim", onPress: ()=> {
                Alert.alert("Apagar Dados Treinos", "Desja REALMENTE apagar os dados para busca-los novamente?", [
                    { text: "Sim", onPress: ()=> {
                            limpaDadosStorage();
                        } 
                    },
                    { text: "Não", style: "cancel" }
                ]);
                } 
            },
            { text: "Não", style: "cancel" }
        ]); 
    }

    async function desmarcaTodosOsTreinos(){
        let novosExercicios: Exercicio[] = [];

        for (let i = 0; i < exercicios.length; i++) {
            let exercicioParaDesmarcar = exercicios[i];
            exercicioParaDesmarcar.foiRealizado = false;

            novosExercicios.push(exercicioParaDesmarcar);
        }

        setExercicios(novosExercicios);
        await SetExerciciosStorage(novosExercicios);

        console.log("DESMARCOU TODOS OS TREINOS"); 

        return;
    }

    async function limpaDadosStorage() {
        setIsLoading(true);

        await SetExerciciosStorage([]);
        setExercicios([]);

        await SetTreinoSelecionadoStorage("");
        setTreinoSelecionado("");

        await SetTreinosStorage([]);
        setTreinos([]);

        await BuscaTreinosAndExercicios();
    }

    useEffect(() => {
        BuscaTreinosAndExercicios(); 
    }, []);

    return( 

        <Container>
            
            {
                isLoading ? 
                
                <ContainerLoading>
                    <Loading/> 
                </ContainerLoading>
                
                : 

                <View>
                    <Header>Treinos</Header>

                    <ContainerTreinos>
                        <FlatList
                            data={treinos}
                            keyExtractor={ item => item.id }
                            renderItem={({item}) => (
                                <SmallButton 
                                 type={ treinoSelecionado === item.letra ? "SECONDARY" : "PRIMARY" }
                                 letra={item.letra} 
                                 onPress={() => {
                                    handleEscolheTreino(item.letra);
                                 }}
                                />
                            )}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            horizontal
                        />
                    </ContainerTreinos>

                    <ContainerExercicios>
                            <FlatList
                             data={ exercicios.filter( x => x.letra ===  treinoSelecionado)}
                             keyExtractor={ item => item.nome }
                             renderItem={ ({item}) => (
                                <CardItem 
                                    letra={item.letra}
                                    nome={item.nome}
                                    tipoDeTreino={item.tipoDeTreino}
                                    foiRealizado={item.foiRealizado}
                                    onPress={
                                        () => {
                                            handleMarcaExercicioRealizado(item)
                                        }
                                    }
                                />
                                ) 
                            }
                        />
                    
                    </ContainerExercicios>
                    
                    <DivideView>
                        <Button
                            descricao='Finalizar treino' 
                            onPress={handleFinalizaTreino}
                        />

                        <Button 
                            type='CANCEL'
                            onPress={handleLimpaDadosStorage}
                        />
                    </DivideView>
                </View>
            }
      
        </Container>
    );
}