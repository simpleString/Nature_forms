import { atom } from 'recoil';
import { IUserData } from '../interfaces';

const userAtom = atom<string | undefined>({
  key: 'user',
  // default: JSON.parse(localStorage.getItem("user") || ""),
  default: undefined,
});

const authAtom = atom<boolean>({
  key: 'auth',
  default: false,
});

export { userAtom, authAtom };
