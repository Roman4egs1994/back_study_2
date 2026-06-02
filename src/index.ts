import express from "express";
import dotenv from "dotenv";
import 'dotenv/config'
import {setupApp} from "./setupApp";
import {SETTINGS} from "./core/settings/settings";
import {runDB} from "./db/mongo.db";
dotenv.config();


const app = express();

let dbReady: Promise<void> | null = null;
const ensureDb = (): Promise<void> => {
    if (!dbReady) {
        dbReady = runDB(SETTINGS.MONGO_URL);
    }
    return dbReady;
};

app.use(async (_req, _res, next) => {
    try {
        await ensureDb();
        next();
    } catch (e) {
        next(e);
    }
});

setupApp(app);

if (!process.env.VERCEL) {
    ensureDb()
        .then(() => {
            app.listen(SETTINGS.PORT, () => {
                console.log(`Server is running on port ${SETTINGS.PORT}`);
            });
        })
        .catch((err) => {
            console.error('Failed to start server:', err);
        });
}

export default app;



// === Старый bootstrap (закомментирован, можно вернуть) ===
// const bootstrap = async () => {
//     const app = express();
//     setupApp(app);
//     const PORT = SETTINGS.PORT
//
//     await runDB(SETTINGS.MONGO_URL);
//
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
//  return app
// }
//
// bootstrap().then(()=> console.log('Server is ready'))
