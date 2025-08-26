
export default async function login(email, password, userDbRepository, authService) {

    try {
        const user = await userDbRepository.findByEmail(email)
        if (!user) {
            throw new ResponseError(404, "User not found")
        }

        const isMatch = await authService.comparePassword(password, user.password)

        if (!isMatch) {
            throw new ResponseError(400, "Password false")
        }
        const exp = Math.floor(Date.now() / 1000) + 3600
        const iat = Math.floor(Date.now() / 1000)
        const token = await authService.generateToken({
            exp: exp,
            nbf: exp,
            iat: iat,
            aud: "http://localhost:3000",
            iss: "http://localhost:3000",
            sub: "http://localhost:3000",
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        })

        if (!token) throw new ResponseError(500, "Failed to generate token")

        return {
            token, user
        }
    } catch (error) {
        throw error
    }

}