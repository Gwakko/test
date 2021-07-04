import {useContext} from 'react';
import AuthContext, {IAuthContext} from '../app/contexts/auth-context';

const useAuth = (): IAuthContext => useContext<IAuthContext>(AuthContext);

export default useAuth;
