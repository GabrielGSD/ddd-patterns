import sequelize from "sequelize/types/sequelize";
import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface{
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
  
  async update(entity: Order): Promise<void> {
    const t = await OrderModel.sequelize.transaction();
    try {
      for (const item of entity.items) {
        const [orderItem, created] = await OrderItemModel.findOrCreate({
          where: { id: item.id },
          defaults: {
            order_id: entity.id, 
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          },
          transaction: t,
        });
  
        if (!created) {
          orderItem.name = item.name;
          orderItem.price = item.price;
          orderItem.product_id = item.productId;
          orderItem.quantity = item.quantity;
          
          await orderItem.save({ transaction: t });
        }
      }
      const existingOrder = await OrderModel.findByPk(entity.id, { transaction: t });

      if (!existingOrder) {
        throw new Error("Pedido não encontrado");
      }

      existingOrder.total = entity.total();
      await existingOrder.save({ transaction: t });
    }
    catch(error) {
      await t.rollback()
      throw error
    }
  }

  async find(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}