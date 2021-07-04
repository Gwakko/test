export type TPusherConfig = {
    key: string;
    cluster: string;
    authEndpoint?: string;
    forceTLS: boolean;
    wsHost: string;
    wsPort: number | undefined;
};

const pusherConfig: TPusherConfig = {
    key: process.env.MIX_PUSHER_APP_KEY || '',
    cluster: process.env.MIX_PUSHER_APP_CLUSTER || '',
    // auth endpoint for private channels
    // e.g. for Laravel https://example.com/api/broadcasting/auth
    authEndpoint: process.env.MIX_PUSHER_APP_AUTH_ENDPOINT || '',
    wsHost: process.env.MIX_PUSHER_APP_HOST || '',
    wsPort: process.env.MIX_PUSHER_APP_POSRT ? +process.env.MIX_PUSHER_APP_POSRT : undefined,
    forceTLS: false
};


export default pusherConfig;
