import {
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
  updateProfile,
} from 'firebase/auth';
import {auth} from '../../app/config/config';
import {backendSignup} from '../../app/api/publicApi';

export const login = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user: User = userCredential.user;
  return user;
};

export const emailVerification = async () => {
  const user = auth.currentUser;
  await sendEmailVerification(auth.currentUser, {
    handleCodeInApp: true,
    url: 'https://google.com/',
  });
};
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const signup = async (email, password, firstName, lastName) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await updateProfile(userCredential.user, {
    displayName: firstName + ' ' + lastName,
  });

  await emailVerification();
  await backendSignup({
    email: email,
    firstName: firstName,
    lastName: lastName,
    firebaseId: auth.currentUser.uid,
  });
  await delay(3000);

  return userCredential.user;
};

export const logout = async () => {
  await signOut(auth);
};
