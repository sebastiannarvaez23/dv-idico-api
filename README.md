# API para Explorar el Universo Disney

Esta es una aplicación desarrollada para explorar el universo de Disney, permitiendo conocer y modificar los personajes, así como comprender las películas en las que participaron. La API expone la información de manera que cualquier frontend pueda consumirla de manera sencilla.

## Modelado de base de datos

![MODELO ENT-REL DB  DISNEY CHARACTERS](https://github.com/sebastiannarvaez23/dv-idico-web/assets/88569352/b41d995a-84b7-41e1-9df0-5ed26e74f1e6)

## Tecnologías Utilizadas

- **NodeJs**: Para el desarrollo del backend.
- **ExpressJs**: Para la creación de la API RESTful.
- **Base de datos MySQL**: Almacenamiento de datos.
- **React con @mui React Text Field component - Material UI**: Para la construcción del frontend.
- **Patrón REST para rutas**: Para la estructuración de las rutas de la API.
- **Librería Sequelize**: Para el mapeo objeto-relacional y la interacción con la base de datos.

## Entrega del Código

El código ha sido publicado en GitHub. Se han realizado commits regulares y se ha hecho uso de ramas para una gestión eficiente del código.

## Tareas y Estimación

Se han segregado las tareas de los requerimientos y se ha propuesto una estimación para las mismas. A continuación se detallan:

| No | Sprint | Entorno | Descripción                                                               | Tiempo | Unidad  | Rama dependiente           | Nombre de la rama   | Complejidad | Comentarios                                                                                                                   |
|----|--------|---------|---------------------------------------------------------------------------|--------|---------|-----------------------------|---------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------|
| 1  | 1      | Backend | Estructura base del código fuente                                        | 20     | Minutos | NA                          | feature/sprint1#DEV0001 | Baja        | Organización de archivos bajo una arquitectura MVC en Express basada en TypeScript.                                          |
| 2  | 1      | Backend | Configuración del servidor, controladores, y rutas                       | 30     | Minutos | feature/sprint1#DEV0001     | feature/sprint1#DEV0002 | Baja        | NA                                                                                                                            |
| 3  | 1      | Backend | Configuración de los middlewares                                          | 5      | Minutos | feature/sprint1#DEV0002     | feature/sprint1#DEV0003 | Baja        | NA                                                                                                                            |
| 4  | 1      | Backend | Configuración del Sequelize y creación de los modelos principales         | 30     | Minutos | feature/sprint1#DEV0003     | feature/sprint1#DEV0004 | Media       | NA                                                                                                                            |
| 5  | 1      | Backend | Implementación de los metodos CRUD de los modelos principales             | 40     | Minutos | feature/sprint1#DEV0004     | feature/sprint1#DEV0005 | Media       | NA                                                                                                                            |
| 6  | 1      | Backend | Implementación del delete soft por medio del paranoid                     | 20     | Minutos | feature/sprint1#DEV0005     | feature/sprint1#DEV0006 | Baja        | NA                                                                                                                            |
| 7  | 1      | Backend | Ajuste al requerimiento del listado de personajes, solo se muestran los atributos requeridos | 10     | Minutos | feature/sprint1#DEV0006     | feature/sprint1#DEV0007 | Baja        | NA                                                                                                                            |
| 8  | 1      | Backend | Ajuste a los filtros requeridos para la busqueda de personas             | 30     | Minutos | NA                          | feature/sprint1#DEV0007 | Alta        | NA                                                                                                                            |
| 9  | 1      | Backend | Ajuste a los filtros requeridos para la busqueda de series o películas   | 20     | Minutos | feature/sprint1#DEV0007     | feature/sprint1#DEV0008 | Media       | NA                                                                                                                            |
| 10 | 1      | Backend | Configuración de archivos estaticos para servir las imágenes             | 40     | Minutos | feature/sprint1#DEV0008     | feature/sprint1#DEV0009 | Media       | NA                                                                                                                            |
| 11 | 1      | Backend | Implementación de los metodos CRUD gender                                 | 30     | Minutos | feature/sprint1#DEV0009     | feature/sprint1#DEV00010| Baja        | NA                                                                                                                            |
| 12 | 1      | Backend | Configuración de la carga y almacenamiento de imágenes                   | 20     | Minutos | feature/sprint1#DEV00010    | feature/sprint1#DEV00011| Media       | NA                                                                                                                            |
| 13 | 1      | Backend | Creación de los modelos y controladores para registro y autenticación de usuarios | 1  | hora    | feature/sprint1#DEV00011    | feature/sprint1#DEV00012| Alta        | NA                                                                                                                            |

## Consideraciones Técnicas

Se han tenido en cuenta varias consideraciones técnicas para el desarrollo eficiente de la aplicación:

- Uso de Sequelize para el modelado de la base de datos y la realización de operaciones CRUD.
- Implementación de autenticación de usuarios para ciertos endpoints.
- Uso de componentes visuales atractivos y filtros dinámicos en el frontend para mejorar la experiencia del usuario.
- Organización y estructuración del código siguiendo buenas prácticas y patrones de diseño.

## Observaciones y Recomendaciones

- Es importante considerar la escalabilidad de la aplicación para futuras expansiones del universo Disney en las cuales se tengan en cuenta test unitarios, documentación con swagger, e incluir un sistema de administración de roles de usuario.

## Búsqueda Multifactor y Interfaz de Usuario

Se ha implementado una búsqueda multifactor que permite a los usuarios buscar personajes por diferentes criterios, así como películas o series y géneros. La interfaz de usuario presenta componentes visuales atractivos y filtros dinámicos para mejorar la experiencia del usuario.
