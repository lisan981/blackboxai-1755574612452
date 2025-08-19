# Ministerio Heme Aquí - Sistema de Gestión Financiera

Una aplicación web moderna para la gestión financiera de pequeños negocios, desarrollada con React, Firebase y Tailwind CSS.

## Características

- 📊 Dashboard financiero con métricas en tiempo real
- 💰 Gestión de efectivo y activos
- 📦 Control de inventario de productos y materiales
- 💳 Seguimiento de deudas y créditos
- 📈 Reportes de ganancias y gastos
- 🌙 Modo oscuro/claro
- 📱 Diseño responsivo
- 🔐 Autenticación con Firebase
- ☁️ Almacenamiento en la nube con Firestore

## Tecnologías Utilizadas

- **Frontend**: React 18, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore)
- **Estilos**: Tailwind CSS con tema personalizado
- **Fuentes**: Google Fonts (Inter)

## Instalación

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd ministerio-heme-aqui
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura Firebase**
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Habilita Authentication (Anonymous Auth)
   - Habilita Firestore Database
   - Copia las credenciales de configuración

4. **Configura las variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita el archivo `.env` con tus credenciales de Firebase:
   ```env
   REACT_APP_FIREBASE_API_KEY=tu_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=tu_proyecto_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
   REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```

5. **Inicia la aplicación**
   ```bash
   npm start
   ```

   La aplicación estará disponible en `http://localhost:3000`

## Configuración de Firebase

### 1. Crear proyecto en Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita Google Analytics (opcional)

### 2. Configurar Authentication
1. En el panel de Firebase, ve a "Authentication"
2. En la pestaña "Sign-in method", habilita "Anonymous"

### 3. Configurar Firestore
1. Ve a "Firestore Database"
2. Crea una base de datos
3. Comienza en modo de prueba (puedes configurar reglas más tarde)

### 4. Obtener configuración
1. Ve a "Project Settings" (ícono de engranaje)
2. En la sección "Your apps", agrega una app web
3. Copia la configuración y pégala en tu archivo `.env`

## Estructura del Proyecto

```
ministerio-heme-aqui/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.js          # Componente principal
│   ├── index.js        # Punto de entrada
│   └── index.css       # Estilos globales con Tailwind
├── tailwind.config.js  # Configuración de Tailwind
├── postcss.config.js   # Configuración de PostCSS
├── .env.example        # Ejemplo de variables de entorno
└── package.json
```

## Funcionalidades

### Dashboard
- Resumen de efectivo disponible
- Total de activos
- Valor del inventario
- Cuentas por cobrar

### Gestión Financiera
- Registro de ingresos y gastos
- Control de flujo de efectivo
- Seguimiento de deudas
- Reportes financieros

### Inventario
- Gestión de productos
- Control de materiales
- Seguimiento de stock
- Valoración de inventario

### Configuración
- Modo oscuro/claro
- Configuración de Firebase
- Gestión de usuario

## Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm eject` - Expone la configuración de webpack (irreversible)

## Personalización

### Colores del Tema
Los colores se pueden personalizar en `tailwind.config.js`:

```javascript
colors: {
  'pulperia-primary': '#6c9a75',      // Verde principal
  'pulperia-primary-dark': '#5b8764', // Verde oscuro
  'pulperia-bg-light': '#f7f9f3',     // Fondo claro
  'pulperia-bg-dark': '#2e3d31',      // Fondo oscuro
  // ... más colores
}
```

### Productos Base
La lista de productos se puede modificar en `App.js`:

```javascript
const productosBase = [
  'Te Paris', 'Galletas', 'Cereales',
  // Agrega o modifica productos aquí
];
```

## Despliegue

### Netlify
1. Construye la aplicación: `npm run build`
2. Sube la carpeta `build` a Netlify
3. Configura las variables de entorno en Netlify

### Vercel
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Despliega automáticamente

### Firebase Hosting
1. Instala Firebase CLI: `npm install -g firebase-tools`
2. Inicia sesión: `firebase login`
3. Inicializa: `firebase init hosting`
4. Construye: `npm run build`
5. Despliega: `firebase deploy`

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Soporte

Si tienes problemas o preguntas:
1. Revisa la documentación de [Firebase](https://firebase.google.com/docs)
2. Consulta la documentación de [Tailwind CSS](https://tailwindcss.com/docs)
3. Abre un issue en el repositorio

## Autor

Desarrollado para Ministerio Heme Aquí - Sistema de gestión financiera para pequeños negocios.
