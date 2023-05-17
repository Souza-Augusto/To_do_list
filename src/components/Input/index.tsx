import { useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { styles } from './styles';

export function Input({ style, ...rest }: TextInputProps) {
  const [onFocus, setOnfocus] = useState(false);

  function handleOnFocus() {
    setOnfocus(true);
  }
  function handleOnBlur() {
    setOnfocus(false);
  }

  return (
    <TextInput
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      placeholderTextColor='#808080'
      style={[
        styles.Input,
        onFocus && { borderWidth: 1, borderColor: '#5E60CE' },
        style,
      ]}
      {...rest}
    />
  );
}
