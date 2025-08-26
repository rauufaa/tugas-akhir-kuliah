import SportsField from "../../../src/entities/sportsfield"

export default async function addSportsField(facilityId, {
    name,
    sport,
    isIndoor,
    pricePerHour,
}, sportsFacilityDbRepository, priceListDbRepository, sportsFieldDbRepository) {
    const facilityDetail = await sportsFacilityDbRepository.findById(facilityId)
    if (!facilityDetail.length) throw new ResponseError(404, "Show is not found")
    
    const priceDetail = await priceListDbRepository.add(pricePerHour)
    if (!priceDetail) throw new ResponseError(404, "Show is not found")

    const newSportsField = new SportsField({
        sportsFacilityId: facilityDetail.id,
        name,
        sport,
        isIndoor,
        ownerId: facilityDetail.ownerId,
        priceListId: priceDetail.id,
        soccerFieldType,
        tennisFieldType
    })
    const fieldDetailResult = await sportsFieldDbRepository.add(newSportsField)

    if (!fieldDetailResult.length) throw new ResponseError(404, "Show is not found")
    return fieldDetailResult
}