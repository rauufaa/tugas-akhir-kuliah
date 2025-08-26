import add from "../../application/use-cases/user/add"

export default function authController(
    userDBRepository,
    userDBRepositoryImpl,
    authServiceInterface,
    authServiceImpl,
) {
    const dbRepositoryUser = userDBRepository(userDBRepositoryImpl())
    const authService = authServiceInterface(authServiceImpl())

    const login = async (request) => {
        
    }


    return {
        login,
    }
}