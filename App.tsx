import React from 'react';
import { Provider } from 'react-redux';

import { store } from './src/app/redux/store';
import Main from './src/app/navigation/Main';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};


export default App;