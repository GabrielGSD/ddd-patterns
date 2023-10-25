import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import eventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};
    
    get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }
    
    register(eventName: string, eventHandler: EventHandlerInterface): void {
        console.log(`Registrando o evento: ${ eventName }`)
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(eventHandler);
        console.log(`Evento: ${ eventName } registrado com sucesso!`)
    }
    
    notify(event: eventInterface): void {
        const eventName = event.constructor.name;
        console.log("Notificando ", this.eventHandlers, eventName)
        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach((eventHandler: EventHandlerInterface) => {
                eventHandler.handle(event);
            });
        }
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface<eventInterface>): void {
        if(this.eventHandlers[eventName]) {
            const index = this.eventHandlers[eventName].indexOf(eventHandler);
            if(index !== -1) {
                this.eventHandlers[eventName].splice(index, 1);
            }
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {};
    }
}