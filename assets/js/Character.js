// Dentro do seu Character.js
class Character extends AnimaCanvas {
    constructor(element, props, name, imgPath) {
        super(element, props);
        this.name = name;
        this.img = new Image();
        this.imgSpeed = new Image();
        this.backgroundImg =  new Image();
        this.backgroundBaseImg =  new Image();
        this.img.src = imgPath;
        this.imgSpeed.src = 'assets/img/speed.png';
        this.backgroundImg.src = typeof props.backgroundImage == 'undefined' ? '' : props.backgroundImage;
        this.backgroundBaseImg.src = typeof props.backgroundBaseImg == 'undefined' ? '' : props.backgroundBaseImg;
        this.imageStatus = typeof props.backgroundImage == 'undefined' ? false : true;
        this.animationFrames = typeof props.animationFrames == 'undefined' ? [{x: 0, y: 0}] : props.animationFrames;
        this.animation = typeof props.animation == 'undefined' ? true : props.animation;  // Aiva a animação ao instanciar a classe, default é sempre ativa
        this.backgroundAnimation = typeof props.backgroundAnimation == 'undefined' || props.backgroundAnimation.length == 0 ? [{x: 0, y: 0, w: this.width, h: this.height}] : props.backgroundAnimation;
        this.x = typeof props.x == 'undefined' ? 0 : props.x;  // Define a posição x
        this.y = typeof props.y == 'undefined' ? 0 : props.y;  // Define a posição y
        this.speed = typeof props.speed == 'undefined' ? 5 : props.speed;  // Define a velocidade
        this.backgroundScale = typeof props.backgroundScale == 'undefined' ? 1 : props.backgroundScale;
        this.spriteScale = typeof props.spriteScale == 'undefined' ? 2 : props.spriteScale;  // Aumenta o tamanho do sprite sem distorcer
        this.numColsBg = typeof props.numColsBg == 'undefined' ? 5 : parseInt(props.numColsBg);  // Números de colunas background
        this.numLinesBg = typeof props.numLinesBg == 'undefined' ? 1 : parseInt(props.numLinesBg);  // Números de linhas background
        this.numCols = typeof props.numCols == 'undefined' ? 2 : parseInt(props.numCols);  // Números de colunas
        this.numLines = typeof props.numLines == 'undefined' ? 4 : parseInt(props.numLines);  // Números de linhas
        this.moveX = typeof props.moveX == 'undefined' ? false : props.moveX;  // Adiciona movimento na horizontal
        this.moveY = typeof props.moveY == 'undefined' ? false : props.moveY;  // Adiciona movimento na vertical
        this.moveScale = typeof props.moveScale == 'undefined' ? 100 : props.moveScale;
        this.animateOnload = typeof props.animateOnload == 'undefined' ? true : props.animateOnload;
        this.currentFrame = 0;
        this.currentBg = 0;
        this.move = 0;
        this.colunaBg = 0;
        this.linhaBg = 0;
        this.currentCol = 0;
        this.currentLine = 0;
        this.moveLimit = (this.width/this.scl)*4;
        this.img.onload = () => {
            if(this.animateOnload) {
                this.animate(this.animation);
            } else {
                this.addImage(this.backgroundBaseImg, 0, 0, this.width/this.scl, this.height/this.scl);
            }
        }

        // document.addEventListener('keydown', function(evento) {
        //     this.eventKeyCode = evento.keyCode;  // r=37 | l=39 | up=38 | dn=40 | espaço=32 | ctrl=17 | alt=18 | altgr=225

        //     this.btnAction(evento.keyCode);
        //     console.log('teste:', this.eventKeyCode)
        // });
        // this.img.onload = () => this.animate(this.animation);

        // this.img.onload = () => this.addImage(this.backgroundImg, 0, 0, this.width/this.scl, this.height/this.scl)

        // Caso haja erro no caminho do arquivo
        this.img.onerror = () => {
            console.error('Erro ao carregar a imagem. Verifique o caminho em assets/img/');
        };
    }

    createObjFrame = (qtd=1, cols=1, lines=1, width=0, height=0, stepCol=0, stepLine=0) => {
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

    btnAction(key) {
        switch(key) {
            case 65:  // Ctrl - Reproduz um frame por vez ao clicar
                this.animate(false);
                break;
            case 68:  // AltGr - Volta a reproduzir normal
                this.animate();
                break;
            case 83:  // Alt - Reduz a velocidade
                this.speedDn();
                break;
            case 87:  // Espaço - Aumenta a velocidade
                this.speedUp();
                break;
            case 37:  // Direito - Move para direita
                this.moveLeft();
                break;
            case 38:  // Para cima - Move para cima
                this.moveUp()
                break;
            case 39:  // Esquerdo - Move para esquerda
                this.moveRigth();
                break;
            case 40:  // Para baixo - Move para baixo
                this.moveDn();
                break;
            case 98:  // Diminuir a imagem de fundo
                this.setBgScale(animate.backgroundScale - 0.1);
                break;
            case 104:  // Aumentar a imagem de fundo
                this.setBgScale(animate.backgroundScale + 0.1);
                break;
            case 107:  // Aumentar a imagem do sprite
                this.setSpriteScale(animate.spriteScale + 0.1);
                break;
            case 109:  // Diminuir a imagem do sprite
                this.setSpriteScale(animate.spriteScale - 0.1);
                break;
            default:
                break;
        }
    }

    addFrame(img='', x=0, y=0, cols=1, lines=1, speed=5, scale=1) {
        this.clear(); // Limpa o canvas

        // Verifica se existe, quando não existir 0 o contador
        if(!this.backgroundAnimation[this.currentBg]) this.currentBg = 0;

        // Recebendo os dados do frame atual do background
        const bg = this.backgroundAnimation[this.currentBg];

        // Imgagem de fundo
        if(this.imageStatus) {
            this.ctx.drawImage(
                this.backgroundImg,       // Imagem do background
                // widthFramaBg*this.colunaBg, heightFrameBg*this.linhaBg,
                bg.x, bg.y,               // Início do corte (X, Y)
                this.width, this.height,  // Tamanho do corte
                0, 0,                     // Onde desenhar no canvas (com dobro do tamanho)
                this.width * this.backgroundScale, this.height * this.backgroundScale  // Tamanho final
            );
        }

        let width = img.width / cols;
        let height = img.height / lines;
        this.speed = speed;

        if(this.currentCol < cols -1) this.currentCol++;
        else this.currentCol = 0;
        if(this.currentLine < lines -1) this.currentLine++;
        else this.currentLine = 0;

        this.ctx.drawImage(
            img,
            width*this.currentCol, height*this.currentLine,
            width, height,
            x, y,
            width*scale, height*scale
        );
    }

    alterBackGround(backGround='') {
        this.backgroundImg.src = backGround;
    }

    alterCharacter(character='') {
        this.img.src = character;
    }

    setProps(props=[]) {
      this.props = props;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }
    
    setSpriteScale(scale) {
      this.spriteScale = scale;
    }
    
    setBgScale(scale) {
      this.backgroundScale = scale;
    }

    setSpeed(speed) {
        this.speed = speed < 1 ? 1 : speed;
    }
    
    setMoveX(moveX) {
      this.moveX = moveX;
    }
    
    setMoveY(moveY) {
      this.moveY = moveY;
    }

    speedUp(type=0, limit=15, element=false) {
        if(this.speed >= limit) {
            clearInterval(this.intervalSpeed); 
            return;
        }

        if(type == 0) {
            clearInterval(this.intervalSpeed);
            this.speed ++;
        } else {
            this.intervalSpeed = setInterval(() => {
                this.speed ++;

                // if(element) document.querySelector(element).innerHTML = this.speed;

                if(this.speed >= limit) clearInterval(this.intervalSpeed); 
            }, 100);
        }
    }

    speedDn(type=0, limit=1, element=false) {
        if(this.speed <= limit) {
            clearInterval(this.intervalSpeed); 
            return;
        }

        if(type == 0) {
            clearInterval(this.intervalSpeed);
            this.speed --;
        } else {
            this.intervalSpeed = setInterval(() => {
                this.speed --;

                // if(element) document.querySelector(element).innerHTML = this.speed;

                if(this.speed <= limit) clearInterval(this.intervalSpeed); 
            }, 100);
        }
    }

    currentSpeed() {
        return this.speed;
    }

    moveRigth(move=10, type=0) {
        let frameW = this.props.animationFrames[0].w;
        let maxW = this.width + frameW;

        if(this.x >= maxW) this.x = 0 - frameW;

        if(type == 0) {
            clearInterval(this.intervalMove);
            this.x += move;
        } else {
            this.intervalMove = setInterval(() => {
                this.x += move;

                if(this.x >= maxW) this.x = 0 - frameW;
            }, move*3);
        }
    }

    moveLeft(move=10, type=0) {
        let frameW = this.props.animationFrames[0].w;
        let minW = 0 - frameW;

        if(this.x <= minW) this.x = this.width + frameW;

        if(type == 0) {
            clearInterval(this.intervalMove);
            this.x -= move;
        } else {
            this.intervalMove = setInterval(() => {
                this.x -= move;

                if(this.x <= minW) this.x = this.width+frameW;
            }, move*3);
        }
    }

    moveUp(move=10, type=0) {
        let frameH = this.props.animationFrames[0].h;
        let maxH = 0 - frameH;

        if(this.y <= maxH) this.y = this.height - maxH;

        if(type == 0) {
            clearInterval(this.intervalMove);
            this.y -= move;
        } else {
            this.intervalMove = setInterval(() => {
                this.y -= move;

                if(this.y <= maxH) this.y = this.height - maxH;
            }, move*3);
        }
    }

    moveDn(move=10, type=0) {
        let frameH = this.props.animationFrames[0].h;
        let maxH = this.height + frameH;

        if(this.y >= maxH) this.y = 0 - maxH;

        if(type == 0) {
            clearInterval(this.intervalMove);
            this.y += move;
        } else {
            this.intervalMove = setInterval(() => {
                this.y += move;

                if(this.y >= maxH) this.y = 0 - maxH;
            }, move*3);
        }
    }

    draw(x=0, y=0) {
        this.clear(); // Limpa o canvas

        // Verifica se existe, quando não existir 0 o contador
        if(!this.backgroundAnimation[this.currentBg]) this.currentBg = 0;

        // Recebendo os dados do frame atual do background
        const bg = this.backgroundAnimation[this.currentBg];

        // Imgagem de fundo
        if(this.imageStatus) {
            this.ctx.drawImage(
                this.backgroundImg,       // Imagem do background
                // widthFramaBg*this.colunaBg, heightFrameBg*this.linhaBg,
                bg.x, bg.y,               // Início do corte (X, Y)
                this.width, this.height,  // Tamanho do corte
                0, 0,                     // Onde desenhar no canvas (com dobro do tamanho)
                this.width * this.backgroundScale, this.height * this.backgroundScale  // Tamanho final
            );
        }

        // Verificando se o frame existe para o contador, quando não existe, zera o contador para voltar a primeira posição
        if(!this.animationFrames[this.currentFrame]) this.currentFrame = 0;
        if(this.x+this.move*100 > this.moveLimit) this.move = -5;


        // Pegamos os dados do frame atual do nosso mapa
        const f = this.animationFrames[this.currentFrame];

        // Desenhamos apenas o recorte definido no mapa
        this.ctx.drawImage(
            this.img,
            f.x, f.y,  // Início do corte (X, Y)
            f.w, f.h,  // Tamanho do corte
            x, y,      // Onde desenhar no canvas (com dobro do tamanho)
            f.w * this.spriteScale, f.h * this.spriteScale  // Tamanho final
        );

        // Para testes
        // this.addFrame(this.img, x, y, 2, 4, this.speed);
    }

    animate(animation=true) {
        this.stop();
        
        let x = this.moveX ? this.x+this.move*this.moveScale : this.x;
        let y = this.moveY ? this.y+this.move*this.moveScale : this.y;

        // Chamando a função que cria o desenho
        this.draw(x, y);

        // Para testes
        // this.addFrame(this.backgroundImg, 0, 0, 10, 1, this.speed, 1.25);
        // this.addFrame(this.img, x, y, 2, 4, this.speed);

        this.currentFrame++;
        this.currentBg++;
        this.move++;

        const speed = 1000/this.speed;

        if(!animation) {clearTimeout(this.timerId); return;} 

        this.timerId = setTimeout(() => {
            requestAnimationFrame(() => this.animate());
        }, speed);
    }

    stop() {
        clearTimeout(this.timerId);
    }
}