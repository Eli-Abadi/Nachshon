-- Table: public.posts

-- DROP TABLE IF EXISTS public.posts;

CREATE TABLE IF NOT EXISTS public.posts
(
    "post_ID" integer NOT NULL DEFAULT nextval('"posts_postID_seq"'::regclass),
    "user_ID" integer NOT NULL,
    content text COLLATE pg_catalog."default" NOT NULL,
    title text COLLATE pg_catalog."default" NOT NULL,
    creation_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_update_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT posts_pkey PRIMARY KEY ("post_ID"),
    CONSTRAINT "user_ID" FOREIGN KEY ("user_ID")
        REFERENCES public.users ("user_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.posts
    OWNER to postgres;