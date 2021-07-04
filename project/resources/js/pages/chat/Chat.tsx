import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from "axios";
import AppLayout from "../../shared/layouts/AppLayout";
import {ChatMessage} from "../../types";
import {useAuth, useChannels} from "../../hooks";

interface IRouteParameters {
    id: string;
}

const NOTIFICATION_EVENT = '.chat.message.new';

interface INotification {
    id: number,
    content: string
}

interface INotificationTyping {
    isTyping: boolean;
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const timerRef: {
        current: NodeJS.Timeout | null
    } = useRef(null);

    const chatListRef: {
        current: HTMLDivElement | null
    } = useRef(null);

    const {id} = useParams<IRouteParameters>();
    const {user} = useAuth();

    const channels = useChannels();
    const chatChannel = useMemo(() => {
        return channels && channels.private(`chat.${user.id}`);
    }, [channels, user.id]);

    const handlerTyping = () => {
        // chatChannel.whisper('typing', {
        //     user: id,
        //     isTyping: true
        // })
    };

    const handlerOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.currentTarget.value);
    };

    const handlerPressKey = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if ('Enter' === event.key && message.trim().length > 0) {
            const {data} = await axios.post(`/api/v1/users/${id}/messages`, {message});
            setMessages(prevState => [...prevState, data.data]);
            setMessage('');
        }
    };

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

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        if (isTyping) {
            timerRef.current = setTimeout(() => setIsTyping(false), 1000);
        }
    }, [isTyping]);


    useEffect(() => {
        if (!chatChannel) {
            return;
        }

        chatChannel
            .listen(NOTIFICATION_EVENT, (event: any) => {
                console.log(event)
            })
            .listenForWhisper('typing', (event: INotificationTyping) => {
                setIsTyping(event.isTyping)
            })

        return () => {
            chatChannel.stopListening(NOTIFICATION_EVENT)
        }
    }, [chatChannel]);

    useEffect(() => {
        if (!chatListRef.current) return;

        chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
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

                        <div className="w-100 d-flex justify-content-center">
                            <div className="card mt-5">
                                <div className="d-flex flex-row justify-content-between p-3 adiv text-white">
                                    <i className="fas fa-chevron-left"></i> <span className="pb-3">Live chat</span> <i className="fas fa-times"></i>
                                </div>
                                <div className="chat-list" ref={chatListRef}>
                                    {isLoading && (
                                        <div className="d-flex flex-row p-3">
                                            <div className="chat ml-2 p-3">
                                                Loading...
                                            </div>
                                        </div>
                                    )}
                                    {messages.map(message => (user.id === message.user_id) ? (
                                            <div className="d-flex flex-row p-3" key={message.id}>
                                                <img className="avatar" src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-7.png" width="30" height="30"/>
                                                <div className="chat ml-2 p-3">
                                                    {message.message}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="d-flex flex-row p-3 justify-content-end" key={message.id}>
                                                <div className="bg-white mr-2 p-3">
                                                    <span className="text-muted">{message.message}</span>
                                                </div>
                                                <img className="avatar" src="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-7.png"
                                                     width="30" height="30"/>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="form-group px-3 chat-input">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Type your message"
                                        value={message}
                                        onInput={handlerTyping}
                                        onKeyDown={handlerPressKey}
                                        onChange={handlerOnChange}
                                    />
                                    {isTyping && (
                                        <span className="typing text-muted">User typing...</span>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </main>
        </AppLayout>
    );
};

export default Chat;
