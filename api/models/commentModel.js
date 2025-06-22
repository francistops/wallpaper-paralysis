import pool from "../db/pool.js";

function hasAffectedOne(id, action, queryResult) {
  const withId = id !== null ? ` for id ${id}` : "";

  if (queryResult.rowCount > 1) {
    throw new Error(`Too many posts ${action}${withId}.`);
  } else if (queryResult.rowCount == 0) {
    throw new Error(`Post id ${id} not ${action}`);
  }
}

export async function fetchAllCommentsByWallpaper() {
  return 'fetchCommentByWallpaper niy'
  const selectSql = `SELECT "id", "authorId", "created", "published", "title", "excert"
                            FROM posts 
                            ORDER BY created DESC`;
  const queryResult = await pool.query(selectSql);
  return queryResult.rows;
};

export async function fetchAllCommentsByUser(id) {
  return 'fetchAllCommentsByUser niy'
  const selectSql = `SELECT "authorId", "created", "published", "title", "excert", "content"
                            FROM posts 
                            WHERE id = $1`;
  const parameters = [id];
  const queryResult = await pool.query(selectSql, parameters);

  if (queryResult.rowCount > 1) {
    throw new Error(`Too many posts retrieve for id ${id}.`);
  }

  return queryResult.rows[0];
};

export async function fetchNextComments(ids, nbRequested) {
  return "fetchNextComments niy"
    console.log("in fetchNextPosts", ids, nbRequested);

    let selectSQL = `
        SELECT "posts"."id" AS "postId",
               "posts"."title",
               "posts"."published",
               "posts"."content",
               "users"."userUuid" AS "userId",
               "users"."email",
               "users"."firstName",
               "users"."lastName"
        FROM "posts"
        INNER JOIN "users" ON "posts"."authorId" = "users"."userUuid"
        WHERE "posts"."published" IS NOT NULL
    `;

    if (ids.length > 0) {
        selectSQL += `
            AND "posts"."id" NOT IN (${ids.map((item, index) => `$${index + 1}`).join(", ")})
        `;
    }

  selectSQL += `
        ORDER BY "posts"."published" DESC
        LIMIT $${ids.length + 1}
    `;

  const { rows } = await pool.query(selectSQL, [...ids, nbRequested]);

  return rows.map((item, index) => {
    return {
      id: item.postId,
      title: item.title,
      published: item.published,
      content: item.content,
      author: {
        id: item.userId,
        email: item.email,
        firstName: item.firstName,
        lastName: item.lastName,
      },
    };
  });
};

export async function insertCommentByWallpaper(comment) {
  return 'insertCommentByWallpaper niy'
  const insertSql = `INSERT INTO "posts" ("authorId", "title", "excert", "content") 
                            VALUES ($1, $2, $3, $4)
                            RETURNING *;`;
  const parameters = [post.authorId, post.title, post.excert, post.content];
  const queryResult = await pool.query(insertSql, parameters);

  hasAffectedOne(null, "inserted", queryResult);
  
  // TODO below publish call is only for debug
  this.publish(queryResult.rows[0].id)
  
  return queryResult.rows[0];
};
