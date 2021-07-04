import React from 'react';
import {Redirect} from 'react-router-dom';
import {Route} from '../../types';
import {generateRoutesFromConfigs} from '../utils';

import ErrorsConfig from '../../pages/errors/ErrorsConfig';
import AuthConfig from "../../pages/auth/AuthConfig";
import DashboardConfig from "../../pages/dashboard/DashboardConfig";
import CallbackConfig from "../../pages/callback/CallbackConfig";
import ChatConfig from "../../pages/chat/ChatConfig";

const routesConfigs = [
    ErrorsConfig,
    AuthConfig,
    DashboardConfig,
    CallbackConfig,
    ChatConfig
];

const routes: Route[] = [
    ...generateRoutesFromConfigs(routesConfigs),
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard" />
    },
    {
        component: () => <Redirect to="/errors/404" />
    }
];

export default routes;
