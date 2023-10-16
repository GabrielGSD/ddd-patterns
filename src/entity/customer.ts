import Address from "./address";

export default class Customer {
    private _id: string;
    private _name: string = "";
    private _address!: Address;
    private _active: boolean;

    constructor (id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required");
        }
    }

    get name(): string {
        return this._name;
    }

    isActive(): boolean {
        return this._active;
    }

    // Simplesmente uma forma de mudar o atributo _name sem expressividade, eu posso não utilizar, ele está jogado
    // set name (name: string) {
    //     this._name = name;
    // }

    // Regrar especifica de negócio, intenção que o sistema tem, é o motivo pelo qual o nome existe e o cliente precisa mudar
    changeName (name: string) {
        this._name = name;
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is required");
        }
        this._active = true;
    }

    desactivate() {
        this._active = false;
    }

    set Address(address: Address) {
        this._address = address;
    }
}