import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { styles } from './styles';

type Props = TouchableOpacityProps & {
  title: string;
  check: boolean;
  onCheck: () => void;
  onRemove: () => void;
};

export function Task_Card({
  title,
  check = false,
  onCheck,
  onRemove,
  ...rest
}: Props) {
  return (
    <View style={[styles.Container, check && { borderWidth: 0 }]}>
      <TouchableOpacity onPress={onCheck}>
        <Image
          source={
            check
              ? require('@assets/images/png/checkbox_marked.png')
              : require('@assets/images/png/checkbox.png')
          }
        />
      </TouchableOpacity>
      <Text
        numberOfLines={2}
        style={[
          styles.Task,
          check && { textDecorationLine: 'line-through', color: '#808080' },
        ]}
      >
        {title}
      </Text>
      <TouchableOpacity onPress={onRemove}>
        <FontAwesome5 name='trash-alt' size={15} color='#808080' />
      </TouchableOpacity>
    </View>
  );
}
