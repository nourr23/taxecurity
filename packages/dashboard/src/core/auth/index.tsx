import { create } from 'zustand';

import { createSelectors } from '../utils';
import { getAuth, removeAuth, setAuth } from './utils';

interface AuthState {
  auth: any | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (data: any) => void;
  signOut: () => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  auth: null,
  signIn: (auth) => {
    setAuth(auth);
    set({ status: 'signIn', auth });
  },
  signOut: () => {
    removeAuth();
    set({ status: 'signOut', auth: null });
  },
  hydrate: () => {
    try {
      const userAuth = getAuth();
      if (userAuth !== null) {
        get().signIn(userAuth);
      } else {
        get().signOut();
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (auth: any) => _useAuth.getState().signIn(auth);
export const hydrateAuth = () => _useAuth.getState().hydrate();
