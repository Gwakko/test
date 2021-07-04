import React, {useCallback, useEffect} from 'react';
import {matchRoutes, renderRoutes} from 'react-router-config';
import {useHistory} from 'react-router-dom';
import {useApp} from '../../hooks';

type Props = {
    children?: React.ReactElement | null;
};

const Layout = (props: Props) => {
    const app = useApp();
    const history = useHistory();

    // useEffect(() => {
    //     routeSettingsCheck();
    // }, []);
    //
    // useEffect(() => {
    //     routeSettingsCheck();
    // }, [history.location.pathname]);

    // const routeSettingsCheck = useCallback(() => {
    //     const {routes} = app;
    //
    //     const matched = matchRoutes(routes, history.location.pathname)[0];
    //
    //     const settings = matched?.route?.settings;
    //     if (settings && ) {
    //         //TODO: apply settings
    //     }
    // }, [app]);

    return (
        <>
            {renderRoutes(app.routes)}
            {props.children}
        </>
    );
};

export default Layout;
