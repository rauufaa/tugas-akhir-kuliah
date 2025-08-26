import addPrice from "../../application/use-cases/pricelist/add";
import addSportsField from "../../application/use-cases/sportsfacility/add-sports-field";
import findAll from "../../application/use-cases/sportsfacility/findall";
import findById from "../../application/use-cases/sportsfacility/find-by-id";
import addField from "../../application/use-cases/sportsfields/add";

export default function sportsFacilitiesController(
    sportsFacilityDbRepositoryInterface,
    sportsFacilityDbRepositoryImpl,
    sportsFieldDbRepositoryInterface,
    sportsFieldDbRepositoryImpl,
    priceListDbRepositoryInterface,
    priceListDbRepositoryImpl,
    userDbRepositoryInterface,
    userDbRepositoryImpl,
    addressDbRepositoryInterface,
    addressDbRepositoryImpl
) {
    const sportsFacilityDbRepository = sportsFacilityDbRepositoryInterface(sportsFacilityDbRepositoryImpl());
    const sportsFieldDbRepository = sportsFieldDbRepositoryInterface(sportsFieldDbRepositoryImpl());
    const priceListDbRepository = priceListDbRepositoryInterface(priceListDbRepositoryImpl());
    const userDbRepository = userDbRepositoryInterface(userDbRepositoryImpl());
    const addressDbRepository = addressDbRepositoryInterface(addressDbRepositoryImpl());

    const getSportsFacility = async (request) => {
        let id = request.params.id
        try {
            const { detail, owner, address, sportsFields } = await findById(id, sportsFacilityDbRepository, sportsFieldDbRepository, priceListDbRepository, userDbRepository, addressDbRepository);
            return {
                statusCode: 200,
                status: "SUCCESS",
                message: "Success retrieved sports facility data",
                data: {
                    id: detail.id,
                    name: detail.name,
                    totalSportsFields: detail.totalSportsFields,
                    phone: detail.phone,
                    address: {
                        id: address.addressId,
                        state: address.state,
                        city: address.city,
                        streetName: address.streetName,
                        streetNumber: address.streetNumber,
                        postcode: address.postcode
                    },
                    owner: {
                        id: owner.id,
                        username: owner.username,
                        password: owner.password,
                        email: owner.email,
                        firstName: owner.firstName,
                        lastName: owner.lastName,
                        fiscalCode: owner.fiscalCode

                    },
                    sportsFields:
                        sportsFields.fieldList.map((val, i) => {
                            return {
                                id: val.id,
                                name: val.name,
                                sport: val.sport,
                                isIndoor: val.isIndoor,
                                priceList: {
                                    id: sportsFields.priceList[i].id,
                                    pricePerHour: sportsFields.priceList[i].pricePerHour,
                                },
                                soccerFieldType: val.soccerFieldType,
                                tennisFieldType: val.tennisFieldType,
                            }
                        })

                }
            }
        } catch (error) {
            if (error instanceof ResponseError) {
                return error.reconstruct()
            }
            throw error;
        }

    }
    const getAllSportsFacilities = async (request) => {
        let ownerId = request.query.filter_by_owner_id
        let page = request.query.page
        let limit = request.query.filter

        try {

            const { detail, owner, address, sportsFields } = await findAll(ownerId, page, limit, sportsFacilityDbRepository, sportsFieldDbRepository, priceListDbRepository, userDbRepository, addressDbRepository);
            const sportsFieldWithPrice = sportsFields.fieldList.map((fieldVal, i) => {
                return fieldVal.map((inVal, j) => {
                    return {
                        id: inVal.id,
                        name: inVal.name,
                        sport: inVal.sport,
                        isIndoor: inVal.isIndoor,
                        priceList: inVal.priceListId == sportsFields.priceList[i][j].id ? {
                            id: sportsFields.priceList[i][j].id,
                            pricePerHour: sportsFields.priceList[i][j].pricePerHour,
                        } : {
                            id: null,
                            pricePerHour: null,
                        },
                        soccerFieldType: inVal.soccerFieldType,
                        tennisFieldType: inVal.tennisFieldType,
                    }
                })
            })
            return {
                statusCode: 200,
                status: "SUCCESS",
                message: "Success retrieved sports facility data",
                data: detail.map((val, i) => {
                    return {
                        id: val.id,
                        name: val.name,
                        totalSportsFields: val.totalSportsFields,
                        phone: val.phone,
                        address: val.addressId == address[i].id ? {
                            id: address[i].id,
                            state: address[i].state,
                            city: address[i].city,
                            streetName: address[i].streetName,
                            streetNumber: address[i].streetNumber,
                            postcode: address[i].postcode
                        } : {
                            id: null,
                            state: null,
                            city: null,
                            streetName: null,
                            streetNumber: null,
                            postcode: null
                        },
                        owner: val.ownerId == owner[i].id ? {
                            id: owner[i].id,
                            username: owner[i].username,
                            password: owner[i].password,
                            email: owner[i].email,
                            firstName: owner[i].firstName,
                            lastName: owner[i].lastName,
                            fiscalCode: owner[i].fiscalCode

                        } : {
                            id: null,
                            username: null,
                            password: null,
                            email: null,
                            firstName: null,
                            lastName: null,
                            fiscalCode: null
                        },
                        sportsFields: sportsFieldWithPrice[i].map((inVal, j) => {
                            if (inVal.sportsFacilityId == val.id) {
                                return inVal
                            }
                        })
                    }
                }),
            }
        } catch (error) {
            if (error instanceof ResponseError) {
                return error.reconstruct()
            }
            throw error;
        }
    }

    const addSportsFieldByFacility = async (request) => {
        let id = request.params.id
        let {
            name,
            sport,
            isIndoor,
            pricePerHour,
        } = request.body
        try {

            const result = await addSportsField(id, {
                name, sport, isIndoor, pricePerHour
            }, sportsFacilityDbRepository, priceListDbRepository, sportsFieldDbRepository)
            return result
        } catch (error) {
            if (error instanceof ResponseError) {
                return error.reconstruct()
            }
            throw error;
        }

    }

    return {
        getSportsFacility,
        getAllSportsFacilities,
        addSportsFieldByFacility
    }
}