export const queryListAssignedRole = `
    SELECT
        T0.id,
        T0.name,
        T0.created_by,
        T0.updated_by,
        (CASE WHEN EXISTS (
            SELECT 1
            FROM public.roles_services T1
            WHERE T1.service_id = T0.id
            AND T1.role_id = :roleId
        ) THEN true ELSE false END) AS assigned
    FROM public.services T0
    WHERE T0.deleted_at IS NULL
`;