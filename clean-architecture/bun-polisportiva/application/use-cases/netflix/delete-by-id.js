import { ResponseError } from "../../../src/exceptions/response-error";

export default async function deleteById(showId, showRepository){
    const show = await showRepository.deleteById(showId);
    if(!show) throw new ResponseError(404, "Show is not found")
    return show
}