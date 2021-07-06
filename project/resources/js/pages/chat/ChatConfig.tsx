import React from 'react';
import {PagesConfig} from '../../types';
import PrivateChat from './PrivateChat';

const ChatConfig: PagesConfig = {
    auth: ['user'],
    routes: [
        {
            path: '/chat/:id',
            component: () => <PrivateChat />
        }
    ]
};

export default ChatConfig;
