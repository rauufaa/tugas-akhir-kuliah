export default class SportsFacility{
    constructor({
        id,
        ownerId=null,
        name=null,
        totalSportsFields=null,
        addressId=null,
        phone=null
    }) {
        this._id = id;
        this._ownerId = ownerId;
        this._name = name; 
        this._totalSportsFields = totalSportsFields;
        this._addressId = addressId;
        this._phone = phone;
    }

    getId() {
        return this._id
    }

    getOwnerId() {
        return this._ownerId
    }

    getName() {
        return this._name
    }

    getTotalSportsFields() {
        return this._totalSportsFields
    }

    getAddressId() {
        return this._addressId
    }

    getPhone() {
        return this._phone
    }
}