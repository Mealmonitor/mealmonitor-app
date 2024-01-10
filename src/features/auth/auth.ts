import {
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {auth} from '../../app/config/config';

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = userCredential.user;
  console.log(user);
  return user;
};

export const emailVerification = async () => {
  const user = auth.currentUser;
  await sendEmailVerification(auth.currentUser, {
    handleCodeInApp: true,
    url: 'as',
  }).then(() => {
    console.log('cacat');
  });
};

export const logout = async () => {
  await signOut(auth);
};
