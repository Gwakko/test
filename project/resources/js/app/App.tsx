import React from 'react';
import AppContext from './contexts/app-context';
import routes from './configs/routesConfigs';
import Auth from './providers/Auth';
import {Router} from 'react-router-dom';
import Authorization from './providers/Authorization';
import history from './history';
import Layout from '../shared/ui/layouts/Layout';
import './configs/defauls';
import ChannelsProvider from './providers/ChannelsProvider';
import ReactNotification from 'react-notifications-component';

const App: React.FC = () => {
    return (
        <AppContext.Provider
            value={{
                routes
            }}
        >
            <Auth>
                <Router history={history}>
                    <Authorization>
                        <ChannelsProvider>
                            <Layout />
                        </ChannelsProvider>
                    </Authorization>
                </Router>
            </Auth>

            <ReactNotification />
        </AppContext.Provider>
    );
}

export default App;
