import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import AuthService from "../../app/services/AuthService";
import {useAuth} from "../../hooks";
import {User} from "../../types";

const Callback: React.FC = () => {

    const history = useHistory();
    const {setUser} = useAuth();

    useEffect(() => {
        AuthService.signInWithSocial()
            .then(user => {
                setUser({...user as User});
                history.push({
                    pathname: '/'
                });
            });
    }, []);

    return (
        <>
            <main className="py-4">

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Callback</div>

                                <div className="card-body">
                                    You will be redirected!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </>
    );
};

export default Callback;
