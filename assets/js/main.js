// main.js 
// import AnimaCanvas from './AnimaCanvas.js';

const main = (element, props={}) => {
    const name = typeof props.name == 'undefined' ? 'Canvas' : props.name;
    const imgPath = typeof props.imgPath == 'undefined' ? 'Canvas' : props.imgPath;

    const personage = new Character(element, props, name, imgPath);

    return personage;
}

const createFrame1 = (qtd=1, intervalX=0, intervalY=0, w=0, h=0, x=true, y=true, step=0) => {
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

const createFrame2 = (intervalX=0, intervalY=0, w=0, h=0, x=true, y=true, step=0) => {
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

const createFrame3 = (qtd=1, cols=1, lines=1, width=0, height=0, stepCol=0, stepLine=0) => {
    const frame = [];
    let marg_esq = 0;
    let marg_sup = 0;
    let horizontal_distance = 0;
    let vertical_distance = 0;
    let count = 0;

    // Se  for passado a quantidade como false ou como 0, utiliza quantidade de colunas X linhas
    if(!qtd) qtd = cols*lines;

    for(let l=stepLine; l < lines; l++) {  // Qtd de linhas
        for(let i=stepCol; i < cols; i++) {  // Qtd de colunaas
            if(count == qtd) return frame;  // Define a quantidade independente da quantidade de colunas e linhas

            const x = marg_esq + (i * (width + horizontal_distance));
            const y = marg_sup + (l * (height + vertical_distance));

            frame.push({x, y, w: width, h: height});

            count++;
        }
    }
  
  return frame;
}

const createObjFrame = (qtd=1, cols=1, lines=1, width=0, height=0, stepCol=0, stepLine=0) => {
    const frame = [];
    const marg_esq = 0;
    const marg_sup = 0;
    const horizontal_distance = 0;
    const vertical_distance = 0;

    // Define o limite total de iterações
    const total = qtd || (cols * lines);

    for (let i = 0; i < total; i++) {
        // Calcula a coluna e a linha baseada no índice linear
        // Somamos o step inicial para manter a lógica original
        const colAtuaL = (i % cols) + stepCol; 
        const linhaAtual = Math.floor(i / cols) + stepLine;

        const x = marg_esq + (colAtuaL * (width + horizontal_distance));
        const y = marg_sup + (linhaAtual * (height + vertical_distance));

        frame.push({ x, y, w: width, h: height });
    }

    return frame;
}

const alterBackGround = (img='fundo1.png') => {
    animate.alterBackGround(`assets/img/${img}`);

    background_image.value = img;
}

const alterCharacter = (img='img1.png') => {
    animate.alterCharacter(`assets/img/${img}`);

    img_path.value = img;
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
        backgroundAnimation: background_image.value == '' ? [] : createObjFrame(b_qtd, bx, by, 32),
        // backgroundAnimation: background_image.value == '' ? [] : createFrame1(b_qtd, bx, by, 0, 0, true, false),
        moveX: move_x.value == 0 ? false : true,
        moveY: move_y.value == 0 ? false : true,
        animationFrames: createObjFrame(qtd, x, y, w, h),
        // animationFrames: createFrame1(qtd, x, y, w, h, directionX, directionY),
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

const moveLeft = (type=0) => {
    animate.moveLeft(25, type);
}

const moveRigth = (type=0) => {
    animate.moveRigth(25, type);
}

const moveUp = (type=0) => {
    animate.moveUp(25, type);
}

const moveDn = (type=0) => {
    animate.moveDn(25, type);
}

const speedUp = (type=0) => {
    animate.speedUp(type);
}

const speedDn = (type=0) => {
    animate.speedDn(type);
}

const setSpriteScale = (scale) => {
  animate.setSpriteScale(scale);
}

const setBgScale = (scale) => {
  animate.setBgScale(scale);
  //animate.backgroundScale = scale;
}

const animateCanvas = (type=true) => {
    animate.setProps(getValues());
    animate.animate(type);
}

const speedometer = (id_element='', active=1) => {
    let min = -90;
    let max = 90;
    let limit = 15;
    let scale = (max-min)/limit;
    let speeds = [];
    let current_speed = 0;

    for(let i=0; i < max; i++) {
        speeds[i+1] = min += scale;
    }

    let interval = setInterval(() => {
        current_speed = speeds[animate.speed];

        document.querySelector(`#${id_element} .velocidade`).innerHTML = animate.speed;
        document.querySelector(`#${id_element} .ponteiro`).style = `transform: rotate(${current_speed}deg)`;
    }, 100);

    if(active == 0) {clearInterval(interval); return}
}

const animateData = (el, type=0) => {
  switch(type) {
    case 1:
        animate.setX(el.value);
        break;
    case 2:
        animate.setY(el.value)
        break;
    case 3:
        animate.setSpeed(el.value)
        break;
    case 4:
        setSpriteScale(el.value)
        break;
    case 5:
        let moveX = el.value == 0 ? false : true;
        animate.setMoveX(moveX);
        break;
    case 6:
        let moveY = el.value == 0 ? false : true;
        animate.setMoveY(moveY)
    default:
        break;
  }
}

const stopAnimate = () => {
    animate.stop();
}

const resetAnimate = () => {
    animate.stop();
    animate.reset();
}

isMobile = () => {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}


const loadFunction = () => {
    setSelect('#alterChacter', 20);
    setSelect('#alterBg', 18, 1);
    speedometer('velocimetro');
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

const frame3 = [
    { x: 100,  y: 50, w:280, h: 125 },
    { x: 440,  y: 50, w: 280, h: 125 },
    { x: 880,  y: 50, w: 280, h: 125 },
    { x: 100,  y: 190, w: 260, h: 125 },
    { x: 460,  y: 190, w: 260, h: 125 },
    { x: 880,  y: 175, w: 280, h: 125 },
    { x: 100,  y: 300, w: 280, h: 125 },
    { x: 440,  y: 300, w: 280, h: 125 },
    { x: 880,  y: 300, w: 280, h: 125 },
    { x: 100,  y: 425, w: 280, h: 125 },
    { x: 440,  y: 425, w: 280, h: 125 },
    { x: 880,  y: 425, w: 280, h: 125 },
    { x: 100,  y: 550, w: 280, h: 125 },
    { x: 440,  y: 550, w: 280, h: 125 },
    { x: 880,  y: 550, w: 280, h: 125 },
    { x: 100,  y: 675, w: 280, h: 125 },
    { x: 440,  y: 675, w: 280, h: 125 },
    { x: 880,  y: 675, w: 280, h: 125 },
];

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
const bg_w = parseInt(bg_width.value);
const bg_h = parseInt(bg_height.value);
const type = true;
const directionX = direction_x.value == 0 ? false : true;
const directionY = direction_y.value == 0 ? false : true;
const directionBgX = direction_bg_x.value == 0 ? false : true;
const directionBgY = direction_bg_y.value == 0 ? false : true;
const props = {
    scale: 4,
    overflow_x: 'hidden',
    //overflow_y: 'hidden',
    height_box: isMobile() ? 'auto' : '66vh',
    name: 'Personagem 2',
    // imgPath: `assets/img/img7.png`,  // img_path.value
    imgPath: `assets/img/${img_path.value}`,  // img_path.value
    x: parseInt(pos_x.value),
    y: parseInt(pos_y.value),
    speed: parseInt(speed.value),
    animation: type == 0 ? false : true,
    spriteScale: parseFloat(sprite_scale.value),
    animateOnload: false,
    backgroundBaseImg: `assets/img/imgBgBase.png`,
    backgroundScale: parseFloat(background_scale.value),
    backgroundImage: background_image.value == '' ? false : `assets/img/${background_image.value}`,
    backgroundAnimation: background_image.value == '' ? [] : createObjFrame(b_qtd, bx, by, bg_w, bg_h),
    // backgroundAnimation: background_image.value == '' ? [] : createFrame1(b_qtd, bx, by, 0, 0, directionBgX, directionBgY),
    moveX: move_x.value == 0 ? false : true,
    moveY: move_y.value == 0 ? false : true,
    animationFrames: createObjFrame(qtd, x, y, w, h),
    // animationFrames: createFrame1(qtd, x, y, w, h, directionX, directionY),
}

let animate = main('box_canvas', props);
