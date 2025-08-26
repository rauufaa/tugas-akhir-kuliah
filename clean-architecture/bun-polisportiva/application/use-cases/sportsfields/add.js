import sportsField from "../../../src/entities/sportsfield";

export default async function add({
    sportsFacilityId,
    name,
    sport,
    isIndoor,
    ownerId = null,
    priceListId,
    soccerFieldType = null,
    tennisFieldType = null
}, repository) {

    const newSportsField = sportsField({
        sportsFacilityId,
        name,
        sport,
        isIndoor,
        ownerId,
        priceListId,
        soccerFieldType,
        tennisFieldType
    })

    const result = await repository.add(newSportsField);
    if(!result) throw new ResponseError(404, "Show is not found")
    return result
}