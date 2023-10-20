import { Sequelize } from "sequelize-typescript";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import Order from "../../domain/entity/order"
import OrderItem from "../../domain/entity/order_item";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";
import OrderRepository from './order.repository'
import Product from "../../domain/entity/product";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 123, "ZipCode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "123",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem])

    const orderRepository = new OrderRepository();
    await orderRepository.create(order); 

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123"
        }
      ]
    })
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 123, "ZipCode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      1
    );

    const order = new Order("123", "123", [orderItem])

    const orderRepository = new OrderRepository();
    await orderRepository.create(order); 
    
    orderItem.changeQuantity(4)
    const product2 = new Product("2", "Product 2", 20);
    const product3 = new Product("3", "Product 3", 30);
    await productRepository.create(product2);
    await productRepository.create(product3);
    const orderItem2 = new OrderItem(
      "2",
      product2.name,
      product2.price,
      product2.id,
      1
    );
    const orderItem3 = new OrderItem(
      "3",
      product3.name,
      product3.price,
      product3.id,
      1
    );
    order.changeItems([orderItem, orderItem2, orderItem3])
    await orderRepository.update(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123"
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: "123",
          product_id: "2"
        },
        {
          id: orderItem3.id,
          name: orderItem3.name,
          price: orderItem3.price,
          quantity: orderItem3.quantity,
          order_id: "123",
          product_id: "3"
        }
      ]
    })
  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 123, "ZipCode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      1
    );

    const order = new Order("123", "123", [orderItem])
    const orderRepository = new OrderRepository();
    await orderRepository.create(order); 

    const orderFound = await orderRepository.find("123");
    expect(order).toEqual(orderFound)
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 123, "ZipCode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);
  
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);
  
    const orderItem1 = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      1
    );
  
    const orderItem2 = new OrderItem(
      "2",
      product.name,
      product.price,
      product.id,
      1
    );
  
    const order1 = new Order("1", "123", [orderItem1]);
    const order2 = new Order("2", "123", [orderItem2]);
  
    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);
    await orderRepository.create(order2);
  
    const ordersFound = await orderRepository.findAll();
    expect(ordersFound).toEqual([order1, order2]);
  });
  
});