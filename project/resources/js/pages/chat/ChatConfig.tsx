import React from 'react';
import {PagesConfig} from '../../types';
import Chat from './Chat';

const ChatConfig: PagesConfig = {
    auth: ['user'],
    routes: [
        {
            path: '/chat/:id',
            component: () => <Chat />
        }
    ]
};

export default ChatConfig;
