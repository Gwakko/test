export type Route = {
    component: () => any;
    path?: string;
    exact?: boolean;
    auth?: string[];
    settings?: string;
};

export type PagesConfig = {
    settings?: string;
    auth?: string[];
    routes: Route[];
};

export type HistoryState = {
    redirectUrl?: string;
};
