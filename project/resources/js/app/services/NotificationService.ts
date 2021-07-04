import {ReactNotificationOptions, store} from 'react-notifications-component';

export type INotificationOption = Partial<ReactNotificationOptions>;

export enum Container {
    TOP_FULL = 'top-full',
    TOP_LEFT = 'top-left',
    TOP_RIGHT = 'top-right',
    TOP_CENTER = 'top-center',
    CENTER = 'center',
    BOTTOM_FULL = 'bottom-full',
    BOTTOM_LEFT = 'bottom-left',
    BOTTOM_RIGHT = 'bottom-right',
    BOTTOM_CENTER = 'bottom-center'
}

export enum Type {
    SUCCESS = 'success',
    DANGER = 'danger',
    INFO = 'info',
    DEFAULT = 'default',
    WARNING = 'warning'
}

export enum Insert {
    TOP = 'top',
    BOTTOM = 'bottom'
}

const defaultOptions: ReactNotificationOptions = {
    container: Container.TOP_RIGHT,
    type: Type.DEFAULT,
    insert: Insert.TOP,
    dismiss: {
        duration: 3000,
        onScreen: true
    },
};

class NotificationService {
    private addNotification(props: INotificationOption) {
        store.addNotification({
            ...defaultOptions,
            ...props
        });
    }

    default(props: INotificationOption) {
        this.addNotification({
            ...props,
            type: Type.DEFAULT
        });
    }

    info(props: INotificationOption) {
        this.addNotification({
            ...props,
            type: Type.INFO
        });
    }

    success(props: INotificationOption) {
        this.addNotification({
            ...props,
            type: Type.SUCCESS
        });
    }

    danger(props: INotificationOption) {
        this.addNotification({
            ...props,
            type: Type.DANGER
        });
    }

    warning(props: INotificationOption) {
        this.addNotification({
            ...props,
            type: Type.WARNING
        });
    }
}

const instance = new NotificationService();

export default instance;
