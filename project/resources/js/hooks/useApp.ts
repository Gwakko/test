import {useContext} from 'react';

import AppContext, {IAppContext} from '../app/contexts/app-context';

const useApp = () => useContext<IAppContext>(AppContext);

export default useApp;
