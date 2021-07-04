import React, {useEffect, useState} from 'react';
import ChannelsContext from '../contexts/channels-context';
import {TChannels} from '../../types/channels';
import pusherConfig, {TPusherConfig} from '../configs/pusherConfing';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import {useAuth} from "../../hooks";

const getChannels = (pusherConfig: TPusherConfig, authToken?: string) => {
    const client = new Pusher(pusherConfig.key, {
        cluster: pusherConfig.cluster,
        forceTLS: pusherConfig.forceTLS,
        // authEndpoint: pusherConfig.authEndpoint,
        // wsHost: pusherConfig.wsHost,
        // wsPort: pusherConfig.wsPort,
        // wssPort: pusherConfig.wsPort,
        wsHost: pusherConfig.wsHost,
        wsPort: 80,
        wssPort: 443,
        disableStats: true,
        auth: authToken ? {
            headers: {
                // pass the authorization token when using private channels
                Authorization: `Bearer ${authToken}`,
            },
        }: undefined,
    })

    return new Echo({
        broadcaster: 'pusher',
        client: client,
        wsHost: pusherConfig.wsHost,
        wsPort: 6001,
        wssPort: 6001,
        disableStats: true,
    });
};

const ChannelsProvider = ({children, authToken}: {
    children: React.ReactElement,
    authToken?: string
}) => {
    const [channels, setChannels] = useState<TChannels>(undefined);

    const {user} = useAuth();

    useEffect(() => {
        const channels = getChannels(pusherConfig, authToken);
        setChannels(channels);
        return () => {
            channels.disconnect()
            setChannels(undefined)
        };
    }, [user, authToken]);

    return (
        <ChannelsContext.Provider value={channels}>
            {children}
        </ChannelsContext.Provider>
    )
};

export default ChannelsProvider;
