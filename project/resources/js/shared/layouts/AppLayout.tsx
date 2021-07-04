import React, {useCallback, useState} from 'react';
import classNames from 'classnames';
import AuthService from '../../app/services/AuthService';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../../hooks';

type Props = {
    children: React.ReactElement
};

const AppLayout = (props: Props) => {
    const [toggledDropDown, setToggleDropDown] = useState(false);
    const {user, setUser, resetUser} = useAuth();

    const history = useHistory();

    const handlerDropDown = useCallback((e) => {
        e.preventDefault();
        setToggleDropDown(prevState => !prevState);
    }, []);

    const handlerLogout = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        await AuthService.logout();
        resetUser();
        history.push({
            pathname: '/sign-in',
        });
    };

    return (
        <>
            <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        {/*{{config('app.name', 'Laravel')}}*/}
                        Laravel
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/*!--Left Side Of Navbar --*/}
                        <ul className="navbar-nav mr-auto">

                        </ul>

                        {/*!--Right Side Of Navbar --*/}
                        <ul className="navbar-nav ml-auto">
                            {/*!--Authentication Links --*/}
                            <li className="nav-item dropdown">
                                <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                   onClick={handlerDropDown}
                                >
                                    {user.name || user.nickname}
                                </a>

                                <div className={classNames('dropdown-menu dropdown-menu-right', {show: toggledDropDown})} aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#"
                                       onClick={handlerLogout}>
                                        Logout
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {props.children}
        </>
    );
};

export default AppLayout;
