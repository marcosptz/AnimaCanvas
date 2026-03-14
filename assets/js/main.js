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

const animate = main('box_canvas', prorpsOnca)

// const prorps = {
//     scale: 4,
//     x: 0,
//     y: 500,
//     fps: 5,
//     spriteScale: 5,
//     backgroundImage: 'assets/img/fundo1.png',
//     // animationFrames,
//     animationFrames: frame2,
// }

// const personage = new Character('box_canvas', prorps, 'Personagem1', 'assets/img/img4.png');

// const main = () => {}

// const context = document.getElementById('canvas_teste').getContext('2d');
// const img = new Image();
// img.src = 'assets/img/fundo1.png';

// setTimeout(() => personage.addImage(img, 0, 0, personage.width, personage.height), 100)
// img.id = 'img_teste';

// console.log('personage:', personage.width)
// console.log('personage:', personage.height)

// let imgSonic = 'assets/img/sonic1.png';
// let largura = 50;
// let altura = 50;
// let larguraQuadro = img.width / 15;
// let alturaQuadro = img.height / 9;

// // context.fillRect(10, 10, 20, 50)

// // box_canvas.append(img);

// // let image = document.querySelector('#img_teste')

// // animate.text('Teste...', 5, 5);
// // animate.addImage(image, 10, 10, 50, 50);

// console.log('imgSonic: ', img)

// // const teste1 = () => {
// //     context.drawImage(
// //         img,
// //         larguraQuadro,
// //         larguraQuadro,
// //         largura,
// //         altura,
// //         100, // Posição no canvas onde quero desenhar
// //         100,
// //         largura,
// //         altura
// //     );
// // }

// // img.onload = teste1();

// context.fillText('Teste...', 5, 5);
// context.drawImage(img, 10, 10, 100, 100);
// context.restore();

// context.drawImage(
//     img,
//     larguraQuadro,
//     larguraQuadro,
//     largura,
//     altura,
//     100, // Posição no canvas onde quero desenhar
//     100,
//     largura,
//     altura
// );