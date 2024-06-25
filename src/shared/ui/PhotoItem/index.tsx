import React from 'react';
import {
  Card,
  Paragraph,
  Title
} from 'react-native-paper';
import { Image, StyleSheet } from 'react-native';

import { Photo } from '../../../types/feed';

const PhotoItem = ({ item }: { item: Photo }) => (
  <Card
    style={styles.card}
  >
    <Image
      source={{ uri: item.download_url }}
      style={styles.image}
    />
    <Card.Content>
      <Title>{item.author}</Title>
      <Paragraph>Author: {item.author}</Paragraph>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
  },
});

export default PhotoItem;