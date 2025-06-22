import { fetchDetailsByWallpaper } from '../models/wallpaperModel.js';

const UNKNOWN_ERROR = {
        message: "Unknown error",
        errorCode: 9999
};

export async function getWallpaperDetails(req, res) {
    let result = UNKNOWN_ERROR;
    
    try {
        const response = await fetch('https://wallhaven.cc/api/v1/w/d6y12l');
        // const posts = await fetchDetailsByWallpaper();
        const data = await response.json();
        res.json(data);
        // result = {
        //     message: 'Success',
        //     errorCode: 0,
        // };
    } catch (error) {
        console.error('Error fetching posts:', error);
        result.message = `Database error ${error}`;
        result.errorCode = 1001;
        res.status(500);
    }

    // res.formatView(result);
};
