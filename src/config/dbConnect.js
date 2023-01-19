import mongoose from "mongoose"

mongoose.connect("mongodb+srv://alura:123@alura.iymivlc.mongodb.net/alura-node?retryWrites=true&w=majority");

let db = mongoose.connection;

export default db;