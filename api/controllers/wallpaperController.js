import { fetchDetailsByWallpaper } from '../models/wallpaperModel.js';

const UNKNOWN_ERROR = {
        message: "Unknown error",
        errorCode: 9999
};

export async function getWallpaperDetails(req, res) {
    let result = UNKNOWN_ERROR;
    
    try {
        const posts = await fetchDetailsByWallpaper();
        result = {
            message: 'Success',
            errorCode: 0,
            rows: posts
        };
    } catch (error) {
        console.error('Error fetching posts:', error);
        result.message = `Database error ${error}`;
        result.errorCode = 1001;
        res.status(500);
    }

    res.formatView(result);
};
