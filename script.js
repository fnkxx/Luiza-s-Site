// ---- CONTADOR AO VIVO ----
// DATA_INICIO: ajuste aqui se precisar (formato ANO-MES-DIA)
const DATA_INICIO = new Date('2026-06-08T00:00:00');

const elDias  = document.getElementById('c-dias');
const elHoras = document.getElementById('c-horas');
const elMin   = document.getElementById('c-min');
const elSeg   = document.getElementById('c-seg');

function pad(n){ return n.toString().padStart(2,'0'); }

function tick(){
  const now = new Date();
  let diff = Math.max(0, now - DATA_INICIO);

  const dias  = Math.floor(diff / (1000*60*60*24));
  diff -= dias * (1000*60*60*24);
  const horas = Math.floor(diff / (1000*60*60));
  diff -= horas * (1000*60*60);
  const min   = Math.floor(diff / (1000*60));
  diff -= min * (1000*60);
  const seg   = Math.floor(diff / 1000);

  elDias.textContent  = dias;
  elHoras.textContent = pad(horas);
  elMin.textContent   = pad(min);
  elSeg.textContent   = pad(seg);
}

tick();
setInterval(tick, 1000);

// ---- BOTAO BRINCALHAO: o "Nao" foge do mouse ----
const btnNao = document.getElementById('btn-nao');
const btnSim = document.getElementById('btn-sim');
const funArea = document.getElementById('fun-buttons');
const funResult = document.getElementById('fun-result');
let fugidas = 0;

function moverBotaoNao(){
  const areaRect = funArea.getBoundingClientRect();
  const btnRect = btnNao.getBoundingClientRect();

  const maxX = areaRect.width - btnRect.width;
  const maxY = areaRect.height - btnRect.height;

  const novoX = Math.max(0, Math.random() * maxX);
  const novoY = Math.max(0, (Math.random() * maxY) - (maxY/2));

  btnNao.style.position = 'absolute';
  btnNao.style.left = novoX + 'px';
  btnNao.style.top = novoY + 'px';

  fugidas++;
  if(fugidas === 1){
    funResult.textContent = 'ele foge mesmo :)';
  } else if(fugidas > 5){
    funResult.textContent = 'desiste, so tem um botao que funciona aqui';
  }
}

// Foge ao passar o mouse (desktop) e ao tocar (mobile, antes do click)
btnNao.addEventListener('mouseenter', moverBotaoNao);
btnNao.addEventListener('touchstart', function(e){
  e.preventDefault();
  moverBotaoNao();
}, { passive:false });

btnSim.addEventListener('click', function(){
  funResult.textContent = 'eu sabia! 🌸';
  btnNao.style.transition = 'opacity 0.4s ease';
  btnNao.style.opacity = '0';
  setTimeout(() => { btnNao.style.display = 'none'; }, 400);
});