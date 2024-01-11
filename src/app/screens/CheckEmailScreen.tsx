import {View, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useContext, useState} from 'react';
import {emailVerification, emailVerified} from '../../features/auth/auth';
import {UserContext} from '../../features/auth/userContext';

const CheckEmailScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [resendEnabled, setResendEnabled] = useState(true);
  const {updateState} = useContext(UserContext);
  const navigation = useNavigation();
  const setEmailAsVerified = () => {
    updateState({
      isEmailVerified: true,
    });
  };
  const handleResend = () => {
    emailVerification();
    setResendEnabled(false);
  };
  const handleConfirmation = async () => {
    const rez = await emailVerified();
    if (!rez) {
      Alert.alert(`E-Mail is not yet verified.`, '', [
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
    } else {
      setEmailAsVerified();
    }
  };
  return (
    <View style={style.app}>
      <View className="pt-12">
        <View style={style.banner}>
          <View style={style.arrow}></View>
        </View>
      </View>

      <View style={style.modalLikeContainer}>
        <View style={style.container}>
          <View style={style.filler}></View>

          <View style={style.titleTextBox}>
            <Text style={style.titleText}>Confirm E-Mail Address</Text>
          </View>
          <View style={style.titleTextBox}>
            <Text style={style.paragraphText}>
              We have sent an E-Mail to email. Please check yout inbox and, if
              necessary, your sppam folder.
            </Text>
          </View>
          <TouchableOpacity
            style={style.button2}
            onPress={handleResend}
            disabled={!resendEnabled}>
            <Text style={style.resendButton}>Resend E-Mail</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.button} onPress={handleConfirmation}>
            <Text style={style.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const style = StyleSheet.create({
  app: {flex: 1, backgroundColor: '#5CA08E'},
  textDescription: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 50,
  },
  centeredContainer: {
    justifyContent: 'space-between', // Center children vertically
    alignItems: 'center', // Center children horizontally
    marginHorizontal: 25,
    width: '100%',
  },

  banner: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingBottom: 24,
  },
  arrow: {
    marginHorizontal: 23,
    justifyContent: 'center',
    alignContent: 'center',
  },
  modalLikeContainer: {
    paddingTop: 10,
    flexGrow: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: 'space-between',
  },

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
    paddingTop: 20,
    flexDirection: 'column',
    gap: 16,
  },
  container2: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    paddingBottom: 40,
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
    color: '#2E856E',
    fontSize: 24,
    fontFamily: 'Basic',
    fontWeight: '400',
    lineHeight: 32,
    wordWrap: 'break-word',
  },
  paragraphText: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Basic',
    fontWeight: '400',
    lineHeight: 24,
    wordWrap: 'break-word',
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
  button2: {
    justifyContent: 'center',
    alignItems: 'center',

    height: 44,
  },
  resendButton: {
    color: '#2E856E',
    fontSize: 16,
    fontFamily: 'Basic',
    fontWeight: '400',
    textDecoration: 'underline',
    lineHeight: 24,
    wordWrap: 'break-word',
  },
});

export default CheckEmailScreen;
