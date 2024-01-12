import mongoose from "mongoose";
import config from "config";

async function connect(){
    const dbURI = config.get<string>("dbURI");

    try {
        await mongoose.connect(dbURI);
    } catch (error) {
        console.error ("no bueno");
        process.exit(1);
    }
}

export default connect;