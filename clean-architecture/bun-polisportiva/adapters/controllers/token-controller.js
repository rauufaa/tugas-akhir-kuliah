import verifyToken from "../../application/use-cases/auth/verify-token"
import add from "../../application/use-cases/user/add"

export default function tokenController(
    authServiceInterface,
    authServiceImpl,
) {
    const authService = authServiceInterface(authServiceImpl())

    const verify = async (request) => {
        const token = request.token
        try {
            const { decoded } = await verifyToken(token, authService)
            return decoded
        } catch (error) {
            if (error instanceof ResponseError) {
                return error.reconstruct()
            }
            throw error
        }
    }

    return {
        verify
    }
}