import Address from './domain/customer/value-object/address';
import Customer from './domain/customer/entity/customer';
import Order from './domain/checkout/entity/order';
import OrderItem from './domain/checkout/entity/order_item';

// Customer Aggregate
let customer = new Customer("1", "John Doe");
const address = new Address("Rua 1", 12, "12345-123", "São Paulo");
customer.Address = address;
customer.activate();

// Order Aggregate
const item1 = new OrderItem("1", "Item 1", 10, "p1", 2);
const item2 = new OrderItem("2", "Item 2", 20, "p2", 2);
const order = new Order("1", customer.id, [item1, item2]);