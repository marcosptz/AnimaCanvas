// Dentro do seu Character.js
class Character extends AnimaCanvas {
    constructor(element, props, name, imgPath) {
        super(element, props);
        this.name = name;
        this.img = new Image();
        this.img.src = imgPath;
        this.backgroundImg =  new Image();
        this.backgroundImg.src = typeof props.backgroundImage == 'undefined' ? '' : props.backgroundImage;
        this.imageStatus = typeof props.backgroundImage == 'undefined' ? false : true;
        this.animationFrames = typeof props.animationFrames == 'undefined' ? [{x: 0, y: 0}] : props.animationFrames;
        this.animation = typeof props.animation == 'undefined' ? true : props.animation;  // Aiva a animação ao instanciar a classe, default é sempre ativa
        this.x = typeof props.x == 'undefined' ? 0 : props.x;  // Define a posição x
        this.y = typeof props.y == 'undefined' ? 0 : props.y;  // Define a posição y
        this.speed = typeof props.speed == 'undefined' ? 5 : props.speed;  // Define a velocidade
        this.spriteScale = typeof props.spriteScale == 'undefined' ? 2 : props.spriteScale;  // Aumenta o tamanho do sprite sem distorcer
        this.currentFrame = 0;
        this.move = 0;
        this.moveLimit = (this.width/this.scl)*4;
        this.img.onload = () => this.animate(this.animation);
    }

    draw(x=0, y=0) {
        this.clear(); // Limpa o canvas

        // Imgagem de fundo
        if(this.imageStatus) this.addImage(this.backgroundImg, 0, 0, (this.width/this.scl), (this.height/this.scl));

        // Verificando se o frame existe para o contador, quando não existe, zera o contador para voltar a primeira posição
        if(!this.animationFrames[this.currentFrame]) this.currentFrame = 0;
        if(this.x+this.move*100 > this.moveLimit) this.move = -5;

        // console.log('this.move', this.x+this.move*100)

        // Pegamos os dados do frame atual do nosso mapa
        const f = this.animationFrames[this.currentFrame];

        // O segredo para não ficar desproporcional é manter sw/sh iguais a dw/dh
        // ou usar uma escala proporcional
        // const spriteScale = 2; // Aumenta o tamanho do sprite sem distorcer
        // this.addImage(this.backgroundImg, 0, 0, (personage.width/this.scl)*1.01, (personage.height/this.scl)*1.01);

        // Desenhamos apenas o recorte definido no mapa
        this.ctx.drawImage(
            this.img,
            f.x, f.y,  // Início do corte (X, Y)
            f.w, f.h,  // Tamanho do corte
            x, y,      // Onde desenhar no canvas (com dobro do tamanho)
            f.w * this.spriteScale, f.h * this.spriteScale  // Tamanho final
        );

        // this.ctx.drawImage(
        //     this.img, 
        //     this.frameX * this.spriteWidth, 260, // Início do corte (X, Y)
        //     this.spriteWidth, this.spriteHeight, // Tamanho do corte
        //     x, y,                            // Posição no Canvas
        //     this.spriteWidth * spriteScale, this.spriteHeight * spriteScale // Tamanho final
        // );
    }

    animate(animation=true) {
        // Chamando a função que cria o desenho
        this.draw(this.x+this.move*100, this.y);

        this.currentFrame++;
        this.move++;

        const speed = 1000/this.speed;

        // this.currentFrame = (this.currentFrame + 1) % this.maxFrames;  // this.animationFrames.length;
        // this.frameX = (this.frameX + 1) % this.maxFrames;

        if(!animation) return; 

        this.timerId = setTimeout(() => {
            requestAnimationFrame(() => this.animate());
        }, speed);
    }

    pause() {
        clearTimeout(this.timerId);
    }
}