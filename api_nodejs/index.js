import mongoose from 'mongoose';
import express from 'express';
import app from './app';
mongoose.Promise = global.Promise;


mongoose.connect("mongodb+srv://dbJulian:05n3YJ2fd5GXRSfG@cluster0-9hsez.gcp.mongodb.net/casabnb?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Conexión correcta");
    app.listen(3000, () => {
        console.log('Example app listening on server!');
    });

}).catch((error) => {
    console.log(error);
})
