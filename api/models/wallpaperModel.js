import pool from "../db/pool.js";

export async function fetchDetailsByWallpaper() {
  return 'fetchDetailsByWallpaper niy'
  const selectSql = `SELECT "id", "authorId", "created", "published", "title", "excert"
                            FROM posts 
                            ORDER BY created DESC`;
  const queryResult = await pool.query(selectSql);
  return queryResult.rows;
};