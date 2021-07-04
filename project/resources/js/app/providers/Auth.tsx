import React, {useEffect, useState} from 'react';
import AuthService from '../services/AuthService';
import eventBus from '../events/EventBus';
import * as events from '../events/events';
import {User} from '../../types';
import AuthContext, {initUser} from "../contexts/auth-context";
import NotificationService from "../services/NotificationService";

type Props = {
    children: React.ReactElement;
};

const Auth = (props: Props) => {
    const [user, setUser] = useState<User>({...initUser});

    const resetUser = () => setUser({...initUser});

    useEffect(() => {
        eventBus.on(events.onAutoLogin, () => {
            NotificationService.default({
                message: 'Auto logging with JWT'
            });

            AuthService.signInWithToken()
                .then(user => {
                    NotificationService.info({
                        message: 'Auto logged with JWT'
                    });

                    setUser({...user as User});
                })
                .catch(error => {
                    NotificationService.danger({
                        message: 'Error: Auto logged with JWT'
                    });
                });
        });

        eventBus.on(events.onAutoLogout, (event) => {
            if (event) {
                console.log(event)

                NotificationService.success({
                    message: 'Auto logout'
                });
            }

            AuthService.logout();
        });

        AuthService.init();
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser, resetUser}}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default Auth;
