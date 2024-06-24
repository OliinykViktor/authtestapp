import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView, StatusBar } from 'react-native';

import { AppDispatch, RootState } from '../redux/store';
import { checkLoginStatus } from '../redux/slices/authSlice';
import LoginScreen from '../../screens/LoginScreen';
import MainTabNavigator from './MainTabNavigator';
import { Loading } from '../../shared/ui';
import useCurrentThema from '../../shared/hooks/useCurrentThema';

const Stack = createStackNavigator();

const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userToken, loading } = useSelector((state: RootState) => state.auth);
  const { colors } = useCurrentThema();

  useEffect(() => {
    dispatch(checkLoginStatus());
  }, [dispatch]);

  if (loading) return <Loading size="large" />;

  return (
    <PaperProvider >
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.surfaceVariant }}>
        <StatusBar backgroundColor={colors.surfaceVariant} />
        <NavigationContainer>
          <Stack.Navigator initialRouteName={userToken ? "Main" : "Login"}>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default Main;
