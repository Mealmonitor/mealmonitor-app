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

export const signup = async (email, password, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await updateProfile(userCredential.user, {displayName: displayName});

  await emailVerification();
  return userCredential.user;
};

export const logout = async () => {
  await signOut(auth);
};
