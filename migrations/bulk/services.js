module.exports.bulkInsertServices = async (queryInterface) => {
    return await queryInterface.bulkInsert('services', [
        {
            id: '4f851d66-0d95-4de9-b1f7-ec6fdfa2fdf6',
            code: '0201',
            name: 'Listar personas',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '0f0edb81-1855-4f49-845c-a35ddaf4204f',
            code: '0202',
            name: 'Obtener persona',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 'f06220a3-f854-4762-add8-ab4927919f82',
            code: '0203',
            name: 'Creación de persona',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '62832b04-98bd-4b73-94e9-3008caaa2e3a',
            code: '0204',
            name: 'Edición de persona',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '992920ac-fcbd-47ea-8a49-60dffc655a3c',
            code: '0205',
            name: 'Eliminación de persona',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 'a5fd20f3-bcee-4f0e-91d6-7b11cbb8c249',
            code: '0206',
            name: 'Obtener persona por nickname',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 'e4031627-c90d-4ca0-9ec9-dacd5037fab0',
            code: '0207',
            name: 'Obtener persona por email',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 'e529088b-c564-4c2c-86b1-f10c827d60c6',
            code: '0301',
            name: 'Listar roles',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '5d6719dc-e1f8-47ab-89c5-8e85df90fff9',
            code: '0302',
            name: 'Obtener rol',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '19c363ce-2e6c-46f1-ba2f-a60d3b88cd35',
            code: '0303',
            name: 'Creación de rol',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '7d8366d5-ade4-4bfe-8fd3-e14068710ab4',
            code: '0304',
            name: 'Edición de rol',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '4c48b143-e3e0-4352-b359-199f90f89baf',
            code: '0305',
            name: 'Eliminación de rol',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '0a212b8f-bd48-4395-b671-fe9012f0932f',
            code: '0401',
            name: 'Listar servicios',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '7d9afd08-1648-4f4b-a52a-c18d8d0b81ae',
            code: '0402',
            name: 'Obtener servicio',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 'f8424ed4-dbc3-4165-8ba2-4bfdbd074c71',
            code: '0403',
            name: 'Creación de servicio',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 'c8726e82-306b-4893-a8b7-a35278dc7be9',
            code: '0404',
            name: 'Edición de servicio',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: 'd66f0a1d-dbd7-4cbf-85ec-52239a2c77d0',
            code: '0405',
            name: 'Eliminación de servicio',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '000cb939-cfef-4d95-a557-1574e7701da6',
            code: '0306',
            name: 'Crear asignación de servicio',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '14b98ca6-9326-43b1-bf3d-c9995d64fa54',
            code: '0307',
            name: 'Eliminar asignación de servicio',
            created_by: 'b04dd987-27ae-4368-a15b-97ee6feee7d2',
            updated_by: null,
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);
}