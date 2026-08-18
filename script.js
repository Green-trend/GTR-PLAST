// ==================== DATOS DE CADA MATERIAL ====================
const materialsData = [
  {
    virgin: { title: "Resina virgen", desc: "Pureza > Alta", specs: ["<strong>Densidad:</strong> 0.9 g/cm³","<strong>MFI:</strong> 3.00 g/10 min"] },
    slides: [
      "assets/img/ppnatural1.jpeg",
      "assets/img/ppnatural2.jpeg",
      "assets/img/ppnatural3.jpg"
    ]
  },
  {
    virgin: { title: "♻️ Molido", desc: "Recuperado post-industrial.", specs: ["<strong>Densidad:</strong> 0.900 g/cm³  Valor estandar","<strong>Diponible:</strong> 1 Ton. 600 kg"] },
    slides: [
      "assets/img/hdpe1.jpeg",
      "assets/img/hdpe2.jpeg",
      "assets/img/hdpe3.jpeg"
    ]
  },
  {
    virgin: { title: "⚡  Plástico de ingeniería", desc: "Rigidez estructural extrema, excelente estabilidad dimensional ante la humedad y una alta resistencia térmica.", specs: ["<strong>Densidad:</strong> 1.50 g/cm³ Valor estandar","<strong>Disponibilidad:</strong> 5 Ton. 800 kg"] },
    slides: [
      "assets/img/pcfv1.jpeg",
      "assets/img/pcfv2.jpeg",
      "assets/img/pcfv3.jpeg"
    ]
  },
  {
    virgin: { title: "♻️ Material termoplástico", desc: "Recuperado post-industrial.", specs: ["<strong>Densidad:</strong> 1.04 g/cm³ Valor estandar","<strong>Disponibilidad:</strong> 3 Ton. 350 kg"] },
    slides: [
      "assets/img/absgris1.jpeg",
      "assets/img/absgris2.jpeg",
      "assets/img/absgris3.jpeg"
    ]
  },
  {
    virgin: { title: "♻️ Resina virgen", desc: "Facil procesamiento.", specs: ["<strong>Densidad:</strong> 1.04 g/cm³","<strong>Disponibilidad:</strong> 15 Ton. 870 kg"] },
    slides: [
      "assets/img/gppsazul.jpeg",
      "assets/img/gppsazul2.jpeg",
      "assets/img/gppsazul3.jpeg"
    ]
  },
  {
    virgin: { title: "♻️ PP molido", desc: "Recuperado Post industrial.", specs: ["<strong>MFI: 8g/10 min</strong> variable","<strong>Disponibilidad: 1 Ton 300 kg"] },
    slides: [
      "assets/img/ppbco1.jpeg",
      "assets/img/ppbco2.jpeg",
      "assets/img/ppbco3.jpeg"
    ]
  }
];

// ==================== GENERAR TABLA DE MATERIALES ====================
function populateMaterialsTable() {
  const tbody = document.querySelector('#materialsTable tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  const materialNames = [
    'PP Natural Virgen',
    'HDPE Post-industrial Molido',
    'PET con fibra de vidrio',
    'ABS Post-industrial Molido',
    'GPPS Cristal azul',
    'PP Post-industrial Molido'
  ];

  const materialTypes = [
    'Virgen',
    'Molido',
    'Virgen',
    'Molido',
    'Virgen',
    'Molido'
  ];

  const pdfUrls = [
    'assets/fichas/fichatecnica-pp.pdf',
    'assets/fichas/ficha_homopolimero.pdf',
    'assets/fichas/ficha_alto_impacto.pdf',
    'assets/fichas/ficha_talco.pdf',
    'assets/fichas/ficha_reciclado_pcr.pdf',
    'assets/fichas/ficha_epp.pdf'
  ];

  for (let i = 0; i < materialsData.length; i++) {
    const data = materialsData[i];
    const info = data.virgin;
    const firstImage = data.slides && data.slides.length > 0 ? data.slides[0] : 'assets/img/placeholder.jpg';

    const row = document.createElement('tr');
    row.setAttribute('data-animate', '');

    // Nombre
    const tdName = document.createElement('td');
    tdName.setAttribute('data-label', 'Material');
    tdName.textContent = materialNames[i];
    row.appendChild(tdName);

    // Tipo
    const tdType = document.createElement('td');
    tdType.setAttribute('data-label', 'Tipo');
    tdType.textContent = materialTypes[i];
    row.appendChild(tdType);

    // Descripción
    const tdDesc = document.createElement('td');
    tdDesc.setAttribute('data-label', 'Descripción');
    tdDesc.innerHTML = `<strong>${info.title}</strong><br>${info.desc}`;
    row.appendChild(tdDesc);

    // Especificaciones
    const tdSpecs = document.createElement('td');
    tdSpecs.setAttribute('data-label', 'Especificaciones');
    const ul = document.createElement('ul');
    info.specs.forEach(spec => {
      const li = document.createElement('li');
      li.innerHTML = spec;
      ul.appendChild(li);
    });
    tdSpecs.appendChild(ul);
    row.appendChild(tdSpecs);

    // Imagen miniatura (abre el lightbox)
    const tdImg = document.createElement('td');
    tdImg.setAttribute('data-label', 'Imagen');
    const img = document.createElement('img');
    img.src = firstImage;
    img.alt = materialNames[i];
    img.className = 'material-thumb';
    img.loading = 'lazy';
    img.setAttribute('data-material-index', i);
    img.addEventListener('click', function() {
      openImageModal(i);
    });
    tdImg.appendChild(img);
    row.appendChild(tdImg);

    // Acciones
    const tdActions = document.createElement('td');
    tdActions.setAttribute('data-label', 'Acciones');
    tdActions.className = 'table-actions';

    const btnCotizar = document.createElement('button');
    btnCotizar.className = 'btn-table primary';
    btnCotizar.textContent = '📦 Cotizar';
    btnCotizar.addEventListener('click', () => {
      const cotizacionModal = document.getElementById('cotizacionModal');
      const materialSelect = document.querySelector('#cotizacionForm select[name="material"]');
      if (cotizacionModal && materialSelect) {
        materialSelect.value = materialNames[i];
        cotizacionModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });

    const btnFicha = document.createElement('button');
    btnFicha.className = 'btn-table';
    btnFicha.textContent = '📄 Ficha técnica';
    btnFicha.addEventListener('click', () => {
      const url = pdfUrls[i] || '';
      if (url) window.open(url, '_blank');
      else alert('📄 Ficha técnica no disponible aún.');
    });

    tdActions.appendChild(btnCotizar);
    tdActions.appendChild(btnFicha);
    row.appendChild(tdActions);

    tbody.appendChild(row);
  }
}

// ==================== LIGHTBOX PARA IMÁGENES ====================
let currentMaterialIndex = 0;
let currentSlideIndex = 0;

const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const prevBtn = document.getElementById('prevImage');
const nextBtn = document.getElementById('nextImage');
const closeBtn = document.getElementById('closeImageModal');
const imageCounter = document.getElementById('imageCounter');

function openImageModal(materialIndex, slideIndex = 0) {
  const material = materialsData[materialIndex];
  if (!material || !material.slides || material.slides.length === 0) return;

  currentMaterialIndex = materialIndex;
  currentSlideIndex = slideIndex;

  updateModalImage();
  imageModal.style.display = 'flex';
}

function updateModalImage() {
  const material = materialsData[currentMaterialIndex];
  const totalSlides = material.slides.length;

  modalImage.src = material.slides[currentSlideIndex];
  imageCounter.textContent = `${currentSlideIndex + 1} / ${totalSlides}`;

  prevBtn.style.visibility = (currentSlideIndex === 0) ? 'hidden' : 'visible';
  nextBtn.style.visibility = (currentSlideIndex === totalSlides - 1) ? 'hidden' : 'visible';
}

function closeImageModal() {
  imageModal.style.display = 'none';
}

prevBtn.addEventListener('click', () => {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    updateModalImage();
  }
});

nextBtn.addEventListener('click', () => {
  const totalSlides = materialsData[currentMaterialIndex].slides.length;
  if (currentSlideIndex < totalSlides - 1) {
    currentSlideIndex++;
    updateModalImage();
  }
});

closeBtn.addEventListener('click', closeImageModal);

imageModal.addEventListener('click', (e) => {
  if (e.target === imageModal) {
    closeImageModal();
  }
});

// Navegación con teclado
document.addEventListener('keydown', (e) => {
  if (imageModal.style.display === 'flex') {
    if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn.click();
    } else if (e.key === 'Escape') {
      closeImageModal();
    }
  }
});

// ==================== GALERÍA CARRUSEL AUTOMÁTICO ====================
function initGaleria() {
  const track = document.getElementById('galeriaTrack');
  const dotsContainer = document.getElementById('galeriaDots');
  const prevBtn = document.getElementById('prevGaleria');
  const nextBtn = document.getElementById('nextGaleria');
  
  if (!track || !dotsContainer) return;

  const slides = track.querySelectorAll('.galeria-slide');
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoSlideInterval;

  // Crear indicadores (dots)
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'galeria-dot' + (index === 0 ? ' active' : '');
    dot.dataset.index = index;
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.galeria-dot');

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    
    currentIndex = index;
    
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = 'translateX(-' + (currentIndex * slideWidth) + 'px)';
    
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }

  function resetAutoSlide() {
    startAutoSlide();
  }

  function recalculateSlide() {
    goToSlide(currentIndex);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      prevSlide();
      resetAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      nextSlide();
      resetAutoSlide();
    });
  }

  var carousel = document.querySelector('.galeria-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
    carousel.addEventListener('touchstart', stopAutoSlide, { passive: true });
    carousel.addEventListener('touchend', startAutoSlide, { passive: true });
  }

  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(recalculateSlide, 200);
  });

  startAutoSlide();

  return { 
    goToSlide: goToSlide, 
    nextSlide: nextSlide, 
    prevSlide: prevSlide, 
    startAutoSlide: startAutoSlide, 
    stopAutoSlide: stopAutoSlide 
  };
}

// ==================== CAMBIO DE TEMA (CORREGIDO) ====================
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const themeIcons = document.querySelectorAll('.theme-icon');

  function setTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      themeIcons.forEach(icon => icon.textContent = '☀️');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-theme');
      themeIcons.forEach(icon => icon.textContent = '🌙');
      localStorage.setItem('theme', 'dark');
    }
  }

  // Cargar tema guardado o por defecto (oscuro)
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  // Asignar eventos a todos los botones de tema
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault(); // Por si acaso
      const isLight = document.body.classList.contains('light-theme');
      setTheme(isLight ? 'dark' : 'light');
    });
  });
}

// ==================== INICIALIZACIÓN GENERAL (UNIFICADA) ====================
document.addEventListener('DOMContentLoaded', function() {
  // 1. Inicializar tema (primero, para que todo lo demás herede el tema)
  initTheme();

  // 2. Generar tabla de materiales
  populateMaterialsTable();

  // 3. Menú hamburguesa
  const menuIcon = document.getElementById('menuIcon');
  const navLinks = document.getElementById('navLinks');
  if (menuIcon) {
    menuIcon.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }

  // 4. Botón volver arriba
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backBtn.classList.add('show');
      } else {
        backBtn.classList.remove('show');
      }
    });
    backBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Carrusel de testimonios
  const track = document.getElementById('testimonialTrack');
  const prevTesti = document.querySelector('.prev-testi');
  const nextTesti = document.querySelector('.next-testi');
  if (track && prevTesti && nextTesti) {
    let testiIndex = 0;
    const totalTesti = track.children.length;
    function updateTesti() {
      track.style.transform = 'translateX(-' + (testiIndex * 100) + '%)';
    }
    nextTesti.addEventListener('click', function() {
      if (testiIndex < totalTesti - 1) testiIndex++;
      updateTesti();
    });
    prevTesti.addEventListener('click', function() {
      if (testiIndex > 0) testiIndex--;
      updateTesti();
    });
  }

  // 6. FAQ acordeón
  document.querySelectorAll('.faq-question').forEach(function(q) {
    q.addEventListener('click', function() {
      var parent = this.parentElement;
      parent.classList.toggle('active');
    });
  });

  // 7. Cookie banner
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptCookies = document.getElementById('acceptCookies');
  if (cookieBanner && acceptCookies) {
    if (!localStorage.getItem('cookiesAccepted')) {
      cookieBanner.style.display = 'flex';
    }
    acceptCookies.addEventListener('click', function() {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieBanner.style.display = 'none';
    });
  }

  // 8. Modal de cotización (eventos ya están en el HTML, pero reforzamos)
  const cotizacionModal = document.getElementById('cotizacionModal');
  const closeCotizacionModal = document.getElementById('closeCotizacionModal');
  const cotizacionForm = document.getElementById('cotizacionForm');
  const cotizacionFormStatus = document.getElementById('cotizacion-form-status');

  if (closeCotizacionModal) {
    closeCotizacionModal.addEventListener('click', function() {
      if (cotizacionModal) {
        cotizacionModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  if (cotizacionModal) {
    cotizacionModal.addEventListener('click', function(e) {
      if (e.target === cotizacionModal) {
        cotizacionModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  if (cotizacionForm) {
    cotizacionForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const data = new FormData(cotizacionForm);
      try {
        const response = await fetch(cotizacionForm.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          cotizacionFormStatus.innerHTML = '✅ Cotización enviada. Te contactaremos pronto.';
          cotizacionFormStatus.style.color = '#2DCC8A';
          cotizacionForm.reset();
          setTimeout(function() {
            if (cotizacionModal) cotizacionModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            cotizacionFormStatus.innerHTML = '';
          }, 2000);
        } else {
          cotizacionFormStatus.innerHTML = '❌ Error al enviar. Intenta de nuevo.';
          cotizacionFormStatus.style.color = '#FF8A8A';
        }
      } catch (error) {
        cotizacionFormStatus.innerHTML = '❌ Error de conexión. Verifica tu internet.';
        cotizacionFormStatus.style.color = '#FF8A8A';
      }
    });
  }

  // 9. Formulario de contacto
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const data = new FormData(form);
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (response.ok) {
          status.innerHTML = '✅ Mensaje enviado. Te contactaremos pronto.';
          status.style.color = '#2DCC8A';
          form.reset();
        } else {
          status.innerHTML = '❌ Error al enviar. Intenta de nuevo.';
          status.style.color = '#FF8A8A';
        }
      } catch (error) {
        status.innerHTML = '❌ Error de conexión. Verifica tu internet.';
        status.style.color = '#FF8A8A';
      }
    });
  }

  // 10. Scroll reveal
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        const el = entry.target;

        if (el.hasAttribute('data-animate')) {
          el.classList.add('scroll-animate');
        }

        const specificSelectors = [
          '.hero-content',
          '.section-title',
          '.hdpe-promo-section',
          '.hdpe-container',
          '.corporate-card',
          '.pdf-download-section',
          '.testimonial-card',
          '.faq-item',
          '.origen-header',
          '.origen-benefits',
          '.benefit-item',
          '.contact-form-section'
        ];

        specificSelectors.forEach(function(sel) {
          if (el.matches(sel)) {
            el.classList.add('scroll-animate');
          }
        });

        if (el.classList.contains('origen-card')) {
          el.classList.add('card-visible');
          setTimeout(function() {
            el.classList.add('steps-visible');
          }, 300);
        }

        revealObserver.unobserve(el);
      }
    });
  }, observerOptions);

  const elementsToReveal = document.querySelectorAll(`
    [data-animate],
    .hero-content,
    .section-title,
    .hdpe-promo-section,
    .hdpe-container,
    .corporate-card,
    .pdf-download-section,
    .testimonial-card,
    .faq-item,
    .origen-header,
    .origen-card,
    .origen-benefits,
    .benefit-item,
    .contact-form-section
  `);

  elementsToReveal.forEach(function(el) {
    revealObserver.observe(el);
  });

  // 11. Scroll suave para enlaces de navegación
  var navLinksItems = document.querySelectorAll('.nav-links a');
  navLinksItems.forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          if (navLinks) navLinks.classList.remove('active');
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 12. Inicializar galería (después de todo)
  setTimeout(function() {
    initGaleria();
  }, 100);
});