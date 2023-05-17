import { View, ActivityIndicator } from 'react-native';
import { styles } from './styles';

export function Loading() {
  return (
    <View style={styles.Container}>
      <ActivityIndicator color='#8284FA' />
    </View>
  );
}
