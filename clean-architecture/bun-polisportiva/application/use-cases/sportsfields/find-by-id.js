import { ResponseError } from "../../../src/exceptions/response-error";

export default async function findById(id, repository){
    const sportsField = await repository.findById(id);
    if(!sportsField) throw new ResponseError(404, "Sports field not found")
    return sportsField
}