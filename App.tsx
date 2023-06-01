import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { Home } from '@screens/Home';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121214" }}>
        <StatusBar translucent backgroundColor="transparent" />
        <Home/>
    </SafeAreaView>
  );
}

