import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FlatList,
  StyleSheet,
  View,
  RefreshControl
} from 'react-native';

import { Loading, PhotoItem } from '../shared/ui';
import { AppDispatch } from '../app/redux/store';
import { selectFeedState } from '../app/redux/selectors/feedSelectors';
import { fetchMoreImages, refreshImages } from '../app/redux/slices/feedSlice';
import StateMessage from '../shared/ui/StateMessage';
import useCurrentThema from '../shared/hooks/useCurrentThema';
import messages from '../shared/models/messages';

const FeedScreen = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    images,
    loading,
    refreshing
  } = useSelector(selectFeedState);

  const { colors } = useCurrentThema();

  useEffect(() => {
    dispatch(refreshImages());
  }, [dispatch]);

  const handleLoadMore = () => {
    if (!loading) dispatch(fetchMoreImages());
  };

  const handleRefresh = () => {
    dispatch(refreshImages());
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {loading && images.length ? (
        <Loading size='large' />
      ) : (
        <FlatList
          data={images}
          renderItem={PhotoItem}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      )}
      <StateMessage
        isEmpty={!!images.length && !loading}
        message={messages.feedScreen.emptyState}
        messageType='emptyState'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default FeedScreen;
