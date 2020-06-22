import express from 'express';
import controller from '../Controllers/ProjectController'

const router = express.Router();

router.put('/addhouse', controller.addhouse);//!
router.post('/finduser', controller.finduser);//!
router.put('/adduser', controller.adduser);//!
router.post('/edithouse', controller.edithouse);//!
router.post('/listmyhouses', controller.listmyhouses);//!
router.get('/listall', controller.listall);//!
router.delete('/deletehouse', controller.deletehouse);//!
router.get('/findone', controller.findone);//!
//router.get('/data', controller.data);listmyhouses

module.exports = router;