import { Image, View } from 'react-native';
import { styles } from './styles';

export function Header() {
  return (
    <View style={styles.Container}>
      <Image source={require('@assets/images/png/Logo.png')} />
    </View>
  );
}
