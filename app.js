(function () {
  'use strict';
  var CHIPS = [
    { name: 'Тарусская зелень', code: 'Хоромы · гостиная', c: '#465D3C', ink: '#F1EEE7', img: 'img/h_frame.jpg', alt: 'Зелёная стена с портретом в раме — бутик-отель «Хоромы»', href: '#horomy' },
    { name: 'Марроканский терракот', code: 'Абрау-Дюрсо · фасад', c: '#D9735A', ink: '#1D1B17', img: 'img/a_terra.jpg', alt: 'Терракотовый фасад дома в Абрау-Дюрсо', href: '#abrau' },
    { name: 'Охра', code: 'Хоромы · обложка', c: '#9C7A33', ink: '#F1EEE7', img: 'img/h_cover.jpg', alt: 'Обложка-приглашение на открытие «Хором»', href: '#horomy' },
    { name: 'Кирпич', code: 'Хоромы · афиша', c: '#893922', ink: '#F1EEE7', img: 'img/h_poster.jpg', alt: 'Афиша «10 вечных историй» о тарусских дачниках', href: '#horomy' },
    { name: 'Ночная бирюза', code: 'Хоромы · номер', c: '#1F4A4E', ink: '#F1EEE7', img: 'img/h_teal.jpg', alt: 'Номер с бирюзовой стеной', href: '#horomy' },
    { name: 'Warm Grey 2', code: 'IN-706 · Абрау-Дюрсо', c: '#CFC8BC', ink: '#1D1B17', img: 'img/a_art.jpg', alt: 'Тёплый серый фон для картины в доме в Абрау-Дюрсо', href: '#abrau' },
    { name: 'Лепнина', code: 'Хоромы · потолок', c: '#E7E2D6', ink: '#1D1B17', img: 'img/h_stucco.jpg', alt: 'Восстановленная лепнина в «Хоромах»', href: '#horomy' }
  ];
  var fan = document.getElementById('fan'), img = document.getElementById('dkImg');
  var code = document.getElementById('dkCode'), name = document.getElementById('dkName'), link = document.getElementById('dkLink');
  var deck = document.getElementById('deck');
  var n = CHIPS.length, cur = 0, btns = [];

  CHIPS.forEach(function (ch, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'chip'; b.setAttribute('role', 'radio');
    b.style.setProperty('--c', ch.c); b.style.setProperty('--ink', ch.ink);
    b.style.setProperty('--a', ((i - (n - 1) / 2) * 11).toFixed(1) + 'deg');
    b.style.zIndex = i + 1;
    b.innerHTML = '<span class="chip-c"></span><span class="chip-l"><b>' + ch.name + '</b><i>' + ch.code + '</i></span>';
    b.addEventListener('click', function () { pick(i); });
    b.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); pick((cur + 1) % n, true); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); pick((cur - 1 + n) % n, true); }
    });
    fan.appendChild(b); btns.push(b);
  });

  /* предзагрузка фото веера */
  CHIPS.forEach(function (ch) { var i = new Image(); i.src = ch.img; });

  function pick(i, focus) {
    cur = i;
    btns.forEach(function (b, k) {
      var on = k === i;
      b.classList.toggle('on', on);
      b.setAttribute('aria-checked', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    });
    var ch = CHIPS[i];
    deck.style.setProperty('--sel', ch.c);
    img.classList.add('swap');
    setTimeout(function () {
      img.src = ch.img; img.alt = ch.alt;
      code.textContent = ch.code; name.textContent = ch.name; link.href = ch.href;
      img.classList.remove('swap');
    }, 260);
  }
  pick(0);
  requestAnimationFrame(function () { fan.classList.add('open'); });
})();
