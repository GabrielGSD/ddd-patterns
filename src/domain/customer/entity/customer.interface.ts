import Address from "../value-object/address";

export default interface Customer {
    get id(): string;
    get name(): string;
    get Address(): Address;
    get rewardPoints(): number;
}