import {Schema, model} from 'mongoose';
//const Schema = mongoose.Schema;
//const 
//const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    nombre: {type: String},
    apellido: {type: String},
    email: {type: String},
    pass: {type: String},
});


module.exports = model("User",UserSchema);