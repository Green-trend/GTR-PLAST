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
      alert(`✅ Cotización solicitada para ${materialNames[i]}. Te contactaremos pronto.`);
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

// ==================== LIGHTBOX PARA IMÁGENES (CON FLECHAS LATERALES) ====================
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

// ==================== INICIALIZACIÓN GENERAL ====================
document.addEventListener('DOMContentLoaded', () => {
  // Generar tabla de materiales
  populateMaterialsTable();

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

  // ========== ANIMACIÓN AL HACER SCROLL ==========
  const elementosAAminar = document.querySelectorAll(
    '.hero, .navbar,.material-card, .corporate-card, .testimonial-card, .faq-item, .contact-form-section, .legal-center'
  );

  const observerAnimacion = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-animate');
        observerAnimacion.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -10px 0px'
  });

  elementosAAminar.forEach(el => observerAnimacion.observe(el));
});