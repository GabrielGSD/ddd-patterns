import OrderItem from "./order_item";

export default class Order {
    private _id: string;
    private _customerID: string;
    private _items: OrderItem[] = [];
    private _total: number

    constructor (id: string, customerID: string, items: OrderItem[]) {
        this._id = id;
        this._customerID = customerID;
        this._items = items;
        this._total = this.total();
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerID
    }

    get items(): OrderItem[] {
        return this._items
    }

    validate() {
        if(this._id.length===0) {
            throw new Error("Id is required");
        }
        if(this._customerID.length===0) {
            throw new Error("customerID is required");
        }
        if(this._items.length===0) {
            throw new Error("Items are required");
        }
        if(this._items.some(item => item.quantity <= 0)) {
            throw new Error("Item qtd must be greater than 0");
        }
        return true;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
    }
}