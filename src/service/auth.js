import { auth } from '../config/firebase';

const postLogin = async ({ email, password }) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

const postRegister = async ({ email, password }) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

const isUserLoggedIn = async () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error('User not logged in'));
      }
    });
  });
};

export { postLogin, postRegister, isUserLoggedIn };
