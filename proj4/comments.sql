-- Table: public.comments

-- DROP TABLE IF EXISTS public.comments;

CREATE TABLE IF NOT EXISTS public.comments
(
    "commentID" integer NOT NULL DEFAULT nextval('"comments_commentID_seq"'::regclass),
    "postID" integer NOT NULL,
    "parentCommentID" integer,
    "userID" integer NOT NULL,
    content text COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT comments_pkey PRIMARY KEY ("commentID"),
    CONSTRAINT "parentCommentID" FOREIGN KEY ("parentCommentID")
        REFERENCES public.comments ("commentID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT "postID" FOREIGN KEY ("postID")
        REFERENCES public.posts ("postID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT "userID" FOREIGN KEY ("userID")
        REFERENCES public."user" ("userID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.comments
    OWNER to postgres;
-- Index: fki_parentCommentID

-- DROP INDEX IF EXISTS public."fki_parentCommentID";

CREATE INDEX IF NOT EXISTS "fki_parentCommentID"
    ON public.comments USING btree
    ("parentCommentID" ASC NULLS LAST)
    TABLESPACE pg_default;