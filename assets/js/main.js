// main.js 
// import AnimaCanvas from './AnimaCanvas.js';

const props = {}
const objFundo = {}
const propsBase = {
    scale: 4,
    overflow_x: 'hidden',
    overflow_y: 'auto',
    zoom: isMobile() ? 0.5 : 1,
    height_box: isMobile() ? 'auto' : '66vh',
    name: 'Personagem 1',
    imgPath: `assets/img/${img_path.value}`,
    x: parseInt(pos_x.value),
    y: parseInt(pos_y.value),
    speed: parseInt(speed.value),
    animation: true,
    spriteScale: parseFloat(sprite_scale.value),
    animateOnload: true,
    backgroundBaseImg: `assets/img/imgBgBase.png`,
    backgroundScale: parseFloat(background_scale.value),
    backgroundImage: `assets/img/fundo13.png`,
    backgroundAnimation: createObjFrame(0, 20, 1, 30, 0),
    animationFrames: createObjFrame(0, 2, 4, 500, 260),
    moveX: false,
    moveY: false,
}

const gruposFundoImg = {
    grupo1: ['fundo1.png', 'fundo2.png', 'fundo3.png', 'fundo13.png', 'fundo16.png', 'fundo21.png'],
    grupo2: ['fundo18.png', 'fundo19.png'],
    grupo3: ['fundo20.png'],
}

const imgFundo1 = {
    backgroundScale: 1.25,
    backgroundAnimation: {bg_qtd: 0, bg_cols: 20, bg_lines: 1, bg_width: 30, bg_height: 0},
}

const imgFundo2 = {
    backgroundScale: 1.55,
    backgroundAnimation: {bg_qtd: 0, bg_cols: 40, bg_lines: 1, bg_width: 30, bg_height: 0},
}

const imgFundo3 = {
    x: 300,
    y: 560,
    backgroundScale: 1.26,
    backgroundAnimation: {bg_qtd: 0, bg_cols: 60, bg_lines: 1, bg_width: 30, bg_height: 0},
}

console.log('objFundo:', objFundo)
// Definindo os personagens
const onca = {...propsBase};
// onca.backgroundAnimation = createObjFrame(0, 20, 1, 30, 0);
onca.animationFrames = createObjFrame(0, 2, 4, 500, 260);
onca.spriteScale = 0.95;
onca.speed = 7;
onca.x = 300;
onca.y = 475;

const aguia = {...propsBase};
aguia.animationFrames = createObjFrame(0, 3, 3, 350, 350);
aguia.spriteScale = 0.8;
aguia.x = 400;
aguia.y = 100;

const arara = {...propsBase};
arara.animationFrames = createObjFrame(0, 3, 3, 100, 100);
arara.spriteScale = 1.1;
arara.x = 400;
arara.y = 100;

const sonic = {...propsBase};
sonic.animationFrames = createObjFrame(16, 8, 8, 51, 50, 8);
sonic.spriteScale = 4;
sonic.x = 500;
sonic.y = 520;

const boneco = {...propsBase};
boneco.animationFrames = createObjFrame(0, 4, 2, 120, 130);
boneco.spriteScale = 2.5;
boneco.x = 400;
boneco.y = 410;

props['img1.png'] = onca;
props['img2.png'] = onca;
props['img3.png'] = onca;
props['img4.png'] = onca;
props['img5.png'] = onca;
props['img6.png'] = onca;
props['img10.png'] = sonic;
props['img11.png'] = boneco;
props['img15.png'] = arara;
props['img19.png'] = aguia;
props['img20.png'] = aguia;
props['img21.png'] = aguia;
props['img22.png'] = aguia;

let animate = main('box_canvas', props[img_path.value]);
