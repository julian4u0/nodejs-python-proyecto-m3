import express from 'express';
import controller from '../Controllers/ProjectController'

const router = express.Router();

router.put('/addproperty', controller.addproperty);//addhouse'
router.post('/finduser', controller.finduser);//finduser'
router.put('/adduser', controller.adduser);//adduser'
router.post('/editproperty', controller.editproperty);//edithouse'
router.post('/getmyproperties', controller.getmyproperties);//listmyhouses'
router.get('/getproperties', controller.getproperties);//listall'
router.delete('/deleteproperty', controller.deleteproperty);//deletehouse'
router.get('/getproperty', controller.getproperty);//findone'
//router.get('/data', controller.data);listmyhouses











module.exports = router;