// main.js 
// import AnimaCanvas from './AnimaCanvas.js';

const main = (element, props={}) => {
    const name = typeof props.name == 'undefined' ? 'Canvas' : props.name;
    const imgPath = typeof props.imgPath == 'undefined' ? 'Canvas' : props.imgPath;

    const personage = new Character(element, props, name, imgPath);
    // const personage2 = new Character(element, props, name, imgPath);

    // personage.init();

    return personage;
}

const createFrame = (qtd=1, intervalX=0, intervalY=0, w=0, h=0, x=true, y=true, step=0) => {
  const frame = [];
  let countX = 0;
  let countY = 0;
  
  for(let i=step; i<qtd; i++) {
    frame.push({x: countX, y: countY, w, h});
    if(x) countX += intervalX;
    else frame[i].x = intervalX;  // countX = intervalX;
    if(y) countY += intervalY;
    else frame[i].y = intervalY;  // countY = intervalY;
  }
  
  return frame;
}

const createFrame2 = (qtd=1, intervalX=0, intervalY=0, w=0, h=0, x=true, y=true, step=0) => {
  const frame = [];
  let countX = 0;
  let countY = 0;
  
  for(let l=0; l<4; l++) {
    for(let i=0; i<2; i++) {
      frame.push({x: countX, y: countY, w, h});
      
      if(x) countX = intervalX*l;
      if(y) countY = intervalY*i;
    }
  }
  
  return frame;
}

const alterBackGround = (img='fundo1.png') => {
    animate.alterBackGround(`assets/img/${img}`);
}

const alterCharacter = (img='img1.png') => {
    animate.alterCharacter(`assets/img/${img}`);
}

const stop = () => {
    if(pause_value.value == 0) {
        pause_value.value = 1;
        animate.stop();
    }
    else {
        pause_value.value = 0;
        animate.animate();
    }

    console.log('type', pause_value.value)
}

const getValues = () => {
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
        backgroundAnimation: background_image.value == '' ? [] : createFrame(b_qtd, bx, by, 0, 0, true, false),
        moveX: move_x.value == 0 ? false : true,
        moveY: move_y.value == 0 ? false : true,
        animationFrames: createFrame(qtd, x, y, w, h, directionX, directionY),
    }
    
    return props;
}

const addZoom = (type=1) => {
  if(type == 1) animate.setZoom(animate.currentZoom + 0.1);
  else if(type == 2) animate.setZoom(parseFloat(zoom.value));
  else animate.setZoom(animate.currentZoom - 0.1);

  zoom.value = parseFloat(animate.currentZoom) < 0.1 ? 0.1 : parseFloat(animate.currentZoom).toFixed(1);
}

const setSpeed = (type=1) => {
    if(type == 1) animate.setSpeed(animate.speed + 1);
    else animate.setSpeed(animate.speed - 1);
}

const setProps = (props) => {
    animate.setProps(props);
}

const moveLeft = () => {
    animate.moveLeft(25);

    // setInterval(() => animate.moveLeft(), 500);
}

const moveRigth = () => {
    animate.moveRigth(25);

    console.log('teste...')
}

const moveUp = () => {
    animate.moveUp(25);
}

const moveDn = () => {
    animate.moveDn(25);
}

const speedUp = () => {
    animate.speedUp();
}

const speedDn = () => {
    animate.speedDn();
}

const animateCanvas = (type=true) => {
    animate.setProps(getValues());
    animate.animate(type);
}

const stopAnimate = () => {
    animate.stop();
}

const resetAnimate = () => {
    animate.stop();
    animate.reset();
}

// Passando o ID do elemento que está no seu index.html
// const animate = new AnimaCanvas('box_canvas', {scale: 4});
// const img = new Image();
// img.src = 'assets/img/sonic1.png';
// Mapeamento manual dos frames da img1.png (Valores aproximados para teste)
// Cada objeto é {x, y, largura, altura}
const animationFrames = [
    { x: 0,   y: 25, w: 500, h: 280 }, // Parado 1
    { x: 0,  y: 280, w: 500, h: 280 }, // Parado 2
    { x: 0,  y: 540, w: 500, h: 280 }, // Parado 3
    { x: 0, y: 800, w: 500, h: 280 },  // Início do passo
    // { x: 500, y: 25, w: 500, h: 280 },  // Início do passo
    // { x: 500, y: 280, w: 500, h: 280 },  // Início do passo
    // { x: 500, y: 540, w: 500, h: 280 },  // Início do passo
    // { x: 500, y: 800, w: 500, h: 280 },  // Início do passo
];

const frame2 = [
    // { x: 0,   y: 0, w: 50, h: 50 }, // Parado 1
    { x: 0,  y: 50, w: 50, h: 50 }, // Parado 2
    { x: 55,  y: 50, w: 50, h: 50 }, // Parado 3
    { x: 110,  y: 50, w: 50, h: 50 }, // Parado 3
    { x: 160,  y: 50, w: 50, h: 50 }, // Parado 3
    { x: 210,  y: 50, w: 50, h: 50 }, // Parado 3
    { x: 260,  y: 50, w: 50, h: 50 }, // Parado 3
    { x: 310,  y: 50, w: 50, h: 50 }, // Parado 3
    { x: 360,  y: 50, w: 50, h: 50 }, // Parado 3
];

const frames1 = { 
    frame1: [
        { x: 0,   y: 25, w: 500, h: 280 }, // Parado 1
        { x: 0,  y: 280, w: 500, h: 280 }, // Parado 2
        { x: 0,  y: 540, w: 500, h: 280 }, // Parado 3
        { x: 0, y: 800, w: 500, h: 280 },  // Início do passo
        { x: 0, y: 1080, w: 500, h: 280 },  // Início do passo
        { x: 0, y: 1360, w: 500, h: 280 },  // Início do passo
        { x: 0, y: 1640, w: 500, h: 280 },  // Início do passo
        { x: 0, y: 1920, w: 500, h: 280 },  // Início do passo
        // { x: 500, y: 25, w: 500, h: 280 },  // Início do passo
        // { x: 500, y: 280, w: 500, h: 280 },  // Início do passo
        // { x: 500, y: 540, w: 500, h: 280 },  // Início do passo
        // { x: 500, y: 800, w: 500, h: 280 },  // Início do passo
    ],
    frame2: [
        { x: 2,   y: 10, w: 30, h: 40 }, // Parado 1
        { x: 35,  y: 10, w: 30, h: 40 }, // Parado 2
        { x: 70,  y: 10, w: 30, h: 40 }, // Parado 3
        { x: 105, y: 10, w: 35, h: 40 },  // Início do passo
        { x: 500, y: 25, w: 500, h: 280 },  // Início do passo
        { x: 500, y: 280, w: 500, h: 280 },  // Início do passo
        { x: 500, y: 540, w: 500, h: 280 },  // Início do passo
        { x: 500, y: 800, w: 500, h: 280 },  // Início do passo
    ],
};

const setSelect = (element='', qtd=0, type=0) => {
    let options = '';
    let text = type == 0 ? 'img' : 'fundo'

    for(let i = 0; i < qtd; i++) {
        options += `<option value="${text + (i+1)}.png">${text + (i+1)}</option>`;
    }

    document.querySelector(element).innerHTML = options;
}

const prorpsSonic = {
    scale: 4,
    name: 'Personagem 1',
    imgPath: 'assets/img/img4.png',
    x: 0,
    y: 500,
    speed: 5,
    // animation: false,
    spriteScale: 5,
    backgroundImage: 'assets/img/fundo1.png',
    animationFrames: frame2,
}

const prorpsOnca = {
    scale: 4,
    name: 'Personagem 1',
    imgPath: 'assets/img/img3.png',
    x: 0,
    y: 500,
    speed: 4,
    // animation: false,
    spriteScale: 0.95,
    backgroundImage: 'assets/img/fundo2.png',
    animationFrames,
}

const qtd = parseInt(qtd_frames.value);
const x = parseFloat(frame_x.value);
const y = parseFloat(frame_y.value);
const w = parseFloat(frame_w.value);
const h = parseFloat(frame_h.value);
const b_qtd = parseInt(bg_qtd.value);
const bx = parseInt(bg_x.value);
const by = parseInt(bg_y.value);
const type = true;
const directionX = direction_x.value == 0 ? false : true;
const directionY = direction_y.value == 0 ? false : true;
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
    backgroundAnimation: background_image.value == '' ? [] : createFrame(b_qtd, bx, by, 0, 0, true, false),
    moveX: move_x.value == 0 ? false : true,
    moveY: move_y.value == 0 ? false : true,
    animationFrames: createFrame(qtd, x, y, w, h, directionX, directionY),
}

setSelect('#alterChacter', 13);
setSelect('#alterBg', 18, 1);

const animate = main('box_canvas', props);
