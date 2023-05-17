import { Home } from '@screens/Home';
import {
  useFonts,
  Inter_400Regular,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { Loading } from '@components/Loading';

export default function App() {
  const [fontLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });

  return <>{fontLoaded ? <Home /> : <Loading />}</>;
}
