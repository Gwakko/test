import React from 'react';
import {PagesConfig} from '../../types';
import Callback from './Callback';

const CallbackConfig: PagesConfig = {
    auth: ['guest'],
    routes: [
        {
            path: '/social/callback',
            component: () => <Callback />
        }
    ]
};

export default CallbackConfig;
