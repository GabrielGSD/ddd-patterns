import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
    it("should create a customer A", () => {
        const customer = CustomerFactory.create("Customer A");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer A");
        expect(customer.Address).toBeUndefined();
    });

    it("should create a customer with address", () => {
        const address = new Address("Rua 1", 12, "12345-123", "São Paulo");
        const customer = CustomerFactory.createWithAddress("Customer A", address);
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer A");
        expect(customer.Address).toBe(address);
        expect(customer.Address.street).toBe("Rua 1");
    });
});