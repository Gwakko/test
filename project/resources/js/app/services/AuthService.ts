import axios from 'axios';
import {EventBus, events} from '../events';
import jwtDecode, { JwtPayload } from 'jwt-decode';

class AuthService
{
    init()
    {
        this.setInterceptors();
        this.handleAuthentication();
    }

    setInterceptors()
    {
        axios.interceptors.response.use(
            response => response,
            error => new Promise((resolve, reject) => {
                if (error.response.status === 401) {
                    EventBus.emit(events.onAutoLogout, 'Invalid access token');
                    this.setSession(null);
                }
                throw error;
            })
        );
    }

    handleAuthentication()
    {
        let accessToken = this.getAccessToken();

        if (!accessToken) {
            return;
        }

        if (this.isAuthTokenValid(accessToken)) {
            this.setSession(accessToken);
            EventBus.emit(events.onAutoLogin, true)
        }
        else {
            this.setSession(null);
            EventBus.emit(events.onAutoLogout, 'Access token expired');
        }
    }

    setSession(accessToken: string | null)
    {
        if (accessToken) {
            localStorage.setItem('jwt_access_token', accessToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        }
        else {
            localStorage.removeItem('jwt_access_token');
            delete axios.defaults.headers.common['Authorization'];
        }
    }

    isAuthTokenValid(accessToken: string | null): boolean
    {
        if (!accessToken) {
            return false;
        }

        const decoded = jwtDecode<JwtPayload>(accessToken);
        const currentTime = Date.now() / 1000;

        if (!decoded.exp || decoded.exp < currentTime) {
            console.warn('access token expired')
            return false;
        }

        return true;
    }

    getAccessToken()
    {
        return localStorage.getItem('jwt_access_token');
    }

    async logout()
    {
        await axios.post('/auth/logout');
        this.setSession(null);
    }

    createUser(data: object)
    {
        //
    }

    signInWithEmailAndPassword(email: string, password: string)
    {
        return new Promise((resolve, reject) => {
            axios.post('/auth/sign-in', {
                email,
                password
            }).then(({data}) => {
                if (data.data.user) {
                    this.setSession(data.data.access_token);
                    resolve(data.data.user);
                }
                else {
                    reject(data.data.error);
                }
            })
        });
    }

    signInWithToken()
    {
        return new Promise((resolve, reject) => {
            axios.post('/auth/token/sign-in', {
                token: this.getAccessToken()
            }).then(({data}) => {
                if (data.data.user) {
                    this.setSession(data.data.access_token);
                    resolve(data.data.user);
                }
                else {
                    reject(data.data.error);
                }
            })
        });
    }

    signInWithSocial()
    {
        return new Promise((resolve, reject) => {
            const params = new URLSearchParams(window.location.search);

            if (!params.get('url')) reject({message: 'Invalid url'});

            axios.get(params.get('url') || '').then(({data}) => {
                if (data.data.user) {
                    this.setSession(data.data.access_token);
                    resolve(data.data.user);
                }
                else {
                    reject(data.data.error);
                }
            })
        });
    }
}

const instance = new AuthService();

export default instance;
