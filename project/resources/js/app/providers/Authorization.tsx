import React, {useCallback, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {HistoryState} from '../../types';
import {matchRoutes} from "react-router-config";
import {useApp, useAuth} from "../../hooks";

type Props = {
    children: React.ReactElement
};

const Authorization = (props: Props) => {
    const [isAccessGranted, setIsAccessGranted] = useState(true);

    const app = useApp();
    const {user, setUser} = useAuth();
    const history = useHistory<HistoryState>();

    const checkAccess = () => {
        const matched = matchRoutes(app.routes, history.location.pathname)[0];

        const auth = matched?.route?.auth || [];

        setIsAccessGranted(
            auth.length > 0
                ? auth.includes(user.role)
                : true
        );
    };

    const redirectRoute = () => {
        const {location} = history;
        const {pathname, state} = location;

        if (user.role === 'guest') {
            history.push({
                pathname: '/sign-in',
                state: {
                    redirectUrl: pathname
                }
            });
        }
        else {
            const redirectUrl = state && state.redirectUrl ? state.redirectUrl : '/dashboard';
            history.push({
                pathname: redirectUrl
            });
        }
    };

    useEffect(() => {
        checkAccess();
    }, []);

    useEffect(() => {
        checkAccess();
    });

    useEffect(() => {
        checkAccess();
    }, [user, history.location.pathname]);

    useEffect(() => {
        if (!isAccessGranted) {
            redirectRoute();
        }
    }, [isAccessGranted]);

    if (!isAccessGranted) {
        return null;
    }

    return (
        <>
            {props.children}
        </>
    );
};

export default Authorization;
