const updateData = (type=1) => {
  const qtd = parseInt(qtd_frames.value);
  const x = parseFloat(frame_x.value);
  const y = parseFloat(frame_y.value);
  const w = parseFloat(frame_w.value);
  const h = parseFloat(frame_h.value);
  const b_qtd = parseInt(bg_qtd.value);
  const bx = parseInt(bg_x.value);
  const by = parseInt(bg_y.value);
  const directionX = direction_x.value == 0 ? false : true;
  const directionY = direction_y.value == 0 ? false : true;
  const directionBgX = direction_bg_x.value == 0 ? false : true;
  const directionBgY = direction_bg_y.value == 0 ? false : true;
  const props = {
    scale: 4,
    overflow_x: 'hidden',
    //overflow_y: 'hidden',
    name: 'Personagem 2',
    imgPath: `assets/img/${img_path.value}`,  // img_path.value
    x: parseInt(pos_x.value),
    y: parseInt(pos_y.value),
    speed: parseInt(speed.value),
    animation: type == 0 ? false : true,
    spriteScale: parseFloat(sprite_scale.value),
    backgroundScale: parseFloat(background_scale.value),
    backgroundImage: background_image.value == '' ? false : `assets/img/${background_image.value}`,
    backgroundAnimation: background_image.value == '' ? [] : createFrame(b_qtd, bx, by, 0, 0, directionBgX, directionBgY),
    moveX: move_x.value == 0 ? false : true,
    moveY: move_y.value == 0 ? false : true,
    animationFrames: createFrame(qtd, x, y, w, h, directionX, directionY),
  }

  animate = main('box_canvas', props);

  return animate;
}

// const botao = document.getElementById('meuBotao');

// Quando pressiona o mouse
// btn_up.addEventListener('mousedown', function() {
//     console.log('Botão sendo mantido pressionado...');
//     moveUp(25, 1);
//     this.classList.add('active');
// });

// // Quando solta o mouse
// btn_up.addEventListener('mouseup', function() {
//     console.log('Botão solto.');
//     this.classList.remove('active');
//     moveUp(0);
// });

// // Para garantir que o estilo saia se o mouse sair do botão enquanto pressionado
// btn_up.addEventListener('mouseleave', function() {
//     this.classList.remove('active');
//     console.log('Teste...');
// });


// const animate = animateCanvas();

// const animate = main('box_canvas');

// animate.setProps(prorpsSonic)