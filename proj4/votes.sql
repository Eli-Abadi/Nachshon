-- Table: public.votes

-- DROP TABLE IF EXISTS public.votes;

CREATE TABLE IF NOT EXISTS public.votes
(
    "vote_ID" smallint NOT NULL DEFAULT nextval('"votes_voteID_seq"'::regclass),
    vote_type boolean,
    "post_ID" integer NOT NULL,
    "user_ID" integer NOT NULL,
    CONSTRAINT votes_pkey PRIMARY KEY ("vote_ID"),
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

ALTER TABLE IF EXISTS public.votes
    OWNER to postgres;