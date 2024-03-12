import { auth } from '@/lib/firebase';
import { getLSData, removeLSData, setLSData } from '@/lib/utils';
import { User } from '@/types';

export const getCurrentUser = () => {
  return getLSData('user') as User;
};

export const getCurrentUserUID = () => {
  return (getLSData('user') as User).uid;
};

export const getAccessToken = () => {
  return getLSData('access_token');
};

export const setAccessToken = (token: string) => {
  setLSData('access_token', token);
};

export const setCurrentUser = (user) => {
  setLSData('user', user);
};

export const logOut = () => {
  removeLSData('access_token');
  removeLSData('user');
  auth.signOut();
};
