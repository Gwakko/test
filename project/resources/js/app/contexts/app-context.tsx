import React from 'react';
import {Route} from '../../types';

export interface IAppContext {
    routes: Route[];
}

const AppContext = React.createContext<IAppContext>({
    routes: []
});

export default AppContext;
