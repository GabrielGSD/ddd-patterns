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
        const item = new OrderItem("1", "Item 1", 10);
        const item2 = new OrderItem("2", "Item 2", 20);
        const order = new Order("1", "1", [item]);

        let total = order.total();

        expect(total).toBe(10);

        const order2 = new Order("2", "2", [item, item2]);
        total = order2.total();
        expect(total).toBe(30);
    });
});