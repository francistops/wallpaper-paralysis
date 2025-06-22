import { } from '../models/postModel.js';
const UNKNOWN_ERROR = {
        message: "Unknown error",
        errorCode: 9999
};

export async function getAllCommentByWallpaper(req, res) {
    let result = UNKNOWN_ERROR;
    
    try {
        const posts = await fetchAllCommentByWallpaper();
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
}

export async function getAllCommentByUser(req, res) {
    let result = UNKNOWN_ERROR;
    
    try {
        const posts = await fetchAllPost();
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
}

export async function getPostById(req, res) {
    let result = UNKNOWN_ERROR;
    const { id } = req.params;

    try {
        const post = await fetchById(id);

        result = {
            message: 'Success',
            errorCode: 0,
            post: post
        }
    } catch (error) {
        console.error('Error fetching post by ID:', error);

        res.status(500);
        result.message = `Error fetching post with id ${id}`;
        result.errorCode = 1002;
    }

    res.formatView(result);
}

export async function getNextPosts(req, res) {
    let result = UNKNOWN_ERROR;
    const { ids, nbRequested } = req.body;
    console.log('!!! in getNextPosts', ids, nbRequested);
    try {
        const posts = await fetchNextPosts(ids, nbRequested);
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
}

export async function createPost(req, res) {
    let result = UNKNOWN_ERROR;
    const data = req.body;
    console.log(data);

    try {
        const createdPost = await insert(data);

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
}

export async function updatePost(req, res) {
    let result = UNKNOWN_ERROR;
    const { id } = req.params;
    const data = req.body;

    try {
        const updatedPost = await update(id, data.post);

        result = {
            message: 'Success',
            errorCode: 0,
            post: updatedPost
        }
    } catch (error) {
        console.error('Error inserting post:', error);

        res.status(500);
        result.message = `Error inserting post with id ${id}`;
        result.errorCode = 1002;
    }

    res.formatView(result);
}

export async function publishPost(req, res) {
    let result = UNKNOWN_ERROR;
    const { id } = req.params;

    try {
        const publishedPost = await publish(id);

        result = {
            message: 'Success',
            errorCode: 0,
            post: publishedPost
        }
    } catch (error) {
        console.error('Error publishing post:', error);

        res.status(500);
        result.message = `Error inserting post with id ${id}`;
        result.errorCode = 1002;
    }

    res.formatView(result);
}

export async function deletePost(req, res) {
    let result = UNKNOWN_ERROR;
    const { id } = req.params;

    try {
        const deletedCount = await delete(id);

        result = {
            message: 'Success',
            errorCode: 0,
            deletedPostCount: deletedCount
        }
    } catch (error) {
        console.error('Error deleting post:', error);

        res.status(500);
        result.message = `Error inserting post with id ${id}`;
        result.errorCode = 1002;
    }

    res.formatView(result);
}

