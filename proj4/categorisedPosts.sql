-- Table: public.categorisedPost

-- DROP TABLE IF EXISTS public."categorisedPost";

CREATE TABLE IF NOT EXISTS public."categorisedPost"
(
    "postID" integer NOT NULL,
    "categoryID" integer NOT NULL,
    CONSTRAINT "postIDCategoryID" PRIMARY KEY ("postID", "categoryID"),
    CONSTRAINT "categoryID" FOREIGN KEY ("categoryID")
        REFERENCES public.categories ("categoryID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT "postID" FOREIGN KEY ("postID")
        REFERENCES public.posts ("postID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."categorisedPost"
    OWNER to postgres;