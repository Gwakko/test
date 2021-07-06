import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";
import AppLayout from "../../shared/ui/layouts/AppLayout";
import {ChatMessage} from "../../types";
import {useAuth} from "../../hooks";
import Chat from '../../features/chat/Chat';

interface IRouteParameters {
    id: string;
}

const PrivateChat: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const {id} = useParams<IRouteParameters>();
    const {user} = useAuth();

    const handlerTyping = useCallback(() => {
        // chatChannel.whisper('typing', {
        //     user: id,
        //     isTyping: true
        // })
    }, []);

    const handlerPressKey = useCallback(async (message: string) => {
        if (message.trim().length === 0) return;

        const {data} = await axios.post(`/api/v1/users/${id}/messages`, {message});
        setMessages(prevState => [...prevState, data.data]);
    }, []);

    const subscribe = async () => {
        const response = await axios.get(`/api/v1/users/${id}/messages`);

        if (response.status == 502) {
            console.error(response)
            await subscribe();
        }
        else if (response.status !== 200) {
            console.error(response)
            await new Promise(resolve => setTimeout(resolve, 1000));
            await subscribe();
        }
        else {
            setMessages(response.data.data);
            await new Promise(resolve => setTimeout(resolve, 500));
            await subscribe();
        }
    };

    useEffect(() => {
        subscribe();
    }, []);

    useEffect(() => {
        if (isLoading && messages.length) {
            setIsLoading(false);
        }
    }, [messages]);

    return (
        <AppLayout>
            <main className="py-4">

                <div className="chat-room">

                    <div className="container">

                        <div className="row">
                            <div className="col-12">
                                <Link to="/dashboard" className="btn btn-primary">
                                    <i className="fas fa-arrow-left"></i> Back To Dashboard
                                </Link>
                            </div>
                        </div>

                        <div className="w-100 d-flex justify-content-center pt-5">

                            <Chat user={user} messages={messages} onPressEnter={handlerPressKey} onTyping={handlerTyping} />

                        </div>

                    </div>

                </div>

            </main>
        </AppLayout>
    );
};

export default PrivateChat;
