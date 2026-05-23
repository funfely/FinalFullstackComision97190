Proyecto Final Fullstack: API de Adopciones

Este repositorio contiene la API RESTful para la gestión de adopciones, desarrollada como entrega final de la materia Programación Backend (III). Incluye una arquitectura modular, tests funcionales automatizados (Supertest + Jest) y despliegue en la nube mediante Docker y GitHub Actions.

## Enlaces Oficiales
- Repositorio (GitHub): https://github.com/funfely/FinalFullstackComision97190.git
- Imagen Oficial (Docker Hub): https://hub.docker.com/r/jecordero/adoption-api

---

##  1. Ejecutar Tests Funcionales Localmente
Para verificar el correcto funcionamiento de los endpoints de manera aislada y simulada, ejecute:
1. Instalar dependencias de desarrollo: npm install
2. Correr la suite de pruebas: npm test

---

##  2. Despliegue mediante Contenedores Docker
La imagen de producción se encuentra optimizada con Alpine Linux y publicada en el registro central. Para probarla directamente en tu entorno local sin clonar el código fuente:

1. Descargar la imagen oficial desde Docker Hub:
   docker pull jecordero/adoption-api:1.0.0

2. Inicializar el ciclo de vida del contenedor en el puerto asignado (8080):
   docker run -d -p 8080:8080 jecordero/adoption-api:1.0.0

---

##  3. Rutas y Endpoints Disponibles
Una vez que el contenedor esté corriendo, la API responderá en http://localhost:8080. Podés probar con Postman o tu navegador:

- GET http://localhost:8080/api/adoptions -> Retorna la lista total de adopciones mapeadas.
- GET http://localhost:8080/api/adoptions/1 -> Retorna el detalle específico de una adopción.
- POST http://localhost:8080/api/adoptions -> Creación segura de nuevos registros (Requiere JSON con petId y userId).

---

##  Pipeline Automatizado de CI/CD
El repositorio integra un flujo de control automatizado por GitHub Actions en .github/workflows/docker.yml. Con cada Push hacia la rama principal, el servidor remoto ejecuta de manera transparente los tests funcionales, verifica la integridad del software y distribuye de forma automática la nueva versión de la imagen a Docker Hub.
