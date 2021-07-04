import React from 'react';
import {PagesConfig} from '../../types';
import Login from './Login';

const AuthConfig: PagesConfig = {
    auth: ['guest'],
    routes: [
        {
            path: '/sign-in',
            component: () => <Login />
        }
    ]
};

export default AuthConfig;
