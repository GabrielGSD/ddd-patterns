import OrderItem from "./order_item";

export default class Order {
    _id: string;
    _customerID: string;
    _items: OrderItem[] = [];

    constructor (id: string, customerID: string, items: OrderItem[]) {
        this._id = id;
        this._customerID = customerID;
        this._items = items;
    }
}