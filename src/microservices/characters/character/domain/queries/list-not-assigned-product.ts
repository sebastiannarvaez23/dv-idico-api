export const queryListNotAssignedProduct = `
    SELECT
        T0.id, T0.name, T0.image, T0.age, T0.history, T0.created_by, T0.updated_by
    FROM public.characters T0
        LEFT JOIN public.products_characters T1 ON T0.id = T1.character_id
        LEFT JOIN public.products T2 ON T1.product_id = T2.id
    WHERE T0.deleted_at IS NULL
        AND (T1.product_id != :productId OR T1.character_id IS NULL)
`;