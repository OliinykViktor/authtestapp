import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Text,
  TextInput
} from 'react-native-paper';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';

import { AppDispatch } from '../app/redux/store';
import { selectAuthState } from '../app/redux/selectors/authSelectors';
import { loginUser } from '../app/redux/slices/authSlice';
import StateMessage from '../shared/ui/StateMessage';
import useCurrentThema from '../shared/hooks/useCurrentThema';
import { ValidatedTextInput } from '../shared/ui';
import { LoginFormValues } from '../types/types';
import messages from '../shared/models/messages';

const validationSchema = Yup.object().shape({
  email: Yup.string().email(messages.errors.invalidEmail).required(messages.errors.requiredEmail),
  password: Yup.string().min(8, messages.errors.minPassword).required(messages.errors.requiredPassword),
});

const LoginScreen = () => {
  const { loading, error } = useSelector(selectAuthState);

  const { colors } = useCurrentThema();
  const dispatch = useDispatch<AppDispatch>();


  const handleLogin = (values: LoginFormValues) => {
    dispatch(loginUser(values.email, values.password));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.onSurface }]}>Login</Text>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >{({ handleSubmit }) => (
        <>
          <Field
            component={ValidatedTextInput}
            name='email'
            label='Email Address'
            placeholder='Email Address'
            style={styles.input}
            keyboardType='email-address'
            autoCapitalize='none'
          />
          <Field
            component={ValidatedTextInput}
            name='password'
            placeholder='Password'
            style={styles.input}
            secureTextEntry
          />
          <StateMessage
            isEmpty={!error}
            message={error}
            messageType='error'
          />
          <Button
            mode='contained'
            onPress={() => handleSubmit()}
            style={[styles.button, { backgroundColor: colors.primaryContainer }]}
            labelStyle={{color:colors.primary}}
            loading={loading}
          >
            Login
          </Button>
        </>
      )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  }
});

export default LoginScreen;