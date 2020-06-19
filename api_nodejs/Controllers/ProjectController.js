
import House from '../Models/HouseModel';
import User from '../Models/ProjectModel';

var mongoose = require('mongoose');

let controller = {
    adduser: async (req, res) =>{
        const {nombre, apellido, email, pass} = req.body;
        if(nombre== null || apellido==null || email== null || pass==null){


            let success = false;
            let data = [];
            let error = { title : "not all data sent", message: "please send all the fields"};
            return res.status(200).json( {res : build(success, data, error)});
        }
        const newUser = new User({nombre, apellido, email, pass});
        await newUser.save();
        let success = true;
        let data = [];
        let error = { title : null, message: null};
        return res.status(200).json( {res : build(success, data, error)});
    },
    addhouse: async (req,res) =>{
        const {title, type , address, rooms ,price, area, ownerid} = req.body;
        if(title== null || type==null || address== null || rooms==null|| price==null || area== null || ownerid== null ){


            let success = false;
            let data = [];
            let error = { title : "not all data sent", message: "please send all the fields"};
            return res.status(200).json( {res : build(success, data, error)});
        }
        const newHouse = new House({title, type , address, rooms ,price, area, ownerid});
        await newHouse.save();        
        let success = true;
        let data = [];
        let error = { title : null, message: null};
        return res.status(200).json( {res : build(success, data, error)});
    },
    finduser: async (req,res) =>{
        const {email, pass} = req.body;
        
       // console.log("email : "  + email);
        var query = { email: email };
        const user = await User.find(query);
        if(user.length == 0 ){
            console.log("No existe");

            let success = false;
            let data = [];
            let error = { title : "not existing", message: "not existing user"};
            return res.status(200).json( {res : build(success, data, error)});

        }
        else{
            if(pass != user[0].pass){
                let success = false;
                let data = [];
                let error = { title : "wrong pass", message: "wrong password"};
                return res.status(200).json( {res : build(success, data, error)});

            }
            else{
                let success = true;
                let data = user[0]._id;
                let error = { title : null, message: null};
                return res.status(200).json( {res : build(success, data, error)});
            }
        }
    },
    edithouse: async (req,res) =>{
        const {houseid, title, type , address, rooms ,price, area, ownerid} = req.body;
        if(houseid &&  title &&  type &&   address &&   rooms &&  price && area &&  ownerid){

            
            await House.findByIdAndUpdate(mongoose.Types.ObjectId(houseid),  {houseid, title, type , address, rooms ,price, area, ownerid} );
       
            console.log("updaated"); }
        else{

            console.log("no all data sent");
        }

        let success = true;
        let data = [];
        let error = { title : null, message: null};
        return res.status(200).json( {res : build(success, data, error)});
    },
    listmyhouses: async (req,res) =>{
        const {ownerid } = req.body;
        var query = { ownerid: ownerid };
        const houses = await House.find(query);
        
        let success = true;
        let data = houses;
        let error = { title : null, message: null};
        return res.status(200).json( {res : build(success, data, error)});
        
    },
    listall: async (req,res) =>{
        const allhouses = await House.find({});
        
        let success = true;
        let mydata = allhouses;
        let error = { title : null, message: null};
        return res.status(200).json( {res : build(success, mydata, error)});
        
    },
    deletehouse: async (req,res) =>{
        const {houseid} = req.body;
        await House.findByIdAndDelete(mongoose.Types.ObjectId(houseid));        
        let success = true;
        let data = [];
        let error = { title : null, message: null};
        return res.status(200).json( {res : build(success, data, error)});
    },
}

function build(success, data, error){
    const buildedjson = {
        success : success,
        data: data,
        error: error
    };
    return buildedjson;

}

module.exports = controller;