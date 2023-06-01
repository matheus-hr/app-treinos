import AsyncStorage from "@react-native-async-storage/async-storage";
import { EXERCICIO_COLLECTION } from "../storageConfig";
import { Exercicio } from "@dtos/Exercicio";

export async function GetExerciciosStorage(){
    try {
        const exercicios = await AsyncStorage.getItem(EXERCICIO_COLLECTION);
        return exercicios != null ? JSON.parse(exercicios) : null;
    } catch (error) {
        throw error;
    }
}

export async function SetExerciciosStorage(exercicios: Exercicio[]){
    try {
        await AsyncStorage.setItem(EXERCICIO_COLLECTION, JSON.stringify(exercicios));
    } catch (error) {
        throw error;
    }
}