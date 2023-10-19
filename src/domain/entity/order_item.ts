export default class OrderItem {
    private _id: string;
    private _productID: string;
    private _name: string;
    private _price: number;
    private _quantity: number;

    constructor (id: string, name: string, price: number, productID: string, quantity: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._productID = productID;
        this._quantity = quantity;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get productId(): string {
        return this._productID
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }
    
    get quantity(): number {
        return this._quantity;
    }
}