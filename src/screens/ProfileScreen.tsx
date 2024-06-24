import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Avatar,
  Button,
  Text
} from 'react-native-paper';

import { ProfileScreenProps } from '../types/navigation';
import { AppDispatch } from '../app/redux/store';
import { selectUserProfile } from '../app/redux/selectors/profileSelectors';
import { clearProfile, fetchUserProfile } from '../app/redux/slices/profileSlice';
import { logoutUser } from '../app/redux/slices/authSlice';
import { setTheme } from '../app/redux/slices/themeSlice';
import { currentTheme } from '../app/redux/selectors/themeSelectors';
import useCurrentThema from '../shared/hooks/useCurrentThema';

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector(selectUserProfile);
  const theme = useSelector(currentTheme);
  const { colors } = useCurrentThema();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearProfile());
    navigation.replace('Login');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    dispatch(setTheme(newTheme));
  };

  if (!user) return null;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {loading ? (
        <ActivityIndicator size='large' style={styles.activityIndicator} />
      ) : (
        <>
          <Avatar.Image 
          size={100} 
          source={{ uri: user.avatar }} 
          style={styles.avatar} 
          />
          <Text style={[styles.commonText, { color: colors.primary }]}>{user.first_name} {user.last_name}</Text>
          <Text style={[styles.commonText, { color: colors.primary }]}>{user.email}</Text>
          <Button
            mode='contained'
            labelStyle={{color:colors.primary}}
            style={[styles.button, { backgroundColor: colors.primaryContainer }]}
            onPress={handleLogout}
          >
            Logout
          </Button>
          <Button style={[{ marginTop: 16, backgroundColor: colors.inverseOnSurface }]} labelStyle={{color:colors.primary}} onPress={toggleTheme}>
            {theme.toUpperCase()}
          </Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  commonText: {
    fontSize: 18,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
