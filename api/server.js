import express, { json } from "express";

const app = express();
const PORT = 3000;

import cors from "cors";
app.use(cors());
//app.use(cors({
//    origin: ['https://amelieroussin.ca', 'https://www.amelieroussin.ca']
//}));

app.use(json());

import negotiate from './middlewares/negotiate.js';
app.use(negotiate);

import usersRoute from './routers/usersRoutes.js';
app.use('/users', /*validateToken,*/ usersRoute);

import wallpapersRoute from './routers/wallpapersRoutes.js'
app.use('/wallpapers', wallpapersRoute) 

import commentRoute from './routers/commentRoutes.js';
app.use('/comment', commentRoute);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});