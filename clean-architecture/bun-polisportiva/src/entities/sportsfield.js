export function sportsField({
    id,
    sportsFacilityId,
    name,
    sport,
    isIndoor,
    ownerId = null,
    priceListId,
    soccerFieldType = null,
    tennisFieldType = null
}) {
    return {
        getId: () => id,
        getSportsFacilityId: () => sportsFacilityId,
        getName: () => name,
        getSport: () => sport,
        getIsIndoor: () => isIndoor,
        getOwnerId: () => ownerId,
        getPriceListId: () => priceListId,
        getSoccerFieldType: () => soccerFieldType,
        getTennisFieldType: () => tennisFieldType,
    };
}

export default class SportsField {
    constructor({
      id,
      sportsFacilityId=null,
      name=null,
      sport=null,
      isIndoor=null,
      ownerId = null,
      priceListId=null,
      soccerFieldType = null,
      tennisFieldType = null
    }) {
      this._id = id;
      this._sportsFacilityId = sportsFacilityId;
      this._name = name;
      this._sport = sport;
      this._isIndoor = isIndoor;
      this._ownerId = ownerId;
      this._priceListId = priceListId;
      this._soccerFieldType = soccerFieldType;
      this._tennisFieldType = tennisFieldType;
    }
  
    getId() {
      return this._id;
    }
  
    getSportsFacilityId() {
      return this._sportsFacilityId;
    }
  
    getName() {
      return this._name;
    }
  
    getSport() {
      return this._sport;
    }
  
    getIsIndoor() {
      return this._isIndoor;
    }
  
    getOwnerId() {
      return this._ownerId;
    }
  
    getPriceListId() {
      return this._priceListId;
    }
  
    getSoccerFieldType() {
      return this._soccerFieldType;
    }
  
    getTennisFieldType() {
      return this._tennisFieldType;
    }
  }
  