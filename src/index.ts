import  express  from "express";
import  dotenv  from "dotenv";
import 'dotenv/config'
import {setupApp} from "./setupApp";
import {SETTINGS} from "./core/settings/settings";
import {runDB} from "./db/mongo.db";
dotenv.config();



const bootstrap = async () => {
    const app = express();
    setupApp(app);
    const PORT = SETTINGS.PORT

    await runDB(SETTINGS.MONGO_URL);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
 return app
}

bootstrap().then(()=> console.log('Server is ready'))





