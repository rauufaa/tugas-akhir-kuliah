import authRoutes from "./fastify/auth";
// import netflixRoutes from "./fastify/netflix";
import reservationsRoutes from "./fastify/reservations";
import sportsFieldsRoutes from "./fastify/sports-fields";


export default function routes(app) {
    // app.use("/api/v1/product", productRouter(express));
    // app.register(authRoutes, {prefix : "/api"})
    // app.register(reservationsRoutes, {prefix : "/api/sports-facilities"})
    app.register(sportsFieldsRoutes, {prefix : "/api/sports-fields"})
    // app.register(reservationsRoutes, {prefix : "/api/reservations"})
    // app.register(netflixRoutes, {prefix : "/api/users"})
}