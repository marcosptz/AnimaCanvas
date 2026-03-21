const main = (element, props={}) => {
    const name = typeof props.name == 'undefined' ? 'Canvas' : props.name;
    const imgPath = typeof props.imgPath == 'undefined' ? 'Canvas' : props.imgPath;

    const personage = new Character(element, props, name, imgPath);

    return personage;
}

const createFrame = (qtd=1, cols=1, lines=1, width=0, height=0, stepCol=0, stepLine=0) => {
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

const createObjFrame = (qtd=1, cols=1, lines=1, width=0, height=0, jump=0) => {
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
        const colAtuaL = (i % cols); 
        const linhaAtual = Math.floor(i / cols);

        const x = marg_esq + (colAtuaL * (width + horizontal_distance));
        const y = marg_sup + (linhaAtual * (height + vertical_distance));

        if(i >= jump) frame.push({ x, y, w: width, h: height });
    }

    return frame;
}

const alterBackGround = (img='fundo1.png') => {
    if(!queryData('alterBg', img)) {
        animate.alterBackGround(`assets/img/${img}`);

        if(objFundo[img]) {
            alterBg.value = img;
            background_image.value = img;
            if(objFundo[img].x) pos_x.value = objFundo[img].x;
            if(objFundo[img].y) pos_y.value = objFundo[img].y;
            bg_scale.value = objFundo[img].backgroundScale;
            background_scale.value = objFundo[img].backgroundScale;
            bg_qtd.value = objFundo[img].backgroundAnimation.bg_qtd;
            bg_cols.value = objFundo[img].backgroundAnimation.bg_cols;
            bg_lines.value = objFundo[img].backgroundAnimation.bg_lines;
            bg_width.value = objFundo[img].backgroundAnimation.bg_width;
            bg_height.value = objFundo[img].backgroundAnimation.bg_height;

            setBgScale(objFundo[img].backgroundScale);
            updateData();
        }
    }
}

const alterCharacter = (img='img1.png') => {
    if(!queryData('alter_chacter', img)) {
        img_path.value = img;
        alter_chacter.value = img;

        props[img].imgPath = `assets/img/${img}`;

        animate = main('box_canvas', props[img]);
    }
}

const pause = () => {
    animate.pause();
}

const stop = () => {
    animate.stop();
}

const reverse = (reverse=true) => {
    animate.reverse = reverse;
}

const getValues = () => {
    const qtd = parseInt(qtd_frames.value);
    const x = parseFloat(frame_x.value);
    const y = parseFloat(frame_y.value);
    const w = parseFloat(frame_w.value);
    const h = parseFloat(frame_h.value);
    const b_qtd = parseInt(bg_qtd.value);
    const bx = parseInt(bg_cols.value);
    const by = parseInt(bg_lines.value);
    const directionX = direction_x.value == 0 ? false : true;
    const directionY = direction_y.value == 0 ? false : true;
    const props = {
        scale: 4,
        overflow_x: 'hidden',
        //overflow_y: 'hidden',
        zoom: isMobile() ? 0.5 : 1,
        height_box: isMobile() ? 'auto' : '66vh',
        name: 'Personagem 2',
        imgPath: `assets/img/${img_path.value}`,  // img_path.value
        x: parseInt(pos_x.value),
        y: parseInt(pos_y.value),
        speed: parseInt(speed.value),
        animation: true,
        spriteScale: parseFloat(sprite_scale.value),
        backgroundScale: parseFloat(background_scale.value),
        backgroundImage: background_image.value == '' ? false : `assets/img/${background_image.value}`,
        backgroundAnimation: background_image.value == '' ? [] : createObjFrame(b_qtd, bx, by, 32),
        moveX: move_x.value == 0 ? false : true,
        moveY: move_y.value == 0 ? false : true,
        animationFrames: createObjFrame(qtd, x, y, w, h),
    }
    
    return props;
}

const addZoom = (type=1) => {
  if(type == 1) animate.setZoom(animate.currentZoom + 0.1);
  else if(type == 2) animate.setZoom(parseFloat(zoom.value));
  else animate.setZoom(animate.currentZoom - 0.1);

  zoom.value = parseFloat(animate.currentZoom) < 0.1 ? 0.1 : parseFloat(animate.currentZoom).toFixed(1);
}

const setSpeed = (speed=1, type=2) => {
    if(type == 1) {animate.setSpeed(animate.speed + 1); console.log('teste 1')}
    else if(type == 0) {animate.setSpeed(animate.speed - 1); console.log('teste 2')}
    else {animate.setSpeed(speed); console.log('teste 3')}
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

const setSpriteScale = (scale, type=0) => {
    if(type == 0)animate.setSpriteScale(scale);
    if(type == 1) animate.setSpriteScale(animate.spriteScale + 0.1);
    if(type == 2) animate.setSpriteScale(animate.spriteScale - 0.1);

    sprite_sacale.value = animate.spriteScale;
    sprite_scale.value = animate.spriteScale;
}

const setBgScale = (scale, type=0) => {
  if(type == 0) animate.setBgScale(scale);
  if(type == 1) animate.setBgScale(animate.backgroundScale + 0.1);
  if(type == 2) animate.setBgScale(animate.backgroundScale - 0.1);

  bg_scale.value = animate.backgroundScale;
  background_scale.value = animate.backgroundScale;
}

const getZoom = () => {
    return animate.currentZoom;
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
    let speeds = [-90];
    let current_speed = 0;

    for(let i=0; i < max; i++) {
        speeds[i+1] = min += scale;
    }

    let interval = setInterval(() => {
        current_speed = speeds[animate.speed];
        // current_speed = animate.speed < 0 ? 0 : animate.speed;

        document.querySelector(`#${id_element} .velocidade`).innerHTML = animate.speed <= 0 ? 0 : animate.speed;
        document.querySelector(`#${id_element} .ponteiro`).style = `transform: rotate(${animate.speed <= 0 ? -90 : current_speed}deg)`;
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

const isMobile = () => {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

const setSelect = (element='', qtd=0, type=0, val=1) => {
    let options = '';
    let text = type == 0 ? 'img' : 'fundo';
    let selected = '';

    for(let i = 0; i < qtd; i++) {
        selected = val == i+1 ? 'selected' : '';
        options += `<option value="${text + (i+1)}.png" ${selected}>${text + (i+1)}</option>`;
    }

    document.querySelector(element).innerHTML = options;
}

const updateData = (type=1) => {
  const qtd = parseInt(qtd_frames.value);
  const x = parseFloat(frame_x.value);
  const y = parseFloat(frame_y.value);
  const w = parseFloat(frame_w.value);
  const h = parseFloat(frame_h.value);
  const b_qtd = parseInt(bg_qtd.value);
  const b_x = parseInt(bg_cols.value);
  const b_y = parseInt(bg_lines.value);
  const b_w = parseInt(bg_width.value);
  const b_h = parseInt(bg_height.value);
  const directionX = direction_x.value == 0 ? false : true;
  const directionY = direction_y.value == 0 ? false : true;
  const directionBgX = direction_bg_x.value == 0 ? false : true;
  const directionBgY = direction_bg_y.value == 0 ? false : true;
  const props = {
    scale: 4,
    overflow_x: 'hidden',
    overflow_y: 'auto',
    name: 'Personagem 2',
    imgPath: `assets/img/${img_path.value}`,
    x: parseInt(pos_x.value),
    y: parseInt(pos_y.value),
    speed: parseInt(speed.value),
    animation: type == 0 ? false : true,
    spriteScale: parseFloat(sprite_scale.value),
    backgroundScale: parseFloat(background_scale.value),
    backgroundImage: background_image.value == '' ? false : `assets/img/${background_image.value}`,
    backgroundAnimation: background_image.value == '' ? [] : createObjFrame(b_qtd, b_x, b_y, b_w, b_h),
    moveX: move_x.value == 0 ? false : true,
    moveY: move_y.value == 0 ? false : true,
    animationFrames: createObjFrame(qtd, x, y, w, h),
  }

  animate = main('box_canvas', props);

  return animate;
}

const saveData = () => {
    const dataCharacter = JSON.parse(localStorage.getItem('dataCharacter'));
    const obj = {};
    const data = dataCharacter ? dataCharacter : [];
    const id = getRandomIntInclusive(1, 100000);


    document.querySelectorAll('.element').forEach((el, i) => {
        obj[el.id] = el.value;
    });

    if(obj['id'] != id.value) obj['id'] = id;

    data.push(obj);

    localStorage.setItem('dataCharacter', JSON.stringify(data));

    getData();
}

const queryData = (campo='img_path', query='img3.png') => {
    const dataCharacter = JSON.parse(localStorage.getItem('dataCharacter'));

    if(dataCharacter) {
        const data = dataCharacter.find(item => item[campo] == query);

        if(data) {
            document.querySelectorAll('.element').forEach(el => {
                el.value = data[el.id];

                console.log('teste', el.id, el.value)
            });

            updateData();

            console.log('Data:', data)

            return true;
        } else {
            form_canvas.reset();
            console.log('Não existem dados salvas:', data);

            return false;
        }
    }
}

const getData = () => {
    const dataCharacter = JSON.parse(localStorage.getItem('dataCharacter'));
    let row = '';
    let html = `<tbody>`;

    if(dataCharacter) {
        dataCharacter.forEach((item, i) => {
            row += `<tr onclick="queryData('id', '${item.id}'); btn_config.click()">
                        <td>${i+1}</td>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>${item.img_path}</td>
                        <td>${item.alterBg}</td>
                        <td>${item.frame_x}</td>
                        <td>${item.frame_y}</td>
                        <td>${item.bg_cols}</td>
                        <td>${item.bg_lines}</td>
                    </tr>`;
            console.log('Data:', item)
        });

        html += row + '</tbody>';

        dataListBg.querySelector('tbody').innerHTML = html;

        // console.log('Data:', dataCharacter)

        return true;
    } else {
        console.log('Não existem dados salvos:', dataCharacter);

        return false;
    }
}

const mountObjImg = (group, img) => {
    gruposFundoImg[group].forEach(element => {
        objFundo[element] = img;
    });
}

const loadFunction = () => {
    setSelect('#alter_chacter', 25);
    setSelect('#alterBg', 22, 1, 13);
    speedometer('velocimetro');
    queryData('alter_chacter', 'img1.png');
    getData();
    mountObjImg('grupo1', imgFundo1);
    mountObjImg('grupo2', imgFundo2);
    mountObjImg('grupo3', imgFundo3);
    zoom.value = getZoom();
}

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener('keydown', function(evento) {
    // r=37 | l=39 | up=38 | dn=40 | espaço=32 | ctrl=17 | alt=18 | altgr=225
    if(evento.keyCode == 37 || evento.keyCode == 38 || evento.keyCode == 39 || evento.keyCode == 40) evento.preventDefault();

    animate.btnAction(evento.keyCode);
    console.log('keyCode:', evento.keyCode)
});