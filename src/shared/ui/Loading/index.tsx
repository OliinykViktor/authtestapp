import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { LoadingProps } from '../../../types/types';
import { ActivityIndicator } from 'react-native-paper';

const Loading: FC<LoadingProps> = ({
  loading,
  size
}) => {
  if (loading) {
    return (
      <ActivityIndicator
        size={size}
        style={styles.loading}
      />
    )
  };
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Loading;