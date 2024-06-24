import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import FeedScreen from '../../screens/FeedScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import useCurrentThema from '../../shared/hooks/useCurrentThema';

const Tab = createMaterialTopTabNavigator();

const MainTabNavigator = () => {
  const { colors } = useCurrentThema();

  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.secondary,
      tabBarIndicatorStyle: {
        backgroundColor: colors.primary,
      },
      tabBarStyle: {
        backgroundColor: colors.surfaceVariant,
      },
    }}>
      <Tab.Screen name='Feed' component={FeedScreen} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;