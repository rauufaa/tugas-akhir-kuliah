import { ResponseError } from "../../../src/exceptions/response-error";


export default async function verifyToken(token, authService) {
    
    if (!token) {
        throw new ResponseError(404,'No access token found');
    }
    if (token.split(' ')[0] !== 'Bearer') {
        throw new ResponseError(404,'Invalid access token format');
    }
    try {
        const decoded = await authService.verifyToken(token.split(' ')[1]);
        return { decoded };
    } catch (err) {
        throw new ResponseError(400,'Token is not valid');
    }
}