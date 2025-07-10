# 📝 Instrucciones para Personalizar tu Prisma Mag

## 🎯 Pasos para Personalizar tu Contenido

> **Nota:** Este contenido ya está personalizado para Prisma Studio. Estas instrucciones te ayudarán a hacer ajustes adicionales si necesitas cambiar algún detalle.

### 1. Cambiar Información Personal

En el archivo `index.html`, busca la sección **Página 3 - Biografías** y modifica:

```html
<!-- Busca esta sección alrededor de la línea 120 -->
<div class="bio-content">
    <h3>Arístides Núñez</h3>  <!-- ✏️ YA PERSONALIZADO -->
    <p class="bio-title">Fundador de Prisma Studio</p>  <!-- ✏️ YA PERSONALIZADO -->
    <p class="bio-description">
        Estudiante de Ciberseguridad en la UTP... <!-- ✏️ YA PERSONALIZADO -->
    </p>
</div>
```

### 2. Actualizar Imágenes

#### Fotos de Perfil
- **Ubicación**: Página 3 (Biografías)
- **Líneas**: ~125 y ~140
- **Cambiar**: URLs de Unsplash por tus fotos
```html
<img src="TU_FOTO_AQUI" alt="Tu foto" />
```

#### Imagen de Portada
- **Ubicación**: Página 1 (Portada)
- **Línea**: ~35
```html
<img src="TU_IMAGEN_PORTADA" alt="Portada" />
```

### 3. Personalizar el Tema de tu Emprendimiento

#### Cambiar Título y Tema
En la **Página 1 - Portada**:
```html
<h1 class="magazine-title">TU TEMA<br><span class="title-accent">& SUBTEMA</span></h1>
```

#### Modificar Misión, Visión y Función
En la **Página 4**, actualiza:
- La misión de tu emprendimiento
- La visión a futuro
- La función que cumple
- Los valores fundamentales

### 4. Actualizar Estadísticas e Impacto

#### Cambiar Números
En la **Página 5** (Formación Emprendedora):
```html
<div class="stat-number">85%</div>  <!-- ✏️ CAMBIAR POR TUS DATOS -->
<div class="stat-label">de los emprendedores exitosos...</div>
```

#### Métricas de Impacto
En la **Página 6** (Impacto en la Comunidad):
```html
<span class="metric">500+ personas capacitadas</span>  <!-- ✏️ TUS MÉTRICAS -->
```

### 5. Personalizar Servicios y Precios

En la **Página 7** (Servicios y Estructura):
```html
<span class="service-name">Talleres de Liderazgo</span>  <!-- ✏️ TU SERVICIO -->
<span class="service-price">$150</span>  <!-- ✏️ TU PRECIO -->
```

### 6. Escribir tu Conclusión

En la **Página 8** (Conclusión):
- Refleja sobre TU aprendizaje
- Menciona TU impacto específico
- Usa TUS palabras y reflexiones

### 7. Actualizar Bibliografía

En la **Página 9** (Bibliografía):
- Agrega las fuentes que realmente consultaste
- Sigue el formato APA
- Incluye libros, artículos y sitios web relevantes

## 🎨 Personalización Visual

### Cambiar Colores
En `styles.css`, busca estas variables:

```css
/* Colores principales */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
/* Cambiar por: */
background: linear-gradient(135deg, #TU_COLOR_1 0%, #TU_COLOR_2 100%);
```

### Modificar Tipografía
```css
font-family: 'Times New Roman', serif;
/* Cambiar por otra fuente de Google Fonts */
```

### Ajustar Tamaños
```css
font-size: 12px;  /* Texto general */
font-size: 14px;  /* Títulos */
/* Modificar según necesites */
```

## 📖 Estructura de Contenido por Página

### Página 1: Portada
- [ ] Título de tu revista
- [ ] Subtítulo/tema
- [ ] Número de edición
- [ ] Fecha actual
- [ ] Imagen representativa

### Página 2: Introducción
- [ ] Explicación de tu tema
- [ ] Justificación de la elección
- [ ] Presentación del contenido
- [ ] Objetivo del emprendimiento

### Página 3: Biografías
- [ ] Tu biografía personal
- [ ] Tu foto
- [ ] Experto o mentor (opcional)
- [ ] Logros y experiencias

### Página 4: Misión, Visión y Función
- [ ] Misión de tu emprendimiento
- [ ] Visión a futuro
- [ ] Función que cumple
- [ ] Valores fundamentales

### Página 5: Formación Emprendedora
- [ ] Importancia de la formación
- [ ] Metodología que usas
- [ ] Estadísticas relevantes
- [ ] Pasos del proceso

### Página 6: Impacto en la Comunidad
- [ ] Áreas de impacto
- [ ] Métricas de resultados
- [ ] Testimonios (opcional)
- [ ] Beneficios sociales

### Página 7: Servicios y Estructura
- [ ] Productos/servicios que ofreces
- [ ] Precios y tarifas
- [ ] Herramientas que usas
- [ ] Metodología de evaluación

### Página 8: Conclusión
- [ ] Reflexiones personales
- [ ] Aprendizajes obtenidos
- [ ] Impacto esperado
- [ ] Mensaje final

### Página 9: Bibliografía
- [ ] Referencias en formato APA
- [ ] Libros consultados
- [ ] Artículos académicos
- [ ] Sitios web relevantes

## 🚀 Consejos Finales

1. **Mantén la coherencia**: Asegúrate de que todo el contenido esté alineado con tu tema principal
2. **Usa imágenes de calidad**: Busca fotos profesionales y relevantes
3. **Revisa la ortografía**: Utiliza correctores automáticos antes de entregar
4. **Prueba en diferentes dispositivos**: Verifica que se vea bien en móvil y escritorio
5. **Personaliza los colores**: Elige una paleta que represente tu marca personal

## 📞 Soporte

Si tienes problemas técnicos:
1. Verifica que todos los archivos estén en la misma carpeta
2. Usa un navegador moderno (Chrome, Firefox, Safari)
3. Revisa la consola del navegador para errores (F12)
4. Asegúrate de que las rutas de las imágenes sean correctas

¡Buena suerte con tu proyecto final! 🎉 