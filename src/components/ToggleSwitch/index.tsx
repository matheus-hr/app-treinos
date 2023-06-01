import { Switch } from "react-native";

type Props =  {
    value: boolean;
    onPress: () => void;
}

export function ToggleSwitch({ value, onPress }: Props) {
    
    return (
        <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={value ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"  
            onChange={onPress} 
            value={value}
        />
    );
}