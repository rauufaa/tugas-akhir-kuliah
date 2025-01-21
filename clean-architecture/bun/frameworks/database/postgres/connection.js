export default function connection(postgres, config, options) {
    function connectToPostgres() {
        const { Pool } = postgres
    }

    function connectToPostgresPool() {
        const { Pool } = postgres

        return new Pool({
            host: "127.0.0.1",
            user: "wsl-ubuntu",
            password: "bbkracing",
            database: "project_akhir",
            max: 120,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        })
    }
}