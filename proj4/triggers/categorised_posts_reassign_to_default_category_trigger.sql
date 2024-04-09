-- Trigger: categorised_posts_reassign_to_default_category_trigger

-- DROP TRIGGER IF EXISTS categorised_posts_reassign_to_default_category_trigger ON public.categories;

CREATE OR REPLACE TRIGGER categorised_posts_reassign_to_default_category_trigger
    BEFORE DELETE
    ON public.categories
    FOR EACH ROW
    EXECUTE FUNCTION public.reassign_to_default_category_if_post_has_one_category();