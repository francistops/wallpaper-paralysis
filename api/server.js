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

import userRoute from './routers/userRoutes.js';
app.use('/user', /*validateToken,*/ userRoute);

import wallpaperRoute from './routers/wallpaperRoutes.js'
app.use('/wallpaper', wallpaperRoute) 

import commentRoute from './routers/commentRoutes.js';
app.use('/comment', commentRoute);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});