import postventaImage from '../assets/postventa.png'

export const projects = [
  {
    id: 'facturacion-argentina',
    name: 'Integración de facturación para cliente internacional',
    description:
      'Una empresa uruguaya necesitaba incorporar facturación argentina a su plataforma existente. Desarrollé una solución que permite procesar comprobantes, integrarse con los servicios necesarios y generar la documentación fiscal correspondiente.',
    role:
      'Diseño y desarrollo de la API, procesamiento de comprobantes, integración con servicios externos y generación de PDFs.',
    stack: ['C#', '.NET 8', 'SQL Server', 'REST API', 'RDLC'],
    github: null,
    demo: null,
    accent: 'violet',
  },

  {
    id: 'gestion-postventa',
    name: 'Sistema de gestión de Post Venta',
    description:
      'Sistema desarrollado para gestionar las operaciones de postventa de una concesionaria de motos, centralizando clientes, vehículos, órdenes de trabajo, agenda, turnos, garantías, mantenimientos y facturación.',
    role:
      'Desarrollo de funcionalidades de gestión, integración entre sistemas, validación de datos de vehículos y conexión del flujo de postventa con facturación.',
    stack: ['C#', '.NET', 'SQL Server', 'JavaScript'],
    github: null,
    demo: null,
    image: postventaImage,
    accent: 'blue',
  },

  {
    id: 'gestion-comercios',
    name: 'Sistema de gestión para comercios',
    description:
      'Una solución propia pensada para pequeños y medianos comercios que necesitan centralizar sus ventas, artículos, clientes y stock y simplificar la gestión diaria de su negocio.',
    role:
      'Desarrollo integral de la aplicación, desde la API y la base de datos hasta la interfaz y la lógica de gestión.',
    stack: ['C#', '.NET 8', 'ASP.NET Core', 'SQL Server', 'JavaScript'],
    github: null,
    demo: '/gestion-comercios',
    accent: 'violet',
    featured: true,
    commercial: true,
  },
]