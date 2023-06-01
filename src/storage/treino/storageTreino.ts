import { Treino } from "@dtos/Treino";
import { TREINO_COLLECTION, TREINO_SELECIONADO } from "../storageConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function GetTreinosStorage(){
    try {
        const treinos = await AsyncStorage.getItem(TREINO_COLLECTION);
        return treinos !== null ? JSON.parse(treinos) : null;
    } catch (error) {
        throw error;
    }
}

export async function SetTreinosStorage(treinos: Treino[]){
    try {
        await AsyncStorage.setItem(TREINO_COLLECTION, JSON.stringify(treinos));
    } catch (error) {
        throw error;
    }
}

export async function GetTreinoSelecionado() {
    try {
        const letra = await AsyncStorage.getItem(TREINO_SELECIONADO);
        return letra === undefined ? null : letra;
    } catch (error) {
        
    }
}

export async function SetTreinoSelecionadoStorage(letraSelecionada: string) {
    try {
        await AsyncStorage.setItem(TREINO_SELECIONADO, letraSelecionada);
    } catch (error) {
        throw error;
    }
}