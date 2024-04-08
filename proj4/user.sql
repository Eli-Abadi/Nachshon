-- Table: public.user

-- DROP TABLE IF EXISTS public."user";

CREATE TABLE IF NOT EXISTS public."user"
(
    "userName" "char"[] NOT NULL,
    "userID" bigint NOT NULL DEFAULT nextval('"user_userID_seq"'::regclass),
    CONSTRAINT "userID" PRIMARY KEY ("userID")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."user"
    OWNER to postgres;