import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum Role {
  MASTER = 'MASTER',
  ADMIN = 'ADMIN',
  USER = 'USER'
};

export interface User {
  id: string;
  nickname: string;
  fullname: string;
  profile_pic_url: string | null;
  cpf: string;  
  email: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
}

interface UserState {
  userInfo: User | null;
  setUserInfo: (user: User) => void;
  clearUserInfo: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (user: User) => set({ userInfo: user }),
      clearUserInfo: () => set({ userInfo: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);

export default useUserStore;
