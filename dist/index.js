"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("dotenv/config");
const setupApp_1 = require("./setupApp");
const settings_1 = require("./core/settings/settings");
const mongo_db_1 = require("./db/mongo.db");
dotenv_1.default.config();
const app = (0, express_1.default)();
let dbReady = null;
const ensureDb = () => {
    if (!dbReady) {
        dbReady = (0, mongo_db_1.runDB)(settings_1.SETTINGS.MONGO_URL);
    }
    return dbReady;
};
app.use((_req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ensureDb();
        next();
    }
    catch (e) {
        next(e);
    }
}));
(0, setupApp_1.setupApp)(app);
if (!process.env.VERCEL) {
    ensureDb()
        .then(() => {
        app.listen(settings_1.SETTINGS.PORT, () => {
            console.log(`Server is running on port ${settings_1.SETTINGS.PORT}`);
        });
    })
        .catch((err) => {
        console.error('Failed to start server:', err);
    });
}
exports.default = app;
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
