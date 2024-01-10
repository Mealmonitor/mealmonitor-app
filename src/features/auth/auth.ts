import {
  createUserWithEmailAndPassword,
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
    url: 'https://galitianu.ro/',
  }).then(() => {
    console.log('cacat');
  });
};

export const signup = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await emailVerification();
  return userCredential.user;
};

export const logout = async () => {
  await signOut(auth);
};
