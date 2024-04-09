-- Table: public.comments

-- DROP TABLE IF EXISTS public.comments;

CREATE TABLE IF NOT EXISTS public.comments
(
    "comment_ID" integer NOT NULL DEFAULT nextval('"comments_commentID_seq"'::regclass),
    "post_ID" integer NOT NULL,
    "parent_comment_ID" integer,
    "user_ID" integer NOT NULL,
    content text COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    last_updated timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT comments_pkey PRIMARY KEY ("comment_ID"),
    CONSTRAINT "parent_comment_ID" FOREIGN KEY ("parent_comment_ID")
        REFERENCES public.comments ("comment_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT "post_ID" FOREIGN KEY ("post_ID")
        REFERENCES public.posts ("post_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT "user_ID" FOREIGN KEY ("user_ID")
        REFERENCES public.users ("user_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.comments
    OWNER to postgres;
-- Index: fki_parentCommentID

-- DROP INDEX IF EXISTS public."fki_parentCommentID";

CREATE INDEX IF NOT EXISTS "fki_parentCommentID"
    ON public.comments USING btree
    ("parent_comment_ID" ASC NULLS LAST)
    TABLESPACE pg_default;