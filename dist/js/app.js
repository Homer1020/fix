// Variables globales para ek buscador
const pageSearch = document.getElementById('page-search');
const btnPageSearch = document.getElementById('btn-page-search');
const siteHeader = document.querySelector('.site-header');
const siteHeaderHeight = siteHeader.getBoundingClientRect().height

function generateOverlay({
  closeOnClick = true,
  onClose = false,
  btnToClose = false,
  onInitClose = false,
  bg = false,
  btnToCloseExtraClasses = []
}) {
  // Generamos el div del overlay
  const overlay = document.createElement('div');
  overlay.innerHTML = `<div class="overlay__content"></div>`;

  // Añadimos las clases
  overlay.classList.add('overlay');

  // Funcion cerrar el overlay
  function closeOverlay() {
    overlay.classList.add('hidden');
    if(onInitClose) {
      onInitClose();
    }
  }

  // Configuración extra
  if(bg) {
    overlay.style.backgroundColor = bg;
  }

  if(btnToClose) {
    const btnClose = document.createElement('button');
    btnClose.classList.add('btn-icon', 'overlay__close', ...btnToCloseExtraClasses);
    btnClose.innerHTML = `
      <i class="fa fa-times"></i>
    `;

    btnClose.addEventListener('click', closeOverlay);

    // Insertamos en la tercera columna del grid
    overlay.appendChild(btnClose);
  }

  // Control de renderizado con animaciones
  overlay.addEventListener('animationend', e => {
    if(e.animationName == 'overlayHidden') {
      overlay.remove();
      overlay.className = 'overlay';
      if(onClose) onClose();
    }
  });

  // Si queremos que se cierre al dar click fuera del elemento activo
  if(closeOnClick) {
    overlay.addEventListener('click', e => {
      if(e.target.classList.contains('overlay')) {
        closeOverlay();
      }
    });
  }

  // Retornamos el overlay
  return overlay;
}

// Search Global
const globalOverlay = generateOverlay({
  onClose: () => {
    if(pageSearch) {
      pageSearch.parentElement.classList.remove('overlay__target');
    }
  },
  onInitClose: () => {
    document.body.style.overflow = '';
    // if(siteHeader) { setSticky() }
    siteHeader.querySelector('.site-header__search').appendChild(pageSearch.parentElement);
    document.body.style.overflow = '';
  },
  btnToClose: true
});

function overlaySearchMobile(e) {
  // Comprobamos que no halla overlay
  if(!document.querySelector('.overlay')) {
    // Añadimos page Search a overlay Mobil
    globalOverlay.querySelector('.overlay__content').appendChild(pageSearch.parentElement);

    // Insertamos el overlay Global en el documento
    document.body.appendChild(globalOverlay);
    document.body.style.overflow = 'hidden';
  }
}

if(pageSearch) {

  if(matchMedia('(min-width: 768px)').matches) {
    pageSearch.addEventListener('click', overlaySearchMobile);
    btnPageSearch.addEventListener('click', overlaySearchMobile);
  }

}

// Variables globales para el toggleNavigation
const btnToggleNavbar = document.getElementById('toggle-navbar');
const mainNavbar = document.getElementById('main-navbar');

// Overlay del navbar
const navbarOverlay = generateOverlay({
  onInitClose: () => {
    if(mainNavbar) {
      mainNavbar.classList.remove('show');
    }
    document.body.style.overflow = '';
    if(siteHeader) { setSticky() }
  },
  btnToClose: true,
  bg: 'rgba(34, 34, 34, .9)',
  btnToCloseExtraClasses: ['overlay__close--left']
});

function toggleNavbar(e) {
  mainNavbar.classList.add('show');
  if(mainNavbar.classList.contains('show')) {
    document.body.appendChild(navbarOverlay);
    document.body.style.overflow = 'hidden';
    if(siteHeader) { siteHeader.classList.remove('fixed') }
  }
}

if(btnToggleNavbar) {
  btnToggleNavbar.addEventListener('click', toggleNavbar);
}

// SLICK SLIDER
$(document).ready(function(){
  $('.features').slick({
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1700,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          dots: false,
          arrows: false,
          centerMode: true
        }
      },
    ],
    nextArrow: `
      <button type="button" class="btn-icon right">
        <i class="fa fa-angle-right"></i>
      </button>
    `,
    prevArrow: `
      <button type="button" class="btn-icon left">
        <i class="fa fa-angle-left"></i>
      </button>
    `
  });
});

// Sticky Header
function setSticky() {
  if(window.scrollY > siteHeaderHeight + 50) {
    siteHeader.classList.add('fixed', 'shadow');
    document.body.style.paddingTop = siteHeaderHeight + 'px';
  }else {
    siteHeader.classList.remove('fixed', 'shadow');
    document.body.style.paddingTop = '';
  }
}

setSticky();

if(siteHeader) {

  window.addEventListener('scroll', setSticky);

}