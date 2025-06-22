import {
    fetchAllCommentsByWallpaper,
    fetchAllCommentsByUser,
    fetchNextComments,
    insertCommentByWallpaper
} from '../models/commentModel.js';

const UNKNOWN_ERROR = {
        message: "Unknown error",
        errorCode: 9999
};

export async function getAllCommentsByWallpaper(req, res) {
    let result = UNKNOWN_ERROR;
    
    try {
        const posts = await fetchAllCommentsByWallpaper();
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

export async function getAllCommentsByUser(req, res) {
    let result = UNKNOWN_ERROR;
    
    try {
        const posts = await fetchAllCommentsByUser();
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

export async function getNextComments(req, res) {
    let result = UNKNOWN_ERROR;
    const { ids, nbRequested } = req.body;
    console.log('!!! in getNextPosts', ids, nbRequested);
    try {
        const posts = await fetchNextComments(ids, nbRequested);
        result = {
            message: 'Success',
            errorCode: 0,
            posts: posts
        }
    } catch (error) {
        console.error('DB error', error);
        result.message = `Database error ${error}`;
        result.errorCode = 1021;
        res.status(500);
    }

    res.formatView(result);
};

export async function createComment(req, res) {
    let result = UNKNOWN_ERROR;
    const data = req.body;
    console.log(data);

    try {
        const createdPost = await insertCommentByWallpaper(data);

        result = {
            message: 'Success',
            errorCode: 0,
            post: createdPost
        }
    } catch (error) {
        console.error('Error inserting post:', error);

        res.status(500);
        result.message = `Error inserting post`;
        result.errorCode = 1002;
    }

    res.formatView(result);
};

