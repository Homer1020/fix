const pageSearch = document.getElementById('page-search');
const btnPageSearch = document.getElementById('btn-page-search');

// Overlay Global
const globalOverlay = generateOverlay({
  onClose: () => { pageSearch.parentElement.classList.remove('overlay__target'); },
  btnToClose: true
});

function generateOverlay({
  closeOnClick = true,
  onClose = false,
  btnToClose = false
}) {
  // Generamos el div del overlay
  const overlay = document.createElement('div');
  overlay.innerHTML = `<div class="overlay__content"></div>`;

  // Añadimos las clases
  overlay.classList.add('overlay');

  // Configuración extra
  if(btnToClose) {
    const btnClose = document.createElement('button');
    btnClose.classList.add('btn-icon', 'overlay__close');
    btnClose.innerHTML = `
      <i class="fa fa-times"></i>
    `;

    btnClose.addEventListener('click', () => { overlay.classList.add('hidden'); });

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
        overlay.classList.add('hidden');
      }
    });
  }

  // Retornamos el overlay
  return overlay;
}

function overlaySearch(e) {
  // Comprobamos que no halla overlay
  if(!document.querySelector('.overlay')) {
    // Insertamos el overlay Global en el documento
    document.body.appendChild(globalOverlay);

    // Añadimos la clase para que se active el elemento
    pageSearch.parentElement.classList.add('overlay__target');
  }
}

function overlaySearchMobile(e) {
  // Comprobamos que no halla overlay
  if(!document.querySelector('.overlay')) {
    // Añadimos page Search a overlay Mobil
    globalOverlay.querySelector('.overlay__content').appendChild(pageSearch.parentElement);

    // Insertamos el overlay Global en el documento
    document.body.appendChild(globalOverlay);
  }
}

if(pageSearch) {

  if(matchMedia('(min-width: 768px)').matches) {
    pageSearch.addEventListener('click', overlaySearch);
  }else {
    btnPageSearch.addEventListener('click', overlaySearchMobile);
  }

}