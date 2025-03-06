export default {
  common: {
    loading: 'Cargando...',
    error: 'Se produjo un error',
    retry: 'Intentar de nuevo',
  },
  auth: {
    login: 'Iniciar sesión',
    signup: 'Registrarse',
    email: 'Correo electrónico',
    password: 'Contraseña',
  },
  dashboard: {
    tasks: {
      title: 'Tareas de hoy',
      swipeHint: 'Desliza hacia la izquierda para completar',
      voiceHint: 'Comando de voz detectado: "Completar tarea"',
      achievement: '¡Logro desbloqueado: Maestro de tareas!',
    },
    progress: {
      title: 'Resumen de progreso',
      weeklyProgress: 'Progreso semanal',
      complete: 'Completo',
    },
    achievements: {
      title: 'Logros',
      viewAll: 'Ver logros',
    },
  },
  protocols: {
    create: 'Crear protocolo',
    edit: 'Editar protocolo',
    delete: 'Eliminar protocolo',
    title: 'Título',
    steps: 'Pasos',
  },
} as const; 