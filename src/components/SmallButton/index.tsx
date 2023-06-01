import { TouchableOpacityProps } from "react-native";
import { Container, Texto, ButtonType } from "./styles"; 

type Props = TouchableOpacityProps & {
    letra: string;
    type?: ButtonType;
}

export function SmallButton({ letra, type = "PRIMARY", ...rest }: Props) {
    return(
        <Container type={type} {...rest}>
            <Texto type={type}>{letra}</Texto>
        </Container>
    );
} 