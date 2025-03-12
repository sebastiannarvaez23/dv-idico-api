export const queryListAssignedProduct = `
    SELECT
        T0.id,
        T0.name,
        T0.image,
        T0.age,
        T0.history,
        T0.created_by,
        T0.updated_by,
        (CASE WHEN EXISTS (
            SELECT 1
            FROM public.products_characters T1
            WHERE T1.character_id = T0.id
            AND T1.product_id = :productId
        ) THEN true ELSE false END) AS assigned
    FROM public.characters T0
`;