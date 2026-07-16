// ===== Nav scroll state =====
const nav = document.getElementById('nav');
const totop = document.getElementById('totop');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
  totop.classList.toggle('show', window.scrollY > 600);
});

// ===== Animated diagonal roof panels in hero bg =====
const roofPanels = document.getElementById('roofPanels');
const panelCount = 14;
for(let i = 0; i < panelCount; i++){
  const p = document.createElement('div');
  p.className = 'panel';
  const top = (i / panelCount) * 120 - 10;
  p.style.top = top + '%';
  p.style.left = '-5%';
  p.style.width = (60 + Math.random() * 40) + '%';
  p.style.transform = 'rotate(-18deg)';
  p.style.animationDelay = (i * 0.06) + 's';
  roofPanels.appendChild(p);
}

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// ===== KPI count-up =====
const kpis = [
  { el: 'kpi1', bar: 'bar1', target: 150 },
  { el: 'kpi2', bar: 'bar2', target: 80000 },
  { el: 'kpi3', bar: 'bar3', target: 2.5, decimals: 1 }
];
let kpiDone = false;
const kpiSection = document.querySelector('.why-visual');
const kpiIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting && !kpiDone){
      kpiDone = true;
      kpis.forEach(k => {
        const elNum = document.getElementById(k.el);
        const elBar = document.getElementById(k.bar);
        const duration = 1400;
        const startTime = performance.now();
        function tick(now){
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const val = k.target * eased;
          elNum.textContent = k.decimals
            ? val.toFixed(k.decimals)
            : Math.round(val).toLocaleString('es-HN');
          if(progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        elBar.style.width = '100%';
      });
    }
  });
}, { threshold: 0.4 });
kpiIO.observe(kpiSection);

// ===== Formulario: envía los datos por WhatsApp =====
// Este sitio no tiene servidor ni base de datos propia.
// Los datos del formulario solo existen en el navegador.
// Al enviar, se arma un mensaje y se redirige a WhatsApp.
function handleSubmit(e){
  e.preventDefault();
  const nombre   = document.getElementById('fName').value.trim();
  const telefono = document.getElementById('fPhone').value.trim();
  const servicio = document.getElementById('fService').value;
  const mensaje  = document.getElementById('fMessage').value.trim();

  const texto =
    `Solicitud de cotización — Servicon Honduras%0A` +
    `Nombre: ${nombre}%0A` +
    `Teléfono: ${telefono}%0A` +
    `Servicio: ${servicio}%0A` +
    (mensaje ? `Detalle del proyecto: ${mensaje}%0A` : '');

  window.open(`https://wa.me/50488158801?text=${texto}`, '_blank');
  document.getElementById('quoteForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
  return false;
}

// ===== Modal fichas técnicas =====
const serviceData = {
  s01:{
    num:'01 / CUBIERTAS', title:'Cubiertas trapezoidales',
    desc:'Lámina aluminizada de alta resistencia estructural Grado 80, instalada según la necesidad de cada cliente. Se fabrica bajo Norma ASTM A792 para mayor frescura y duración del techo.',
    specs:['Resistencia estructural Grado 80','Base AZM150 (recubrimiento de aluminio y zinc)','Calibre C24, C25 y C26','Fabricada bajo Norma ASTM A792'],
    adv:['Mayor frescura y duración frente a láminas convencionales','Se adapta a la necesidad específica de cada proyecto','Respaldada por el sistema de garantía integral de Servicon']
  },
  s02:{
    num:'02 / SISTEM', title:'Cubiertas Standing Seam',
    desc:'Instalación de techos con sistema Standing Seam para la industria de la construcción hondureña, bajo altos estándares de calidad, sin goteras ni perforaciones en la cubierta.',
    specs:['Sistema de unión Standing Seam','Instalación bajo altos estándares de calidad'],
    adv:['Sin goteras','Sin perforaciones en la cubierta','Elimina los puntos de filtración típicos de los techos atornillados']
  },
  s03:{
    num:'03 / SS640', title:'Cubiertas continuas',
    desc:'Instalación de láminas SS640 fabricadas a la medida exacta de cada agua del techo, unidas con clips de fijación oculta. La cubierta nunca se perfora durante la instalación.',
    specs:['Lámina SS640 cortada a la medida de las aguas','Clips de fijación oculta (sin tornillos expuestos en la superficie)','Vano máximo entre apoyos: 2,5 m'],
    adv:['Sistema hermético garantizado contra filtraciones','Cero perforaciones en toda la cubierta','Un solo equipo responsable de la instalación de inicio a fin']
  },
  s04:{
    num:'04 / SSP', title:'Cubiertas aisladas',
    desc:'Panel compuesto por dos láminas SS640 con un núcleo aislante térmico y acústico en el centro, sin perforaciones en la superficie.',
    specs:['Dos láminas SS640, una en cada cara del panel','Núcleo aislante a elegir: poliestireno, lana mineral o fibra de vidrio','Sin perforaciones en superficie'],
    adv:['Aislamiento térmico y acústico en un mismo sistema','Mantiene el estándar hermético de la línea SS640','Ideal para naves industriales o techos con requerimiento de confort acústico/térmico']
  },
  s05:{
    num:'05 / IMPERMEABILIZACIÓN', title:'Encapsulado e impermeabilización',
    desc:'Tratamiento aplicado sobre lámina galvanizada, losas de concreto y acabados esmaltados, diseñado para detener filtraciones, hongos y deterioro estructural antes de que empiecen.',
    specs:['Aplicable sobre lámina galvanizada','Aplicable sobre losas de concreto','Aplicable sobre acabados esmaltados'],
    adv:['Detiene filtraciones activas','Previene la aparición de hongos','Previene el deterioro estructural de forma preventiva']
  },
  s06:{
    num:'06 / SEGURIDAD', title:'Acceso vertical semi certificado',
    desc:'Escalera semi certificada con peldaños antideslizantes y diseño ergonómico, pensada para el acceso seguro a la cubierta durante la instalación y el mantenimiento.',
    specs:['Cada peldaño soporta hasta 2000 lb','Peldaños antideslizantes','Diseño ergonómico','Argollas de sujeción para anclaje'],
    adv:['Mayor seguridad al acceder a la cubierta','Mejor anclaje tanto para nuestro equipo como para el suyo','Parte del sistema de seguridad certificada en obra de Servicon']
  },
  s07:{
    num:'07 / ACABADOS', title:'Pintura profesional',
    desc:'Preparación experta de superficies, aplicación de pinturas antihumedad e impermeabilizantes, y asesoría de color para interiores, exteriores, naves industriales o vivienda.',
    specs:['Preparación experta de la superficie previa','Pinturas antihumedad','Pinturas impermeabilizantes','Asesoría de color incluida'],
    adv:['Aplicable en interiores, exteriores, naves industriales o vivienda','Protección adicional contra la humedad','Acabado asesorado por el equipo técnico']
  }
};

const serviceModal = document.getElementById('serviceModal');
let lastFocusedEl = null;

function openServiceModal(id){
  const d = serviceData[id];
  if(!d) return;
  document.getElementById('modalNum').textContent   = d.num;
  document.getElementById('modalTitle').textContent = d.title;
  document.getElementById('modalDesc').textContent  = d.desc;
  document.getElementById('modalSpecs').innerHTML   = d.specs.map(s => `<li>${s}</li>`).join('');
  document.getElementById('modalAdv').innerHTML     = d.adv.map(s => `<li>${s}</li>`).join('');
  lastFocusedEl = document.activeElement;
  serviceModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  serviceModal.querySelector('.modal-close').focus();
}

function closeServiceModal(){
  serviceModal.classList.remove('open');
  document.body.style.overflow = '';
  if(lastFocusedEl) lastFocusedEl.focus();
}

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && serviceModal.classList.contains('open')) closeServiceModal();
});

// ===== Menú móvil =====
const mobileStyle = document.createElement('style');
mobileStyle.innerHTML = `
@media (max-width:980px){
  .nav-links.mobile-open{
    display:flex;flex-direction:column;position:fixed;top:68px;left:0;right:0;
    background:rgba(10,9,8,0.98);padding:24px 32px;gap:20px;
    border-bottom:1px solid rgba(245,180,0,0.15);
  }
}`;
document.head.appendChild(mobileStyle);
