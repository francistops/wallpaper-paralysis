CREATE EXTENSION "pgcrypto";
CREATE EXTENSION "uuid-ossp";

CREATE DATABASE wallparadb;

-- USE andre;
\c wallparadb;


-- ! find a way to salt with a var
-- DECLARE "SALT" CONSTANT CHAR NOT NULL DEFAULT 'monGrainDeCummin';

-- ! find a way to store liked wallpaper in user profile

CREATE TABLE "users" (
    "id" uuid DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "passhash" CHAR(64) NOT NULL,
    "role" CHAR(1) NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "tokens" (
    "token" uuid DEFAULT gen_random_uuid(),
    "expires" TIMESTAMP DEFAULT (Now() + INTERVAL '30 days'),
    "userid" uuid NOT NULL REFERENCES "users"("id"),
    PRIMARY KEY ("token")
);
CREATE TABLE "comments" (
    "id" uuid DEFAULT gen_random_uuid(),
    "content" TEXT NOT NULL,
    "created" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "userid" uuid NOT NULL REFERENCES "users"("id"),
    PRIMARY KEY ("id")
);

CREATE TABLE "wallpapers" (
    "id" uuid DEFAULT gen_random_uuid(),
    "foreignId" VARCHAR(255) NOT NULL,
    "commentid" uuid NOT NULL REFERENCES "comments"("id"),
    PRIMARY KEY ("id")
);



CREATE UNIQUE INDEX uidx_users_email ON "users"("email");

INSERT INTO "users" ("email", "passhash") VALUES
('f', 'f'),
('fh', ENCODE (SHA256('fh'), 'hex')),
('u', 'u'),
('uh', ENCODE (SHA256('uh'), 'hex')),
('a', 'a'),
('ah', ENCODE (SHA256('ah'), 'hex'));

INSERT INTO "comments" ("userid", "content") VALUES
( (SELECT "id" FROM "users" WHERE "email" = 'f'), 'photo from my hike of mount thamaire yesterday. first comment'),
( (SELECT "id" FROM "users" WHERE "email" = 'u'), 'look at those mountains! second post'),
( (SELECT "id" FROM "users" WHERE "email" = 'ah'), 'please behave third post');