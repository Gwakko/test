import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ChatMessage, User} from '../../types';
import Message from './Message';
import {useChannels} from '../../hooks';

type Props = {
    user: User;
    messages: ChatMessage[];
    isLoading?: boolean;
    onTyping?: (event: React.KeyboardEvent<HTMLInputElement>, message: string) => void;
    onPressEnter?: (message: string) => void;
};

const NOTIFICATION_EVENT = '.chat.message.new';

interface INotification {
    id: number,
    content: string
}

interface INotificationTyping {
    isTyping: boolean;
}

const Chat = ({ user, messages, isLoading, onTyping, onPressEnter }: Props) => {
    const [isTyping, setIsTyping] = useState(false);
    const [message, setMessage] = useState('');

    const chatListRef: {
        current: HTMLDivElement | null
    } = useRef(null);

    const timerRef: {
        current: NodeJS.Timeout | null
    } = useRef(null);

    const channels = useChannels();
    const chatChannel = useMemo(() => {
        return channels && channels.private(`chat.${user.id}`);
    }, [channels, user.id]);

    const handlerOnTyping = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (onTyping) onTyping(event, message);
    }, [onTyping]);

    const handlerOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.currentTarget.value);
    }, []);

    const handlerOnKeyDown = useCallback(async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (onPressEnter && 'Enter' === event.key) onPressEnter(message);

        setMessage('');
    }, [onPressEnter]);

    useEffect(() => {
        if (!chatListRef.current) return;

        chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
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

    return (
        <div className="card">
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
                {messages.map(message => <Message isSender={user.id === message.user_id} {...message} />)}
            </div>
            <div className="form-group px-3 chat-input">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Type your message"
                    value={message}
                    onInput={handlerOnTyping}
                    onKeyDown={handlerOnKeyDown}
                    onChange={handlerOnChange}
                />
                {isTyping && (
                    <span className="typing text-muted">User typing...</span>
                )}
            </div>
        </div>
    );
};

export default React.memo(Chat);
