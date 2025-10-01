import mongoose from "mongoose";

async function conectaNoDB() {    
    mongoose.connect("mongodb://user:teste123@localhost:27017/");

    return mongoose.connection;
}

export default conectaNoDB;