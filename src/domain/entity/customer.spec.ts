import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("Should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John Doe");
        }).toThrowError("Id is required");
    });

    it("Should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("1", "");
        }).toThrowError("Name is required");
    });

    it("Should activate customer", () => {
        // Arrange
        const customer = new Customer("1", "John Doe");
        const address = new Address("Rua 1", 12, "12345-123", "São Paulo");
        customer.Address = address;
        // Act
        customer.activate();
        // Assert
        expect(customer.isActive()).toBe(true);
    });

    it("Should throw error when address is undefined when you activate a customer", () => {
        expect(() => {
            const customer = new Customer("1", "John Doe");
            customer.activate();
        }).toThrowError("Address is required");
    });

    it("Should deactivate customer", () => {
        const customer = new Customer("1", "John Doe");
        customer.desactivate();
        expect(customer.isActive()).toBe(false);
    });
});