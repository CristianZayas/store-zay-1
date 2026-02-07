# Store Zay – E-commerce Demo

Aplicación e-commerce desarrollada con **Next.js 16 (App Router)** enfocada en rendimiento, escalabilidad y buenas prácticas de arquitectura frontend/fullstack.

El proyecto implementa renderizado en servidor, tipado seguro con TypeScript y una interfaz moderna basada en un enfoque **mobile-first**, garantizando una experiencia consistente en distintos dispositivos.

---

## 🚀 Tecnologías utilizadas

- **Next.js 16** – Server Components y App Router  
- **TypeScript** – Tipado estático para mayor seguridad  
- **Zod** – Validación y modelado de datos  
- **Tailwind CSS** – Estilos rápidos y mantenibles  
- **Radix UI** – Componentes accesibles y reutilizables  

---

 ## 🧠 Decisiones técnicas

- Se utilizaron **Server Components** para el fetch inicial de productos, reduciendo el JavaScript enviado al cliente y mejorando el rendimiento.
- Implementación de una **capa de servicios** para desacoplar la lógica de acceso a datos de la interfaz.
- Uso de **Zod** para garantizar consistencia y seguridad en los datos provenientes de la API.
- Arquitectura modular orientada a la escalabilidad y mantenibilidad.
- Persistencia del carrito mediante **localStorage**, conservando el estado entre sesiones.
- Implementación de **Skeleton Loaders** para mejorar la percepción de carga.
- Uso de componentes de **Radix UI** para garantizar accesibilidad y reutilización de la interfaz.
- Implementación de un flujo de autenticación, permitiendo gestionar el acceso de usuarios y proteger secciones de la aplicación.
- Desarrollo de un módulo de gestión de usuarios (CRUD) siguiendo principios de separación de responsabilidades para facilitar futuras extensiones del sistema.

---

## ✨ Funcionalidades principales

- Listado de productos en formato de cards.  
- Filtro por categoría para facilitar la exploración del catálogo.  
- Búsqueda en tiempo real por nombre de producto.  
- Página de detalle dinámica con información completa del producto.  
- Carrito de compras persistente entre sesiones mediante localStorage.  
- Control de cantidades dentro del carrito de compras.  
- Sistema de autenticación para el control de acceso a la aplicación.  
- Protección de rutas para restringir el acceso a secciones privadas.  
- Gestión de usuarios mediante operaciones CRUD (crear, editar, eliminar y consultar).  
- Arquitectura modular orientada a la escalabilidad y mantenibilidad.  
- Diseño totalmente responsive con enfoque Mobile First.  
---

## 🧱 Estructura del proyecto

El proyecto sigue una arquitectura modular que facilita la separación de responsabilidades y permite una evolución sencilla del código.

```

src/
├── app          → Rutas y páginas utilizando App Router
├── components   → Componentes reutilizables de la interfaz
├── config       → Configuraciones globales de la aplicación
├── constants    → Constantes compartidas
├── hooks        → Custom hooks para lógica reutilizable
├── interfaces   → Definición de tipos de TypeScript
├── lib          → Funciones utilitarias y helpers
├── schemas      → Esquemas de validación con Zod
├── services     → Capa de comunicación con APIs
└── styles       → Estilos globales

````

### 📡 Carpeta `services`

La capa de servicios se divide en:

- **api** → Configuración base para la comunicación con la API y manejo centralizado de errores.
- **services** → Funciones encargadas de obtener y transformar los datos utilizados por la aplicación.

Esta separación permite mantener una arquitectura más limpia y preparada para escalar.

## 📦 Instalación y ejecución

```bash
npm install
npm run dev
npm run build
````

La aplicación estará disponible en:

```
http://localhost:3000
```

---

## 🔮 Mejoras futuras

* Integración con pasarela de pagos
* Autenticación de usuarios
* Sincronización del carrito con backend
* Tests unitarios y de integración
* Optimización avanzada de imágenes

---

## 👨‍💻 Autor

**Cristian Zayas Arieta**
**Angel lizama**

## OBLIGATORIO.

<img width="1429" height="740" alt="image" src="https://github.com/user-attachments/assets/07e4ab16-2851-4873-b214-f5cf46babccd" />
<img width="1429" height="740" alt="image" src="https://github.com/user-attachments/assets/eae7f7c3-f56f-4ccf-a3fb-43f0f640000f" />
<img width="1429" height="740" alt="image" src="https://github.com/user-attachments/assets/4b8d392e-8d0f-451a-9f42-e3d02ed0b7e7" />



