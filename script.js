// Estado global de la aplicación
let currentPage = 1;
let totalPages = 9;
let zoomLevel = 1;
let isFullscreen = false;

// Elementos del DOM - inicializados en DOMContentLoaded
let magazine, currentPageSpan, totalPagesSpan, prevBtn, nextBtn, zoomInBtn, zoomOutBtn, fullscreenBtn;

// Configuración
const config = {
    maxZoom: 2,
    minZoom: 0.5,
    zoomStep: 0.1,
    transitionDuration: 800,
    touchSensitivity: 50
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado, iniciando revista...');
    
    // Inicializar elementos del DOM
    magazine = document.getElementById('magazine');
    currentPageSpan = document.getElementById('currentPage');
    totalPagesSpan = document.getElementById('totalPages');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
    zoomInBtn = document.getElementById('zoomIn');
    zoomOutBtn = document.getElementById('zoomOut');
    fullscreenBtn = document.getElementById('fullscreen');
    
    // Verificar que los elementos existen
    console.log('Elementos encontrados:', {
        magazine: !!magazine,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        currentPageSpan: !!currentPageSpan,
        totalPagesSpan: !!totalPagesSpan
    });
    
    // Verificar si hay errores en los elementos
    if (!magazine || !prevBtn || !nextBtn || !currentPageSpan || !totalPagesSpan) {
        console.error('Error: Algunos elementos DOM no fueron encontrados');
        return;
    }
    
    initializeMagazine();
    setupEventListeners();
    updatePageDisplay();
    updateNavigationButtons();
    setupKeyboardNavigation();
    setupTouchNavigation();
    setupPageAnimations();
    
    console.log('Revista inicializada correctamente');
});

// Inicializar la revista
function initializeMagazine() {
    // Configurar páginas iniciales
    const pages = document.querySelectorAll('.page');
    pages.forEach((page, index) => {
        const pageNumber = index + 1;
        page.setAttribute('data-page', pageNumber);
        
        // Ocultar todas las páginas excepto la primera
        if (pageNumber === 1) {
            page.style.display = 'block';
            page.style.zIndex = '2';
        } else {
            page.style.display = 'none';
            page.style.zIndex = '1';
        }
    });
    
    // Configurar indicadores
    totalPagesSpan.textContent = totalPages;
    currentPageSpan.textContent = currentPage;
    
    // Actualizar botones de navegación
    updateNavigationButtons();
    
    // Precargar imágenes
    preloadImages();
}

// Configurar event listeners
function setupEventListeners() {
    console.log('Configurando event listeners...');
    
    // Botones de navegación
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            console.log('Botón anterior clickeado');
            e.preventDefault();
            navigatePage(-1);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            console.log('Botón siguiente clickeado');
            e.preventDefault();
            navigatePage(1);
        });
    }
    
    // Controles de zoom
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => adjustZoom(config.zoomStep));
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => adjustZoom(-config.zoomStep));
    }
    
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
    
    // Navegación con clics en las páginas
    if (magazine) {
        magazine.addEventListener('click', handlePageClick);
        magazine.addEventListener('wheel', handleWheelZoom);
    }
    
    // Redimensionamiento de ventana
    window.addEventListener('resize', handleResize);
    
    // Eventos de teclado
    document.addEventListener('keydown', handleKeyNavigation);
    
    console.log('Event listeners configurados');
}

// Navegación entre páginas
function navigatePage(direction) {
    console.log(`Navegando: currentPage=${currentPage}, direction=${direction}, totalPages=${totalPages}`);
    
    const newPage = currentPage + direction;
    
    if (newPage < 1 || newPage > totalPages) {
        console.log('Navegación bloqueada: fuera de rango');
        return;
    }
    
    console.log(`Navegando de página ${currentPage} a ${newPage}`);
    
    showPageTransition(currentPage, newPage);
    currentPage = newPage;
    updatePageDisplay();
    updateNavigationButtons();
    
    console.log(`Navegación completada: currentPage=${currentPage}`);
}

// Mostrar transición entre páginas
function showPageTransition(fromPage, toPage) {
    const fromPageElement = document.querySelector(`[data-page="${fromPage}"]`);
    const toPageElement = document.querySelector(`[data-page="${toPage}"]`);
    
    if (!fromPageElement || !toPageElement) return;
    
    // Ocultar todas las páginas excepto las que están en transición
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        const pageNum = parseInt(page.getAttribute('data-page'));
        if (pageNum !== fromPage && pageNum !== toPage) {
            page.style.display = 'none';
            page.style.zIndex = '1';
        }
    });
    
    // Agregar clase de loading
    magazine.classList.add('loading');
    
    // Efecto de volteo
    if (toPage > fromPage) {
        // Avanzar página
        animatePageFlip(fromPageElement, toPageElement, 'forward');
    } else {
        // Retroceder página
        animatePageFlip(fromPageElement, toPageElement, 'backward');
    }
    
    // Remover clase de loading después de la transición
    setTimeout(() => {
        magazine.classList.remove('loading');
    }, config.transitionDuration);
}

// Animación de volteo de páginas
function animatePageFlip(fromPage, toPage, direction) {
    const isForward = direction === 'forward';
    
    // Configurar posiciones iniciales
    fromPage.style.zIndex = '2';
    toPage.style.zIndex = '1';
    toPage.style.display = 'block';
    
    // Aplicar transformaciones
    if (isForward) {
        fromPage.style.transform = 'rotateY(0deg)';
        fromPage.style.transformOrigin = 'right center';
        
        setTimeout(() => {
            fromPage.style.transition = `transform ${config.transitionDuration}ms ease-in-out`;
            fromPage.style.transform = 'rotateY(-180deg)';
            
            setTimeout(() => {
                fromPage.style.display = 'none';
                fromPage.style.transform = 'rotateY(0deg)';
                fromPage.style.transition = '';
                toPage.style.zIndex = '1';
            }, config.transitionDuration);
        }, 10);
    } else {
        toPage.style.transform = 'rotateY(-180deg)';
        toPage.style.transformOrigin = 'left center';
        
        setTimeout(() => {
            toPage.style.transition = `transform ${config.transitionDuration}ms ease-in-out`;
            toPage.style.transform = 'rotateY(0deg)';
            
            setTimeout(() => {
                fromPage.style.display = 'none';
                toPage.style.transition = '';
                toPage.style.zIndex = '1';
            }, config.transitionDuration);
        }, 10);
    }
}

// Actualizar display de página actual
function updatePageDisplay() {
    currentPageSpan.textContent = currentPage;
    
    // Mostrar/ocultar información del proyecto solo en la primera página
    const projectInfo = document.querySelector('.project-info');
    if (projectInfo) {
        projectInfo.style.display = currentPage === 1 ? 'flex' : 'none';
    }
    
    // Actualizar título del documento
    const pageTitle = document.querySelector(`[data-page="${currentPage}"] .page-title`);
    if (pageTitle) {
        document.title = `Prisma Mag - ${pageTitle.textContent}`;
    } else if (currentPage === 1) {
        document.title = `Prisma Magazine - Diseño Gráfico con Propósito`;
    }
}

// Actualizar botones de navegación
function updateNavigationButtons() {
    const prevDisabled = currentPage <= 1;
    const nextDisabled = currentPage >= totalPages;
    
    console.log(`Página ${currentPage}/${totalPages} - Prev: ${prevDisabled ? 'OFF' : 'ON'}, Next: ${nextDisabled ? 'OFF' : 'ON'}`);
    
    if (prevBtn) {
        prevBtn.disabled = prevDisabled;
    }
    
    if (nextBtn) {
        nextBtn.disabled = nextDisabled;
    }
    
    // Actualizar iconos
    const prevIcon = prevBtn ? prevBtn.querySelector('i') : null;
    const nextIcon = nextBtn ? nextBtn.querySelector('i') : null;
    
    if (prevIcon) {
        prevIcon.style.opacity = prevDisabled ? '0.5' : '1';
    }
    
    if (nextIcon) {
        nextIcon.style.opacity = nextDisabled ? '0.5' : '1';
    }
}

// Manejar clic en páginas
function handlePageClick(event) {
    const rect = magazine.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const centerX = rect.width / 2;
    
    // Navegar basado en el lado del clic
    if (clickX < centerX && currentPage > 1) {
        navigatePage(-1);
    } else if (clickX > centerX && currentPage < totalPages) {
        navigatePage(1);
    }
}

// Ajustar zoom
function adjustZoom(delta) {
    const newZoom = Math.max(config.minZoom, Math.min(config.maxZoom, zoomLevel + delta));
    
    if (newZoom !== zoomLevel) {
        zoomLevel = newZoom;
        magazine.style.transform = `scale(${zoomLevel})`;
        magazine.style.transition = 'transform 0.3s ease';
        
        // Actualizar botones de zoom
        updateZoomButtons();
        
        // Remover transición después de la animación
        setTimeout(() => {
            magazine.style.transition = '';
        }, 300);
    }
}

// Actualizar botones de zoom
function updateZoomButtons() {
    zoomInBtn.disabled = zoomLevel >= config.maxZoom;
    zoomOutBtn.disabled = zoomLevel <= config.minZoom;
    
    zoomInBtn.style.opacity = zoomInBtn.disabled ? '0.5' : '1';
    zoomOutBtn.style.opacity = zoomOutBtn.disabled ? '0.5' : '1';
}

// Manejar zoom con rueda del mouse
function handleWheelZoom(event) {
    if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        const delta = event.deltaY > 0 ? -config.zoomStep : config.zoomStep;
        adjustZoom(delta);
    }
}

// Alternar pantalla completa
function toggleFullscreen() {
    const container = document.querySelector('.magazine-container');
    
    if (!isFullscreen) {
        container.classList.add('fullscreen');
        fullscreenBtn.querySelector('i').className = 'fas fa-compress';
        isFullscreen = true;
    } else {
        container.classList.remove('fullscreen');
        fullscreenBtn.querySelector('i').className = 'fas fa-expand';
        isFullscreen = false;
    }
    
    // Resetear zoom en pantalla completa
    if (isFullscreen) {
        zoomLevel = 1;
        magazine.style.transform = 'scale(1)';
        updateZoomButtons();
    }
}

// Configurar navegación por teclado
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
        switch(event.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                event.preventDefault();
                navigatePage(-1);
                break;
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
                event.preventDefault();
                navigatePage(1);
                break;
            case 'Home':
                event.preventDefault();
                goToPage(1);
                break;
            case 'End':
                event.preventDefault();
                goToPage(totalPages);
                break;
            case 'f':
            case 'F':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    toggleFullscreen();
                }
                break;
            case 'Escape':
                if (isFullscreen) {
                    toggleFullscreen();
                }
                break;
        }
    });
}

// Configurar navegación táctil
function setupTouchNavigation() {
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    magazine.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    });
    
    magazine.addEventListener('touchmove', (event) => {
        event.preventDefault(); // Prevenir scroll
    });
    
    magazine.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].clientX;
        touchEndY = event.changedTouches[0].clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Verificar si es un swipe horizontal
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > config.touchSensitivity) {
            if (deltaX > 0) {
                navigatePage(-1); // Swipe derecha = página anterior
            } else {
                navigatePage(1); // Swipe izquierda = página siguiente
            }
        }
    });
}

// Ir a una página específica
function goToPage(pageNumber) {
    if (pageNumber < 1 || pageNumber > totalPages || pageNumber === currentPage) {
        return;
    }
    
    showPageTransition(currentPage, pageNumber);
    currentPage = pageNumber;
    updatePageDisplay();
    updateNavigationButtons();
}

// Configurar animaciones de páginas
function setupPageAnimations() {
    // Observador de intersección para animaciones
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });
    
    // Observar elementos animables
    const animatedElements = document.querySelectorAll('.page-content');
    animatedElements.forEach(el => observer.observe(el));
}

// Precargar imágenes
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
}

// Manejar redimensionamiento de ventana
function handleResize() {
    // Ajustar zoom si es necesario
    if (window.innerWidth < 768 && zoomLevel > 1) {
        zoomLevel = 1;
        magazine.style.transform = 'scale(1)';
        updateZoomButtons();
    }
}

// Manejar navegación por teclado
function handleKeyNavigation(event) {
    // Prevenir navegación si hay un input enfocado
    if (document.activeElement.tagName === 'INPUT' || 
        document.activeElement.tagName === 'TEXTAREA') {
        return;
    }
    
    const key = event.key.toLowerCase();
    
    switch(key) {
        case 'pageup':
            event.preventDefault();
            navigatePage(-1);
            break;
        case 'pagedown':
            event.preventDefault();
            navigatePage(1);
            break;
        case '+':
        case '=':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                adjustZoom(config.zoomStep);
            }
            break;
        case '-':
        case '_':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                adjustZoom(-config.zoomStep);
            }
            break;
        case '0':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                zoomLevel = 1;
                magazine.style.transform = 'scale(1)';
                updateZoomButtons();
            }
            break;
    }
}

// Utilidades
const utils = {
    // Debounce para optimizar rendimiento
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle para eventos frecuentes
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Formatear número de página
    formatPageNumber: function(num) {
        return num.toString().padStart(2, '0');
    },
    
    // Validar número de página
    isValidPage: function(pageNum) {
        return pageNum >= 1 && pageNum <= totalPages;
    }
};

// API pública para control externo
window.MagazineAPI = {
    // Navegación
    nextPage: () => navigatePage(1),
    prevPage: () => navigatePage(-1),
    goToPage: (pageNum) => goToPage(pageNum),
    
    // Zoom
    zoomIn: () => adjustZoom(config.zoomStep),
    zoomOut: () => adjustZoom(-config.zoomStep),
    resetZoom: () => {
        zoomLevel = 1;
        magazine.style.transform = 'scale(1)';
        updateZoomButtons();
    },
    
    // Estado
    getCurrentPage: () => currentPage,
    getTotalPages: () => totalPages,
    getZoomLevel: () => zoomLevel,
    
    // Pantalla completa
    toggleFullscreen: toggleFullscreen,
    isFullscreen: () => isFullscreen,
    
    // Configuración
    setTransitionDuration: (duration) => {
        config.transitionDuration = duration;
    },
    
    // Eventos personalizados
    onPageChange: function(callback) {
        document.addEventListener('pageChange', callback);
    }
};

// Disparar evento personalizado cuando cambie la página
function dispatchPageChangeEvent() {
    const event = new CustomEvent('pageChange', {
        detail: {
            currentPage: currentPage,
            totalPages: totalPages
        }
    });
    document.dispatchEvent(event);
}

// Actualizar función navigatePage para incluir evento
const originalNavigatePage = navigatePage;
navigatePage = function(direction) {
    const oldPage = currentPage;
    originalNavigatePage(direction);
    
    if (oldPage !== currentPage) {
        dispatchPageChangeEvent();
    }
};

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'error' ? '#dc3545' : '#28a745'};
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Manejar errores
window.addEventListener('error', (event) => {
    console.error('Error en la revista:', event.error);
    showNotification('Ha ocurrido un error. Por favor, recarga la página.', 'error');
});

// Mensaje de bienvenida
setTimeout(() => {
    showNotification('¡Bienvenido a Prisma Mag! Usa las flechas o desliza para navegar.');
}, 1000);

// Optimizaciones de rendimiento
const optimizations = {
    // Lazy loading de imágenes
    setupLazyLoading: function() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    },
    
    // Optimizar animaciones
    optimizeAnimations: function() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            config.transitionDuration = 200;
            document.documentElement.style.setProperty('--transition-duration', '200ms');
        }
    }
};

// Inicializar optimizaciones
optimizations.setupLazyLoading();
optimizations.optimizeAnimations();

// Soporte para service worker (PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado: ', registration);
            })
            .catch(registrationError => {
                console.log('SW falló: ', registrationError);
            });
    });
}

// Las funciones están disponibles globalmente a través de window.MagazineAPI
console.log('Prisma Mag cargado correctamente'); 