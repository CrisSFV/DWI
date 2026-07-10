# Banco de Instrumentos — Práctica de Laboratorio DWI

Portal SPA que integra tres herramientas interactivas en una sola página (`index.html`), navegables desde el menú "Switchboard" sin recargar la página.

## Estructura

```
dwi-lab/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js     # navegación entre paneles (SPA)
│   ├── dob.js       # Proyecto 1: cronómetro vital
│   ├── temp.js       # Proyecto 2: conversor térmico
│   └── tasks.js      # Proyecto 3: bitácora de tareas
└── README.md
```

## Proyecto 1 — Cronómetro vital

Calcula el tiempo transcurrido desde una fecha de nacimiento.

- Selector de fecha 100% construido con JavaScript (tres `<select>` de día/mes/año poblados dinámicamente, sin usar `input type="date"`).
- El listado de días se recalcula según el mes/año elegidos (respeta años bisiestos).
- Valida que la fecha sea real y no futura.
- Muestra el resultado en años y meses.

## Proyecto 2 — Conversor térmico

Convierte entre Celsius, Fahrenheit y Kelvin.

- El botón "Convertir" permanece deshabilitado hasta llenar los tres campos (valor, unidad de origen, unidad de destino).
- Valida que la temperatura no esté por debajo del cero absoluto.
- Muestra el resultado justo debajo del formulario.

## Proyecto 3 — Bitácora de tareas

Gestor de tareas con manipulación dinámica del DOM.

- Estado interno como arreglo de objetos `{ id, descripcion, completada }`.
- `renderTasks()` limpia y reconstruye la lista visual a partir del arreglo en cada cambio.
- Las tareas pendientes se muestran primero; al completarse pasan al final con texto tachado.
- Se pueden desmarcar (regresan a pendientes) o eliminar permanentemente.

## Despliegue en GitHub Pages

1. Sube el contenido de esta carpeta a un repositorio de GitHub.
2. En **Settings → Pages**, selecciona la rama `main` y la carpeta raíz (`/`).
3. GitHub publicará el sitio en `https://<usuario>.github.io/<repositorio>/`.
