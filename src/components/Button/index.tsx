import { TouchableOpacityProps, Image } from "react-native";
import { Container, Texto, ButtonType } from "./styles"; 

type ButtonProps = TouchableOpacityProps & {
    descricao?: string;
    type?: ButtonType;
}

export function Button({descricao = "", type = "PRIMARY", ...rest}: ButtonProps) {
    return(
        <Container type={type} {...rest}>
            { type === "PRIMARY" 
                ? <Texto>{ descricao }</Texto> 
                : <Image source={require("@assets/lixeira.png")}/>
            }
        </Container>
    );
} 