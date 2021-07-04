import React from 'react';
import { useForm } from 'react-hook-form';
import AuthService from "../../app/services/AuthService";
import {User} from "../../types/";
import {useHistory} from "react-router-dom";
import {useAuth} from '../../hooks';

type FormData = {
    email: string;
    password: string;
    is_remember: boolean;
};

const Login: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
    const history = useHistory();
    const {user, setUser} = useAuth();

    const onSubmit = async (data: FormData) => {
        try {
            const user = await AuthService.signInWithEmailAndPassword(data.email, data.password);
            setUser({...user as User});
            history.push({
                pathname: '/dashboard'
            });
        }
        catch (e) {
            //
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            Login
                        </div>

                        <div className="card-body">
                            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group row">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-right">
                                        E-Mail Address
                                    </label>

                                    <div className="col-md-6">
                                        <input
                                            id="email"
                                            type="email"
                                            className="form-control"
                                            required
                                            {...register('email')}
                                        />

                                    {/*        @error('email')*/}
                                    {/*        <span className="invalid-feedback" role="alert">*/}
                                    {/*    <strong>{{$message}}</strong>*/}
                                    {/*</span>*/}
                                    {/*        @enderror*/}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="password" className="col-md-4 col-form-label text-md-right">
                                        Password
                                    </label>

                                    <div className="col-md-6">
                                        <input
                                            id="password"
                                            type="password"
                                            className="form-control"
                                            required
                                            autoComplete="current-password"
                                            {...register('password')}
                                        />
                                            {/*is-invalid*/}

                                    {/*        @error('password')*/}
                                    {/*        <span className="invalid-feedback" role="alert">*/}
                                    {/*    <strong>{{$message}}</strong>*/}
                                    {/*</span>*/}
                                    {/*        @enderror*/}
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-md-6 offset-md-4">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="remember"
                                                {...register('is_remember')}
                                            />
                                            <label className="form-check-label" htmlFor="remember">
                                                Remember Me
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-8 offset-md-4">
                                        <button type="submit" className="btn btn-primary">
                                            Login
                                        </button>
                                    </div>
                                </div>

                                <hr/>

                                <div className="form-group text-center">
                                    <a href="/auth/instagram" className="btn btn-primary mr-2">Instagram</a>
                                    <a href="/auth/github" className="btn btn-secondary">GitHub</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
