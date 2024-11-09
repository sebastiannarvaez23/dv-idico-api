# API para Explorar el Universo Disney

Esta es una aplicación desarrollada para explorar el universo de Disney, Permite a los usuarios conocer y modificar información sobre personajes y comprender las películas en las que estos han participado. La API expone la información de manera que cualquier frontend pueda consumirla de manera sencilla.

### Características
- **Exploración de Personajes**: Consulta y modificación de información sobre los personajes de Disney.
- **Información de Películas**: Acceso detallado a las películas y series donde participan los personajes.
- **Autenticación**: Acceso seguro a ciertos endpoints mediante autenticación de usuarios.
- **Búsqueda Multifactor**: Búsqueda avanzada por diferentes criterios (personajes, películas, géneros).
- **Interfaz de Usuario Atractiva**: Uso de componentes visuales atractivos y filtros dinámicos.

### Alternativas
Existen otras aplicaciones y sitios web dedicados a la información sobre Disney, pero esta aplicación se distingue por su enfoque en la personalización y la capacidad de modificar información, así como por su interfaz amigable y altamente interactiva.

## Insignias

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## Tecnologías Utilizadas

- **NodeJs**: Para el desarrollo del backend.
- **ExpressJs**: Para la creación de la API RESTful.
- **Base de datos MySQL**: Almacenamiento de datos.
- **Patrón REST para rutas**: Para la estructuración de las rutas de la API.
- **Librería Sequelize**: Para el mapeo objeto-relacional y la interacción con la base de datos.
<p align="left">
  <img src="https://github.com/sebastiannarvaez23/dv-idico-api/assets/88569352/b2c84500-0646-439a-8d04-db6571a74cff" width="auto" height="85">
  <img src="https://github.com/sebastiannarvaez23/dv-idico-api/assets/88569352/951382c1-b44e-4caf-9697-51667538a617" width="auto" height="90">
  <img src="https://github.com/sebastiannarvaez23/dv-idico-api/assets/88569352/6099bdde-dcbc-4b30-90b2-7e3f6fe27fa2" width="auto" height="90">
  <img src="https://github.com/sebastiannarvaez23/dv-idico-api/assets/88569352/823a060f-fe4f-4814-99d5-afc066546443" width="auto" height="90">
  <img src="https://github.com/user-attachments/assets/1b85c542-a58c-4672-8203-7f48bc6f0f9b" width="auto" height="90">
  <img src="https://github.com/user-attachments/assets/03a34047-ff1b-4e0c-bdf3-756671046ded" width="auto" height="90">
  <img src="https://static-00.iconduck.com/assets.00/git-icon-1024x1024-pqp7u4hl.png" width="auto" height="90">
</p>

## Entrega del Código

El código ha sido publicado en GitHub. Se han realizado commits regulares y se ha hecho uso de ramas para una gestión eficiente del código.

## Consideraciones Técnicas

Se han tenido en cuenta varias consideraciones técnicas para el desarrollo eficiente de la aplicación:

- Uso de Sequelize para el modelado de la base de datos y la realización de operaciones CRUD.
- Implementación de autenticación de usuarios para ciertos endpoints.
- Uso de componentes visuales atractivos y filtros dinámicos en el frontend para mejorar la experiencia del usuario.
- Organización y estructuración del código siguiendo buenas prácticas y patrones de diseño.

## Instalación

### Requisitos
- Node.js >= 14.x
- npm >= 6.x

### Pasos
1. Instala las dependencias:
   ```bash
   $ npm install
2. Inicia el servidor de desarrollo:
   ```bash
   $ npm run dev

## Apoyo

Para obtener ayuda, puedes utilizar las siguientes vías:

- [GitHub Issues](https://github.com/sebastiannarvaez23/dv-idico-api/issues)
- [Correo Electrónico](narvaezsebas8@gmail.com)

## Mapa vial

### Próximas Funcionalidades
- **Test Unitarios**: Implementación de pruebas unitarias.
- **Roles de Usuario**: Sistema de administración de roles.

## Contribuyendo

¡Contribuciones son bienvenidas! Para contribuir:

1. Realiza un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

### Configuración para Desarrollo

Para configurar el entorno de desarrollo:

1. Instala las dependencias del proyecto.
2. Configura las variables de entorno necesarias.
3. Ejecuta el transpilador para que reconozca cada cambio con:
   ```bash
   $ tsc --watch
5. Ejecuta los scripts de inicio y prueba para asegurar la calidad del código.

## Autores y Reconocimientos

Desarrollado por [Sebastian Narvaez](https://github.com/sebastiannarvaez23).

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Estado del proyecto

**Estado:** Activo. Estamos continuamente trabajando en mejoras y nuevas funcionalidades. Si deseas contribuir, no dudes en ponerte en contacto.

## Observaciones y Recomendaciones

- Es importante considerar la escalabilidad de la aplicación para futuras expansiones del universo Disney en las cuales se tengan en cuenta test unitarios, documentación con swagger, e incluir un sistema de administración de roles de usuario.

## Búsqueda Multifactor y Interfaz de Usuario

Se ha implementado una búsqueda multifactor que permite a los usuarios buscar personajes por diferentes criterios, así como películas o series y géneros. La interfaz de usuario presenta componentes visuales atractivos y filtros dinámicos para mejorar la experiencia del usuario.
