import express from 'express';
import controller from '../Controllers/ProjectController'

const router = express.Router();

router.post('/addhouse', controller.addhouse);//!
router.post('/finduser', controller.finduser);//!
router.post('/adduser', controller.adduser);//!
router.post('/edithouse', controller.edithouse);//!
router.post('/listmyhouses', controller.listmyhouses);//!
router.post('/listall', controller.listall);//!
router.post('/deletehouse', controller.deletehouse);//!
router.post('/findone', controller.findone);//!
//router.get('/data', controller.data);listmyhouses

module.exports = router;