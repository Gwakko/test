import React from 'react';
import {User} from '../../types';

export interface IAuthContext {
    user: User;
    setUser: (user: User) => void;
    resetUser: () => void;
}

export const initUser: User = {
    id: -1,
    role: 'guest',
    name: 'John Doe',
    nickname: null,
    email: 'example@gmail.com',
    avatar_url: 'https://via.placeholder.com/150'
};

const AuthContext = React.createContext<IAuthContext>({
    user: {...initUser},
    setUser: data => {},
    resetUser: () => {}
});

export default AuthContext;
