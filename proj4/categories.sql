-- Table: public.categories

-- DROP TABLE IF EXISTS public.categories;

CREATE TABLE IF NOT EXISTS public.categories
(
    "categoryID" integer NOT NULL DEFAULT nextval('"categories_categoryID_seq"'::regclass),
    "categoryName" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT categories_pkey PRIMARY KEY ("categoryID"),
    CONSTRAINT "categoryName" UNIQUE ("categoryName")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.categories
    OWNER to postgres;