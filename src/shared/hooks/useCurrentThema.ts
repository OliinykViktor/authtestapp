import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { currentTheme } from '../../app/redux/selectors/themeSelectors';

const useCurrentThema = () => {
  const systemTheme = useColorScheme();
  const theme = useSelector(currentTheme);

  if (theme === 'system') {
    return systemTheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  } else {
    return theme === 'dark' ? MD3DarkTheme : MD3LightTheme;
  }
};

export default useCurrentThema;
