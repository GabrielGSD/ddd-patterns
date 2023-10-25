import Address from "../value-object/address";
import Customer from "../entity/customer";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLog1Handler from "./handler/send-console-log-1.handler";
import SendConsoleLog2Handler from "./handler/send-console-log-2.handler";
import SendConsoleLogHandler from "./handler/send-console-log.handler";

describe("Customer events tests", () => {
    it("Should register ConsoleLogsEvents when a customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const eventConsoleLog1Handler = new SendConsoleLog1Handler();
        const eventConsoleLog2Handler = new SendConsoleLog2Handler();

        const customer = new Customer("1", "John Doe");
        const address = new Address("Rua 1", 12, "12345-123", "São Paulo");
        customer.Address = address;

        eventDispatcher.register("CustomerCreatedEvent1", eventConsoleLog1Handler);
        eventDispatcher.register("CustomerCreatedEvent2", eventConsoleLog2Handler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent1"]
        ).toBeDefined();
        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent2"]
        ).toBeDefined();
        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent1"].length
        ).toBe(1);
        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent2"].length
        ).toBe(1);
        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent1"][0]
        ).toMatchObject(eventConsoleLog1Handler);
        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent2"][0]
        ).toMatchObject(eventConsoleLog1Handler);
        
    });

    it("Should register AddressChangedEvent when a customer's address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventConsoleLogHandler = new SendConsoleLogHandler();

        const customer = new Customer("1", "John Doe");
        const address = new Address("Rua 1", 12, "12345-123", "São Paulo");
        customer.Address = address;

        const newAddress = new Address("Rua 2", 13, "65432-321", "Minas Gerais");
        customer.changeAddress(newAddress);

        eventDispatcher.register("CustomerChangeAddressEvent", eventConsoleLogHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]
        ).toBeDefined();
        expect(
            eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length
        ).toBe(1);
        expect(
            eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]
        ).toMatchObject(eventConsoleLogHandler);
    });

    it("should unregister an event handler", async () => {
        const eventDispatcher = new EventDispatcher();
        const eventConsoleLogHandler = new SendConsoleLogHandler();

        const customer = new Customer("1", "John Doe");
        const address = new Address("Rua 1", 12, "12345-123", "São Paulo");
        customer.Address = address;

        const newAddress = new Address("Rua 2", 13, "65432-321", "Minas Gerais");
        customer.changeAddress(newAddress);

        eventDispatcher.register("CustomerChangeAddressEvent", eventConsoleLogHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]
        ).toMatchObject(eventConsoleLogHandler);

        eventDispatcher.unregister("CustomerChangeAddressEvent", eventConsoleLogHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]
        ).toBeDefined();
        expect(
            eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length
        ).toBe(0);
    });

    it("should unregister all event handler", async () => {
        const eventDispatcher = new EventDispatcher();
        const eventConsoleLog1Handler = new SendConsoleLog1Handler();
        const eventConsoleLog2Handler = new SendConsoleLog2Handler();

        const customer = new Customer("1", "John Doe");
        const address = new Address("Rua 1", 12, "12345-123", "São Paulo");
        customer.Address = address;

        eventDispatcher.register("CustomerCreatedEvent1", eventConsoleLog1Handler);
        eventDispatcher.register("CustomerCreatedEvent2", eventConsoleLog2Handler);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent1"][0]
        ).toMatchObject(eventConsoleLog1Handler);
        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent2"][0]
        ).toMatchObject(eventConsoleLog2Handler);

        eventDispatcher.unregisterAll();

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent1"]
        ).toBeUndefined();
        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent2"]
        ).toBeUndefined();
    });

    it("should notify an event", async () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1Handler();
        const eventHandler2 = new SendConsoleLog2Handler();
        const eventHandlers = [eventHandler1, eventHandler2];
        const spyEventHandlers = eventHandlers.map(eventHandler => jest.spyOn(eventHandler, "handle"));

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
        ).toMatchObject(eventHandler1);
        expect(
            eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
        ).toMatchObject(eventHandler2);

        const event = new CustomerCreatedEvent({
            id: '1',
            name: 'Customer 1',
            address: {
                rua: 'Rua 1',
                numero: '1'
            }
        });
        eventDispatcher.notify(event);

        expect(spyEventHandlers[0]).toHaveBeenCalled();
        expect(spyEventHandlers[1]).toHaveBeenCalled();
    });
    
    it("should notify change address event", async () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
        ).toMatchObject(eventHandler);

        const event = new CustomerAddressChangedEvent({
            id: '1',
            name: 'Customer 1',
            address: {
                rua: 'Rua 1',
                numero: '1'
            }
        });
        eventDispatcher.notify(event);
        expect(spyEventHandler).toHaveBeenCalled();
    });
});