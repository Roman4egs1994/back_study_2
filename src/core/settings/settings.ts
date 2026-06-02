

export const SETTINGS = {
    PORT: process.env.PORT || 5001,
    MONGO_URL: process.env.MONGO_URL || '', //docker container (для сдачи atlas url db )
    DB_NAME: process.env.DB_NAME || '',
    DB_USER: '',
    DB_PASSWORD: '',
    DB_HOST: '',
    DB_PORT: '',
}
console.log("Current Mongo URI:", process.env.MONGO_URL);