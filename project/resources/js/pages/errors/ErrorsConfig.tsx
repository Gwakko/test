import React from 'react';
import {PagesConfig} from '../../types';
import Error404 from './Error404';

const ErrorsConfig: PagesConfig = {
    auth: [],
    routes: [
        {
            path: '/errors/404',
            component: () => <Error404 />
        }
    ]
};

export default ErrorsConfig;
