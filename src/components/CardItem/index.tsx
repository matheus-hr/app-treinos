import { Container, Texto, Linha, DadosGroup, DivideView } from "./styles";
import { ToggleSwitch } from "@components/ToggleSwitch";

import { Exercicio } from "@dtos/Exercicio";

type CardProps = Exercicio & {
    onPress: (exercicio: Exercicio) => void;
}

export function CardItem({ nome, tipoDeTreino, foiRealizado, letra, onPress }: CardProps) {
    return(
        <Container>
            <Texto>{nome}</Texto>
            
            <Linha/>

            <DivideView>
                
                <DadosGroup>
                    <Texto>{ tipoDeTreino[0] }</Texto>
                    <Texto>{ tipoDeTreino[1] }</Texto>
                </DadosGroup>

                    <ToggleSwitch value={foiRealizado} onPress={() => 
                        onPress({ nome, tipoDeTreino, foiRealizado, letra})
                    }/>
            </DivideView>
            
        </Container>
    );
} 