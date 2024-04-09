-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    user_name character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    "user_ID" integer NOT NULL DEFAULT nextval('"users_user_ID_seq"'::regclass),
    CONSTRAINT users_pkey PRIMARY KEY ("user_ID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;