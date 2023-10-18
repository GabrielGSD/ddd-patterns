import Address from './domain/entity/address';
import Customer from './domain/entity/customer';
import Order from './domain/entity/order';
import OrderItem from './domain/entity/order_item';

// Customer Aggregate
let customer = new Customer("1", "John Doe");
const address = new Address("Rua 1", 12, "12345-123", "São Paulo");
customer.Address = address;
customer.activate();

// Order Aggregate
const item1 = new OrderItem("1", "Item 1", 10, "p1", 2);
const item2 = new OrderItem("2", "Item 2", 20, "p2", 2);
const order = new Order("1", customer.id, [item1, item2]);