import { TouchableOpacity } from 'react-native';
import styled from "styled-components/native";

export type ButtonType = 'PRIMARY' | 'SECONDARY';

type ButtonProps = {
    type: ButtonType;
}

export const Container = styled(TouchableOpacity)<ButtonProps>`
    border-radius: 6px;
    background-color: ${ ({type}) => type === "PRIMARY" ? "#F5DD4B" : "#121214"};
    border: 1px solid #F5DD4B;
    width: 100px;
    height: 45px;
    align-items: center;
    justify-content: center;
    margin: 5px;
    padding: 0;
`; 

export const Texto = styled.Text<ButtonProps>`
    color: ${ ({type}) => type === "PRIMARY" ? "black" : "white"};
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    margin: 0 auto;
`;