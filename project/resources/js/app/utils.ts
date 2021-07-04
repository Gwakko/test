import {PagesConfig, Route} from '../types';

export const generateRoutesFromConfigs: (configs: PagesConfig[]) => Route[] = (configs) => {
    let allRoutes: Route[] = [];

    configs.forEach(config => {
        allRoutes = [
            ...allRoutes,
            ...config.routes.map(route => ({
                ...route,
                settings: route.settings || config.settings,
                auth: route.auth || config.auth,
            }))
        ];
    })

    return allRoutes;
};
