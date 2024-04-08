-- Table: public.votes

-- DROP TABLE IF EXISTS public.votes;

CREATE TABLE IF NOT EXISTS public.votes
(
    "voteID" smallint NOT NULL DEFAULT nextval('"votes_voteID_seq"'::regclass),
    "voteType" boolean,
    "postID" integer NOT NULL,
    "userID" integer NOT NULL,
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

ALTER TABLE IF EXISTS public.votes
    OWNER to postgres;