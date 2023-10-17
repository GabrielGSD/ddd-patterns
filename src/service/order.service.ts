import Order from "../entity/order";
import Customer from "../entity/customer";
import OrderItem from "../entity/order_item";

export default class OrderService {
    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }

    static placeOrder(customer: Customer, items: OrderItem[], id: string): Order {
        const order = new Order(id, customer.id, items);
        customer.activate();
        return order;
    }
}