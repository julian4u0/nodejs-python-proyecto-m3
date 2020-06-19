import express from 'express';
import router from './Routes/ProjectRoutes';

let app = express();
// middlewards
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api',router);
module.exports = app;
