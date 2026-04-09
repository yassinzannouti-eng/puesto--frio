# 🥗 Puesto Frío — El Balneario

Aplicación PWA de gestión de cocina profesional: mise en place, stock, recetario, congelador y traspaso de turno.

## 📁 Estructura del proyecto

```
puesto-frio/
├── index.html      ← App completa (HTML + CSS + JS en un solo archivo)
├── manifest.json   ← Configuración PWA (instalar en pantalla de inicio)
├── sw.js           ← Service Worker (caché offline)
├── icon-192.png    ← Icono PWA 192×192
├── icon-512.png    ← Icono PWA 512×512
└── README.md       ← Este archivo
```

## 🔥 Configurar Firebase (sincronización en tiempo real)

1. Ve a [console.firebase.google.com](https://console.firebase.google.com)
2. Crea un proyecto → **Realtime Database** → Crear base de datos → Modo de prueba
3. En **Reglas**, pega:
   ```json
   { "rules": { ".read": true, ".write": true } }
   ```
4. En ⚙️ **Configuración del proyecto** → Tus apps → copia los datos
5. Abre `index.html` y busca la sección `FIREBASE_CONFIG_PRECARGADA` (~línea 885):

```javascript
const FIREBASE_CONFIG_PRECARGADA = {
  apiKey:            "AIzaSy...",
  authDomain:        "tu-proyecto.firebaseapp.com",
  databaseURL:       "https://tu-proyecto-default-rtdb.firebaseio.com",
  projectId:         "tu-proyecto",
  storageBucket:     "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abc123",
};
```

Con los valores rellenos, la app se conectará automáticamente al abrirse.

## 👥 Usuarios por defecto

| Usuario | Contraseña | Nombre  |
|---------|-----------|---------|
| jefe1   | cocina1   | Carlos  |
| jefe2   | cocina2   | María   |
| socio   | balneario | Socio   |

Para añadir o eliminar usuarios: menú lateral ☰ → **Gestión de Usuarios** (requiere login).

## 🚀 Desplegar en GitHub Pages

1. Crea un repositorio en GitHub (puede ser privado)
2. Sube todos los archivos a la rama `main`
3. Ve a **Settings → Pages** → Source: `main` / `/ (root)`
4. Tu app estará en `https://tu-usuario.github.io/nombre-repo/`

> ⚠️ **Importante**: Con GitHub Pages la URL cambia. Asegúrate de que Firebase tenga esa URL en sus dominios autorizados (Configuración → Authentication → Authorized domains).

## 📱 Instalar como app en el móvil

- **iOS (Safari)**: Compartir → Añadir a pantalla de inicio
- **Android (Chrome)**: Menú → Añadir a pantalla de inicio

## ✨ Funcionalidades

- ✅ **Mise en place** por turnos (Mañana / Noche) con niveles Sin/Poco/OK
- 📦 **Stock** de materias primas con alertas automáticas
- ❄️ **Congelador** con inventario y fechas
- 📖 **Recetario** con ingredientes, fotos y escaneo OCR de cartas (requiere API Claude)
- 🍳 **Producción** del turno con prioridades
- 📝 **Traspaso** de notas entre turnos
- ⚡ **Firebase** sync en tiempo real entre dispositivos
- 🔐 **Acceso por usuario** para jefes de partida

## 🛠️ Tecnologías

- HTML + CSS + JavaScript vanilla (sin frameworks)
- Firebase Realtime Database 9.x (compat mode)
- DM Sans (Google Fonts)
- PWA con Service Worker y caché offline

## 📄 Versión

**v11** · Puesto Frío Pro · El Balneario, Málaga
