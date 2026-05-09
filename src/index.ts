import  express  from "express";
import  dotenv  from "dotenv";
import {setupApp} from "./setupApp";
dotenv.config();


const app = express();
setupApp(app);


const PORT = process.env.PORT || 5001


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
