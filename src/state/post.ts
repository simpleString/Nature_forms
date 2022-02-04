import { atom } from 'recoil';
import { IPost, IUserData } from '../interfaces';

const postsAtom = atom<IPost[] | undefined>({
  key: 'posts',
  default: undefined,
});

export { postsAtom };
