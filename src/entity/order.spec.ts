import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    it("Should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("Id is required");
    });

    it("Should throw error when customerID is empty", () => {
        expect(() => {
            let order = new Order("1", "", []);
        }).toThrowError("customerID is required");
    });

    it("Should throw error when item is 0", () => {
        expect(() => {
            let order = new Order("1", "1", []);
        }).toThrowError("Items are required");
    });

    it("Should calculate total", () => {
        const item = new OrderItem("1", "Item 1", 10, "p1", 2);
        const item2 = new OrderItem("2", "Item 2", 20, "p2", 2);
        const order = new Order("1", "1", [item]);

        let total = order.total();

        expect(total).toBe(20);

        const order2 = new Order("2", "2", [item, item2]);
        total = order2.total();
        expect(total).toBe(60);
    });

    it("Should throw error if the item qtd is less or equal than 0", () => {
        expect(() => {
            const item = new OrderItem("1", "Item 1", 10, "p1", 0);
            const order = new Order("1", "1", [item]);
        }).toThrowError("Item qtd must be greater than 0");
    });
});