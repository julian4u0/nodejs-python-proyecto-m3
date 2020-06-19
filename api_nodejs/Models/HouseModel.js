import {Schema, model} from 'mongoose';
//const Schema = mongoose.Schema;
//const 
//const {Schema, model} = require('mongoose');


const HouseSchema = new Schema({
    title: {type: String},
    type: {type: String},
    address: {type: String},
    rooms: {type: Number},
    price: {type: Number},
    area: {type: Number},
    ownerid: {type: String},
});

module.exports = model("House",HouseSchema);