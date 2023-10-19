import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../db/sequelize/model/product.model';
import Product from '../../domain/entity/product';
import ProductRepository from './product.repository';

describe("Product repository test", () => {
    let sequileze: Sequelize;
  
    beforeEach(async () => {
      sequileze = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
      });
      sequileze.addModels([ProductModel]);
      await sequileze.sync();
    });
  
    afterEach(async () => {
      await sequileze.close();
    });
  
    it("should create a product", async () => {
      const productRepository = new ProductRepository();
      const product = new Product("1", "Product 1", 100);
  
      await productRepository.create(product);
  
      const productModel = await ProductModel.findOne({ where: { id: "1" } });
  
      expect(productModel.toJSON()).toStrictEqual({
        id: "1",
        name: "Product 1",
        price: 100,
      });
    });

    it("should update a product", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("1", "Product 1", 100);
    
        await productRepository.create(product);
    
        const productModel = await ProductModel.findOne({ where: { id: "1" } });
    
        expect(productModel.toJSON()).toStrictEqual({
          id: "1",
          name: "Product 1",
          price: 100,
        });

        product.changeName("Product 2");
        product.changePrice(200);

        await productRepository.update(product);

        const productModelUpdated = await ProductModel.findOne({ where: { id: "1" } });
    
        expect(productModelUpdated.toJSON()).toStrictEqual({
          id: "1",
          name: "Product 2",
          price: 200,
        });
    });

    it("should find a product", async () => {
      const productRepository = new ProductRepository();
      const product = new Product("1", "Product 1", 100);
  
      await productRepository.create(product);
  
      const productModel = await ProductModel.findOne({ where: { id: "1" } });


      const productFound = await productRepository.find("1");
  
      expect(productModel.toJSON()).toStrictEqual({
        id: productFound.id,
        name: productFound.name,
        price: productFound.price,
      });
    });

    it("should find all prorducts", async() => {
      const productRepository = new ProductRepository();
      const product1 = new Product("1", "Product 1", 100);
      const product2 = new Product("2", "Product 2", 200);
      await productRepository.create(product1);
      await productRepository.create(product2);

      const foundProducts = await productRepository.findAll();
      const products = [product1, product2];

      expect(products).toEqual(foundProducts);
    });
});