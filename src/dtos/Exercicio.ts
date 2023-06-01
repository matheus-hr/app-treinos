export type Exercicio = {
    letra: string,
    nome: string,
    tipoDeTreino: string[];
    foiRealizado: boolean
}

export function SerializeExercicio(conteudo: string, letra: string) : Exercicio
{
    let [ exercicios, tipoDeTreino ] = conteudo.split("-");

    return (
    {
        letra: letra,
        nome: exercicios.trim(), 
        tipoDeTreino: [ ...tipoDeTreino.split("x").filter(x => x.trim()) ],
        foiRealizado: false
    });
}