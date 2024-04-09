-- Table: public.categorised_posts

-- DROP TABLE IF EXISTS public.categorised_posts;

CREATE TABLE IF NOT EXISTS public.categorised_posts
(
    "post_ID" integer NOT NULL,
    "category_ID" integer NOT NULL,
    CONSTRAINT categorised_posts_pkey PRIMARY KEY ("post_ID", "category_ID"),
    CONSTRAINT "caegory_ID" FOREIGN KEY ("category_ID")
        REFERENCES public.categories ("category_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "post_ID" FOREIGN KEY ("post_ID")
        REFERENCES public.posts ("post_ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.categorised_posts
    OWNER to postgres;