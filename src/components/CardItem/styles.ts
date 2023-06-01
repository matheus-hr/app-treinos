import styled from "styled-components/native";

export const Container = styled.View`
    display: flex;
    border: 1px solid #202024;
    border-radius: 5px;
    background-color: #202024;
    align-items: center;
    margin: 10px;
    padding: 8px 0 8px 0;
`;

export const Header = styled.Text`
    display: flex;
    text-align: center;
    color: white;
    font-size: 18px;
`;

export const Linha = styled.View`
    height: 2px;
    width: 90%;
    background-color: white;
    margin: 10px 0 10px 0;
`;

export const Texto = styled.Text`
    color: white;
    font-size: 18px;
`;

export const DadosGroup = styled.View`
    flex: 1;
`;

export const DivideView = styled.View`
    flex-direction: row;
    justify-content: space-around;
    padding-right: 6%;
    padding-left: 6%;
`;