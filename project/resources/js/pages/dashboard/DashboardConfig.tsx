import React from 'react';
import {PagesConfig} from '../../types';
import Dashboard from './Dashboard';

const DashboardConfig: PagesConfig = {
    auth: ['user'],
    routes: [
        {
            path: '/dashboard',
            component: () => <Dashboard />
        }
    ]
};

export default DashboardConfig;
