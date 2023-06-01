import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: #121214;
    padding: 10px;
`;

export const ContainerLoading = styled.View`
    position: absolute;
    align-items: center;
    justify-content: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`;

export const Header = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 24px;
    margin: 0 auto;
`;

export const ContainerTreinos = styled.View`
    align-items: center;
`;

export const ContainerExercicios = styled.View`
    max-height: 77.5%;
    margin-bottom: 10px;
`;

export const DivideView = styled.View`
    flex-direction: row;
    justify-content: space-around;
    padding-right: 6%;
    padding-left: 6%;
`;