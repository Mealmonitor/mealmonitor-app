import {
  User,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
  updateProfile,
} from 'firebase/auth';
import {auth} from '../../app/config/config';
import {backendSignup} from '../../app/api/publicApi';
import {useContext, useState} from 'react';
import {UserContext} from './userContext';

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
  await sendEmailVerification(auth.currentUser!, {
    handleCodeInApp: true,
    url: 'https://google.com/',
  });
};

export const signup = async (email, password, firstName, lastName) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await updateProfile(userCredential.user, {
    displayName: firstName + ' ' + lastName,
  });

  emailVerification();
  backendSignup({
    email: email,
    firstName: firstName,
    lastName: lastName,
    firebaseId: auth.currentUser!.uid,
  });

  return userCredential.user;
};

export const emailVerified = async () => {
  await auth.currentUser?.reload();
  return auth.currentUser?.emailVerified;
};

export const logout = async () => {
  await signOut(auth);
};

export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};
