import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { ValidatedTextInputProps } from '../../../types/types';
import StateMessage from '../StateMessage';

const ValidatedTextInput: React.FC<ValidatedTextInputProps> = ({
  field,
  form,
  label,
  placeholder,
  style,
  ...props
}) => {
  const error = form.touched[field.name] && form.errors[field.name];
  
  return (
    <View style={style}>
      <TextInput
        placeholder={placeholder}
        onChangeText={field.onChange(field.name)}
        onBlur={field.onBlur(field.name)}
        value={field.value}
        error={!!error}
        {...props}
      />
      <StateMessage
        isEmpty={!error}
        message={error as string}
        messageType='error'
      />
    </View>
  );
};

export default ValidatedTextInput;