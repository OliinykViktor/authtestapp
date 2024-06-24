import React, { FC } from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

import { StateMessageProp } from '../../../types/types';

const StateMessage: FC<StateMessageProp> = ({
  isEmpty,
  message,
  messageType
}) => {
  if (isEmpty || !message) return;

  return (
    <Text style={[styles.commonStyles, styles[messageType]]}>{message}</Text>
  );
};

const styles = StyleSheet.create({
  commonStyles: {
    textAlign: 'center',
    marginBottom: 16,
  },
  error: {
    fontSize: 14,
    color: 'red',
  },
  emptyState: {
    fontSize: 16,
  },
  inform: {
    fontSize: 18,
  }
});

export default StateMessage;