import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import InputPasswordIcon from '../../../assets/svg/InputPasswordIcon';
import InputTextIcon from '../../../assets/svg/InputTextIcon';
import {Link, useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {login} from '../../features/auth/auth';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const navigation = useNavigation();

  const handleLogin = async () => {
    const user = await login(email, password);
    if (user) {
    }
  };

  return (
    <View style={style.container}>
      <View style={style.titleTextBox}>
        <Text style={style.titleText}>Login</Text>
      </View>
      <View style={style.fieldContainer}>
        <Text style={style.inputHelpText}>E-Mail Address</Text>
        <View style={style.input}>
          <TextInput
            textContentType="emailAddress"
            style={style.textBox}
            onChangeText={newText => setEmail(newText)}
          />
        </View>
      </View>

      <View style={style.fieldContainer}>
        <Text style={style.inputHelpText}>Password</Text>
        <View style={style.input}>
          <TextInput
            textContentType="password"
            style={style.textBox}
            secureTextEntry={isPasswordSecure}
            onChangeText={newText => setPassword(newText)}
          />
          <TouchableOpacity
            hitSlop={15}
            onPress={() => {
              isPasswordSecure
                ? setIsPasswordSecure(false)
                : setIsPasswordSecure(true);
            }}>
            {!isPasswordSecure ? (
              <InputPasswordIcon size={28} color={'black'} />
            ) : (
              <InputTextIcon size={28} color={'black'}></InputTextIcon>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Link to={''} style={style.link}>
        Forgot Password?
      </Link>

      <Link to={''} style={style.link}>
        Have no MealMonitor account? Go to Registration
      </Link>

      <View style={style.filler}></View>

      <TouchableOpacity style={style.button} onPress={handleLogin}>
        <Text style={style.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  fieldContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 4,
    alignSelf: 'stretch',
  },
  container: {
    flexGrow: 1,
    display: 'flex',
    paddingHorizontal: 24,
    paddingBottom: 48,
    paddingTop: 20,
    flexDirection: 'column',
    gap: 16,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    alignSelf: 'stretch',
    borderRadius: 8,
    borderWidth: 2,
    fontSize: 16,
  },
  textBox: {
    flexGrow: 1,
    backgroundColor: 'white',
    height: 44,
    alignSelf: 'stretch',
    fontSize: 16,
  },
  inputHelpText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  titleTextBox: {
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  link: {
    color: '#5CA08E',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    textDecorationLine: 'underline',
  },
  filler: {
    flexGrow: 1,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#5CA08E',
    height: 44,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    color: 'white',
  },
});

export default LoginComponent;
