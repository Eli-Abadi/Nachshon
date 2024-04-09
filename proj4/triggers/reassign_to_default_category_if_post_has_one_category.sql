-- FUNCTION: public.reassign_to_default_category_if_post_has_one_category()

-- DROP FUNCTION IF EXISTS public.reassign_to_default_category_if_post_has_one_category();

CREATE OR REPLACE FUNCTION public.reassign_to_default_category_if_post_has_one_category()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF
AS $BODY$
DECLARE
    default_category_id INTEGER;
    post_category_count INTEGER;

BEGIN
	-- Determine the default category's ID
	SELECT "category_ID"
	INTO default_category_id 
	FROM public.categories 
	WHERE "category_name" = 'General';

	-- Check how many categories the post being affected has
	SELECT COUNT(*) 
	INTO post_category_count 
	FROM public."categorised_posts" 
	WHERE "post_ID" = OLD."post_ID";

	-- If this is the only category, reassign it to the default category
	IF post_category_count = 1 THEN
		INSERT INTO public."categorised_posts" ("post_ID", "category_ID") 
			VALUES (OLD."post_ID", default_category_id);
	END IF;

	-- Proceed with the deletion
	RETURN OLD;
END;
$BODY$;

ALTER FUNCTION public.reassign_to_default_category_if_post_has_one_category()
    OWNER TO postgres;
