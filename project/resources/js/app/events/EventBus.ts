type TEvent = (payload: any) => void;

class EventBus
{
    private events: {
        [key: string]: TEvent[]
    };

    constructor()
    {
        this.events = {};
    }

    on(eventName: string, callback: TEvent)
    {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(callback);

        return () => {
            this.off(eventName, callback);
        };
    }

    off(eventName: string, callback: TEvent)
    {
        this.events[eventName] = this.events[eventName].filter(eventCallback => callback !== eventCallback);

        return this;
    }

    emit(eventName: string, data?: any)
    {
        const event = this.events[eventName];

        if (event) {
            event.forEach(callback => {
                callback.call(null, data);
            });
        }

        return this;
    }
}

const eventBus = new EventBus();

export default eventBus;
