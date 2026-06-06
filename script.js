// ==================== DATOS DE CADA MATERIAL (con múltiples slides) ====================
const materialsData = [
  { // Índice 0: PP Copolímero Eco+ (ya tenía 4 slides)
    virgin: { title: "Resina virgen", desc: "Pureza > Alta", specs: ["<strong>Densidad:</strong> 0.9 g/cm³","<strong>MFI:</strong> 3.00 g/10 min"] },
    slides: [
      "assets/img/ppnatural1.jpeg",
      "assets/img/ppnatural2.jpeg",
      "assets/img/ppnatural3.jpg"
    ]
  },
  { // Material 1 (índice 1): Homopolímero - ahora con 4 slides
    virgin: { title: "♻️ Molido", desc: "Recuperado post-industrial.", specs: ["<strong>Densidad:</strong> 0.900 g/cm³  Valor estandar","<strong>Diponible:</strong> 1 Ton. 600 kg"] },
    slides: [
      "assets/img/hdpe1.jpeg",
      "assets/img/hdpe2.jpeg",
      "assets/img/hdpe3.jpeg"
    ]
  },
  { // Material 2: Alto Impacto - 4 slides
    virgin: { title: "⚡  Plástico de ingeniería", desc: "Rigidez estructural extrema, excelente estabilidad dimensional ante la humedad y una alta resistencia térmica.", specs: ["<strong>Densidad:</strong> 1.50 g/cm³ Valor estandar","<strong>Disponibilidad:</strong> 5 Ton. 800 kg"] },
    slides: [
      "assets/img/pcfv1.jpeg",
      "assets/img/pcfv2.jpeg",
      "assets/img/pcfv3.jpeg"
    ]
  },
  { // Material 3: Talco - 4 slides
    virgin: { title: "♻️ Material termoplástico", desc: "Recuperado post-industrial.", specs: ["<strong>Densidad:</strong> 1.04 g/cm³ Valor estandar","<strong>Disponibilidad:</strong> 3 Ton. 350 kg"] },
    slides: [
      "assets/img/absgris1.jpeg",
      "assets/img/absgris2.jpeg",
      "assets/img/absgris3.jpeg"
    ]
  },
  { // Material 4: Reciclado PCR - 4 slides
    virgin: { title: "♻️ Resina virgen", desc: "Facil procesamiento.", specs: ["<strong>Densidad:</strong> 1.04 g/cm³","<strong>Disponibilidad:</strong> 15 Ton. 870 kg"] },
    slides: [
      "assets/img/gppsazul.jpeg",
      "assets/img/gppsazul2.jpeg",
      "assets/img/gppsazul3.jpeg"
    ]
  },
  { // Material 5: Expandido EPP - 4 slides
    virgin: { title: "♻️ PP molido", desc: "Recuperado Post industrial.", specs: ["<strong>MFI: 8g/10 min</strong> variable","<strong>Disponibilidad: 1 Ton 300 kg"] },
    slides: [
      "assets/img/ppbco1.jpeg",
      "assets/img/ppbco2.jpeg",
      "assets/img/ppbco3.jpeg"
    ]
  }
];

// Función para actualizar la información de la resina (virgen/molido)
function updateResinInfo(idx, type, data) {
  const info = type === 'virgin' ? data.virgin : data.recycled;
  const descDiv = document.getElementById(`resinDesc-${idx}`);
  const specList = document.getElementById(`specList-${idx}`);
  if (descDiv) descDiv.innerHTML = `<span class="resin-title">${info.title}</span><p>${info.desc}</p>`;
  if (specList) specList.innerHTML = info.specs.map(spec => `<li>${spec}</li>`).join('');
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
  // 1. Configurar especificaciones y switch de cada material
  for (let i = 0; i < materialsData.length; i++) {
    const data = materialsData[i];
    updateResinInfo(i, 'virgin', data);
    
    // Botones de cambio de resina
    const resinBtns = document.querySelectorAll(`.resin-switch[data-mat="${i}"] .resin-option`);
    resinBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-resin');
        resinBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updateResinInfo(i, type, data);
      });
    });
    
    // Configurar carrusel de imágenes
    const container = document.querySelector(`.slider-container[data-mat="${i}"]`);
    if (container && data.slides && data.slides.length) {
      const img = container.querySelector('.slide-img');
      const prevBtn = container.querySelector('.prev');
      const nextBtn = container.querySelector('.next');
      const dotsDiv = container.querySelector('.dots');
      let current = 0;
      const slidesArray = data.slides;
      const totalSlides = slidesArray.length;
      
      // Si solo hay una diapositiva, ocultar botones y dots
      if (totalSlides === 1) {
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        if (dotsDiv) dotsDiv.style.display = 'none';
      } else {
        if (prevBtn) prevBtn.style.display = 'flex';
        if (nextBtn) nextBtn.style.display = 'flex';
        if (dotsDiv) dotsDiv.style.display = 'flex';
      }
      
      function updateCarousel() {
        img.src = slidesArray[current];
        updateDots();
      }
      function updateDots() {
        const dots = dotsDiv.querySelectorAll('.dot');
        dots.forEach((dot, idx) => dot.classList.toggle('active-dot', idx === current));
      }
      function createDots() {
        dotsDiv.innerHTML = '';
        slidesArray.forEach((_, idx) => {
          const dot = document.createElement('div');
          dot.classList.add('dot');
          if (idx === current) dot.classList.add('active-dot');
          dot.addEventListener('click', () => {
            current = idx;
            updateCarousel();
          });
          dotsDiv.appendChild(dot);
        });
      }
      createDots();
      updateCarousel();
      if (prevBtn) prevBtn.addEventListener('click', () => {
        current = (current - 1 + totalSlides) % totalSlides;
        updateCarousel();
      });
      if (nextBtn) nextBtn.addEventListener('click', () => {
        current = (current + 1) % totalSlides;
        updateCarousel();
      });
    }
    
    // Botón de cotización
    const cta = document.querySelector(`.cta[data-mat="${i}"]`);
    if (cta) {
      cta.addEventListener('click', () => alert(`✅ Cotización solicitada para material ${i+1}. Te contactaremos pronto.`));
    }
  }
  
  // Botones de descarga de ficha técnica
  document.querySelectorAll('.btn-download').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pdfUrl = btn.getAttribute('data-pdf');
      if (pdfUrl && pdfUrl !== '') window.open(pdfUrl, '_blank');
      else alert('📄 Ficha técnica no disponible aún. Contacta a ventas.');
    });
  });
  
  // Menú hamburguesa
  const menuIcon = document.getElementById('menuIcon');
  const navLinks = document.getElementById('navLinks');
  if (menuIcon) menuIcon.addEventListener('click', () => navLinks.classList.toggle('active'));
  
  // Botón volver arriba
  const backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) backBtn.classList.add('show');
      else backBtn.classList.remove('show');
    });
    backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
  
  // Carrusel de testimonios
  const track = document.getElementById('testimonialTrack');
  const prevTesti = document.querySelector('.prev-testi');
  const nextTesti = document.querySelector('.next-testi');
  if (track && prevTesti && nextTesti) {
    let testiIndex = 0;
    const totalTesti = track.children.length;
    const updateTesti = () => track.style.transform = `translateX(-${testiIndex * 100}%)`;
    nextTesti.addEventListener('click', () => {
      if (testiIndex < totalTesti - 1) testiIndex++;
      updateTesti();
    });
    prevTesti.addEventListener('click', () => {
      if (testiIndex > 0) testiIndex--;
      updateTesti();
    });
  }
  
  // FAQ acordeón
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const parent = q.parentElement;
      parent.classList.toggle('active');
    });
  });
  
  // Cookie banner
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptCookies = document.getElementById('acceptCookies');
  if (cookieBanner && acceptCookies) {
    if (!localStorage.getItem('cookiesAccepted')) cookieBanner.style.display = 'flex';
    acceptCookies.addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieBanner.style.display = 'none';
    });
  }
  
  // Formspree
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const data = new FormData(form);
      try {
        const response = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
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
  // ========== ANIMACIÓN AL HACER SCROLL (Intersection Observer) ==========
// Selecciona todos los elementos que quieres animar
const elementosAAminar = document.querySelectorAll(
  '.hero, .navbar,.material-card, .corporate-card, .testimonial-card, .faq-item, .contact-form-section, .legal-center'
);

// Crea el observer
const observerAnimacion = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Añade la clase de animación
      entry.target.classList.add('scroll-animate');
      // Deja de observar el elemento (solo se anima una vez)
      observerAnimacion.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,    // cuando el 10% del elemento sea visible
  rootMargin: '0px 0px -10px 0px' // pequeño margen para activar un poco antes
});

// Observa cada elemento
elementosAAminar.forEach(el => observerAnimacion.observe(el));
});