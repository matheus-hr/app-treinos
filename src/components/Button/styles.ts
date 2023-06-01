import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export type ButtonType = "PRIMARY" | "CANCEL"

type ButtonProps = {
    type: ButtonType
}

export const Container = styled(TouchableOpacity)<ButtonProps>`
    border-radius: 6px;
    background-color: ${ ({type}) => type === "CANCEL" ? "#AA2834" : "#F5DD4B"};;
    max-width: 100%;
    width: ${ ({type}) => type === "CANCEL" ? "64px" : "auto"};
    height: 64px;
    align-items: center;
    justify-content: center;
    margin: 5px;
    padding: 0 15px 0 15px;
`; 

export const Texto = styled.Text`
    color: black;
    font-size: 28px;
    font-weight: bold;
`;