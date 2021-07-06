import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {User} from '../../types';
import axios from "axios";
import AppLayout from "../../shared/ui/layouts/AppLayout";
import {initUser} from "../../app/contexts/auth-context";
import {useAuth} from "../../hooks";

const Dashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const {user} = useAuth();

    useEffect(() => {
        axios.get('/api/v1/users')
            .then(({data}) => {
                setUsers(data.data.filter((u: User) => u.id !== user.id));
                setIsLoading(false);
            })
            .catch(error => setIsLoading(false));
    }, []);

    return (
        <AppLayout>
            <main className="py-4">

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Dashboard</div>

                                <div className="card-body">
                                    You are logged in!
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center mt-3">
                        {isLoading && (
                            <h4>Loading...</h4>
                        )}
                        {users.map(user => (
                            <div className="col-md-4" key={user.id}>
                                <div className="card">
                                    <img className="card-img-top" src={user.avatar_url || initUser.avatar_url || ''} alt="Card image cap"/>
                                    <div className="card-body">
                                        <h5 className="card-title">{user.name || user.nickname}</h5>
                                        <p className="card-text">
                                            Email: {user.email}
                                        </p>
                                        <Link to={`/chat/${user.id}`} className="btn btn-primary">Open dialog</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </AppLayout>
    );
};

export default Dashboard;
