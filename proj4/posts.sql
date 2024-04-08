-- Table: public.posts

-- DROP TABLE IF EXISTS public.posts;

CREATE TABLE IF NOT EXISTS public.posts
(
    "postID" integer NOT NULL DEFAULT nextval('"posts_postID_seq"'::regclass),
    "userID" integer NOT NULL,
    content text COLLATE pg_catalog."default" NOT NULL,
    title text COLLATE pg_catalog."default",
    "creationDate" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdateDate" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT posts_pkey PRIMARY KEY ("postID"),
    CONSTRAINT "userID" FOREIGN KEY ("userID")
        REFERENCES public."user" ("userID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.posts
    OWNER to postgres;