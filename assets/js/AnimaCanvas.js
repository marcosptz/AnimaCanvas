class AnimaCanvas {  // Caso for exportar como módulo, usar "export default" antes de class, "export default class"
    constructor(element=null, props={}) {
		// Se não for definido nenhum elemento, então encerra e execução
		if(!element) {
			console.log('Nenhum elemento foi definido:', this.element);
			return;
		}

        this.element = element;
        this.props = props;
        this.scl = typeof props.scale == 'undefined' ? 11.811 : props.scale;
        this.width = typeof props.width == 'undefined' ? this.scale(300) : this.scale(props.width);
		this.height = typeof props.height == 'undefined' ? this.scale(210) : this.scale(props.height);
		this.height_box = typeof props.height_box == 'undefined' ? '66vh' : props.height_box;
		this.max_height_box = typeof props.max_height_box == 'undefined' ? '66vh' : props.max_height_box;
		this.add_class = typeof props.add_class == 'undefined' ? '' : props.add_class;
		this.overflow_x = typeof props.overflow_x == 'undefined' ? 'auto' : props.overflow_x;
		this.overflow_y = typeof props.overflow_y == 'undefined' ? 'auto' : props.overflow_y;
		this.currentZoom = 1.0;
		this.html = `<div class="box ${this.add_class}" id="box">
						<canvas class="canvas" id="canvas" width="${this.width}" height="${this.height}">
							<h3>Seu navegador não tem suporte ao canvas</h3>
						</canvas>
					</div>`;

        // Pegando os elementos
        this.element = document.getElementById(element);
		this.element.innerHTML = this.html;
		this.box = document.getElementById('box');

		// Configuração do Container (A "Mesa de Trabalho")
		this.box.style.width = '100%';
		this.box.style.height = this.height_box;
		this.box.style.maxHeight = this.max_height_box;
		this.box.style.display = 'flex';
		this.box.style.flexDirection = 'column';
		this.box.style.alignItems = 'center'; 
		this.box.style.padding = '20px auto';
		this.box.style.backgroundColor = '#696969';
		this.box.style.border = 'solid #363636 2px';

		// Forma correta de aplicar !important no JS
		this.box.style.setProperty('overflow-x', this.overflow_x, 'important');
		this.box.style.setProperty('overflow-y', this.overflow_y, 'important');

		// Configuração do Canvas (O "Papel")
		this.canvas = document.getElementById('canvas');
		this.canvas.style.width = '100%'; 
        this.canvas.style.height = 'auto';
        this.canvas.style.maxWidth = '800px'; // Ajuste conforme sua preferência de UI
        this.canvas.style.backgroundColor = '#FFFAFA'; // Cor de papel (branco gelo)
        this.canvas.style.border = 'solid #4F4F4F 1px'; // Borda fina para o papel
        this.canvas.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)'; // Sombra para dar profundidade
        this.canvas.style.display = 'block';
	    this.canvas.style.margin = 'auto';

	    // Adicionando o Canvas a variável ctx
    	this.ctx = this.canvas.getContext('2d');

    	// Adicionando a escala para os estilos de sublinhados para as linhas
		this.obj_dotted = [this.scale(1.2), this.scale(1.2)];
		this.obj_dashed = [this.scale(3.6), this.scale(1.8)];

		// Chama a função para aplicar o tamanho inicial
		this.updateZoom();
    }

	gameLoop(img) {
		this.img = new Image();
		// this.sheet = new Spritesheet(this.ctx, img, 3, 8);
	}

	nextFrame() {
        // Momento atual
        var now = new Date().getTime();
        // Se ainda não tem último tempo medido
        if (! this.lastTime) this.lastTime = now;
        // Já é hora de mudar de coluna?
        if (now - this.lastTime < this.interval) return;
        if (this.col < this.numCols - 1)
        this.col++;
        else
        this.col = 0;

        // Guardar hora da última mudança
        this.lastTime = now;
    }

    draw(x, y, lines, cols) {
		this.numLines = lines;
        this.numCols = cols;
        this.interval = 0;
        this.lin = 0;
        this.col = 0;

        let frameWidth = this.imagem.width / this.numCols;
        let frameHeight = this.imagem.height / this.numLines;
        let width = 10;
        let height = 10;

		this.ctx.drawImage(
			img,
			10,
			10,
			largura,
			altura,
			100, // Posição no canvas onde quero desenhar
			100,
			largura,
			altura
		);
    }

    /**
	 * Método que desenha uma texto
	 * @param {string} text 
	 * @param {float} x 
	 * @param {float} y 
	 * @param {object} props
	 * *Prorpiedade do parâmetro:*
	 * - font_size: Determina determina o tamanho da fonte do texto, float
	 * - font_text: Determina o tipo de fonte do texto, float
	 * - font_color: Determina a cor do texto, default preto, string
	 * - font_style: Determina o estilo do texto, se tera negrito, string
	 * - font_weight: Determina se o texto sará italico, default preto, string
	 * - rotation: Determina a rotação do texto, a rotação será feita pelo eixo x e y da figura, integer
	 */
	text(text='', x=5, y=5, props={}) {
		let font_size = typeof props.font_size == 'undefined' ? this.scale(10)/2.416 : this.scale(props.font_size)/2.416;
		let font_text = typeof props.font_text == 'undefined' ? 'Arial' : props.font_text;
		let font_color = typeof props.font_color == 'undefined' ? '#000000' : props.font_color;
		let font_style = typeof props.font_style == 'undefined' ? 'normal' : props.font_style; // bold
		let font_weight = typeof props.font_weight == 'undefined' ? 'normal' : props.font_weight;  // italic
		let fill = typeof props.fill == 'undefined' ? true : props.fill;
		let rotation = typeof props.rotation == 'undefined' ? 0 : props.rotation;
		let size = typeof props.font_size == 'undefined' ? 10 : props.font_size;
		let underlined = typeof props.underlined == 'undefined' ? false : props.underlined;
        let style_line = typeof props.style_line == 'undefined' ? 0 : props.style_line;
		let info_text = 0;  // this.ctx.measureText(text);  // Busca informações da largura do texto
		let width_text = 0; // info_text.width*(size*0.021);
		let height_text = size*0.3;
		let width = size*0.3;// info_text.width*(size*0.021); // (0.177*size)*text.length;
		let height = size*0.3;
		let esp = this.scale(0.5);
		let translate_x = 0;
		let translate_y = 0;
		let line = this.scl > 4 ? 0.21 : 0.41;
		let x_line = x;
		let y_line = y;

		x = this.scale(x)+esp*0.8;
		y = this.scale(y)+esp*1.473;
		width = this.scale(width);
		height = this.scale(height);
		translate_x = x + width/2;
		translate_y = y + height/2;
	
		this.ctx.font = `${font_style} ${font_weight} ${font_size}px ${font_text}`;
		this.ctx.fillStyle = font_color;
		this.ctx.save();
		this.ctx.translate(translate_x, translate_y);
		this.ctx.rotate(rotation * Math.PI / 180);
		this.ctx.translate(-translate_x, -translate_y);

		info_text = this.ctx.measureText(text);
		width_text = info_text.width/this.scl;

		// Sublinhando o texto
		if(underlined) this.line(x_line, y_line+height_text+1.5, width_text+x_line, y_line+height_text+1.5, {color: font_color, style_line});
		
		if(fill) {
			this.ctx.fillText(text, x, y+height);
			this.ctx.restore();
		} else {
			this.ctx.strokeText(text, x, y+height);
			this.ctx.restore();
		}
	}

	/**
	 * **Método que desenha uma figura quadrilátera**
	 * @param {float} x - Posição x da figura
	 * @param {float} y - Posição y da figura
	 * @param {float} width - Largura da figura
	 * @param {float} height - Altura da figura
	 * @param {object} props - Objeto que especifica as propriedades da figura: 
	 * - radius: Determina a curvatura dos cantos, float
	 * - esp: Determina a espessura das linha da figura, float
	 * - color: Determina a cor das linhas, default preto, string
	 * - fill: Determina se a figura vai ter preenchimento, bolean
	 * - fill_color: Determina a cor de preenchimento da figura, default preto, string
	 * - rotation: Determina a rotação da figura, a rotação será feita pelo eixo central da figura
	 */
	roundedRect(x, y, width, height, props={}) {
		let radius = typeof props.radius == 'undefined' || typeof props.radius == 'object' ? 0 : this.scale(props.radius);
		let esp = typeof props.esp == 'undefined' ? this.scale(0.5) : this.scale(props.esp);
		let style_line = typeof props.style_line == 'undefined' ? 0 : props.style_line;
		let color = typeof props.color == 'undefined' ? '#000000' : props.color;  // rgba(0, 0, 0, 1)
		let fill = typeof props.fill == 'undefined' ? false : props.fill;
  		let fill_color = typeof props.fill_color == 'undefined' ? '#000000' : props.fill_color;
  		let rotation = typeof props.rotation == 'undefined' ? 0 : props.rotation;
		let radius_top_left = typeof props.radius == 'object' && typeof props.radius.top_left != 'undefined'  ? this.scale(props.radius.top_left) : radius;
		let radius_top_right = typeof props.radius == 'object' && typeof props.radius.top_right != 'undefined' ? this.scale(props.radius.top_right) : radius;
		let radius_bottom_left = typeof props.radius == 'object' && typeof props.radius.bottom_left != 'undefined' ? this.scale(props.radius.bottom_left) : radius;
		let radius_bottom_right = typeof props.radius == 'object' && typeof props.radius.bottom_right != 'undefined' ? this.scale(props.radius.bottom_right) : radius;
		let translate_x = 0;
		let translate_y = 0;
		let obj_line = [0, 0];

		if(style_line == 1) obj_line = this.obj_dotted;
		if(style_line == 2) obj_line = this.obj_dashed;

		x = this.scale(x)+esp*0.8;
		y = this.scale(y)+esp*0.8;
		width = this.scale(width);
		height = this.scale(height);
		translate_x = x + width/2;
		translate_y = y + height/2;

		this.ctx.save();
		this.ctx.translate(translate_x, translate_y);
		this.ctx.rotate(rotation * Math.PI / 180);
		this.ctx.translate(-translate_x, -translate_y);

		this.ctx.strokeStyle = color;
		this.ctx.lineWidth = esp;
		this.ctx.fillStyle = fill_color;

		this.ctx.setLineDash(obj_line);
		this.ctx.beginPath();
		this.ctx.moveTo(x, y + radius_top_left);  // Radius top-left
		this.ctx.lineTo(x, y + height - radius_bottom_left);  // Radius bottom-left
		this.ctx.quadraticCurveTo(x, y + height, x + radius_bottom_left, y + height);
		this.ctx.lineTo(x + width - radius_bottom_right, y + height);  // Radius bottom-right
		this.ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius_bottom_right);  // Radius bottom-right
		this.ctx.lineTo(x + width, y + radius_top_right);  // Radius top-right
		this.ctx.quadraticCurveTo(x + width, y, x + width - radius_top_right, y);  // Radius top-right
		this.ctx.lineTo(x + radius_top_left, y);  // Radius top-left
		this.ctx.quadraticCurveTo(x, y-0.1, x, y + radius_top_left);  // Radius top-left
		this.ctx.stroke();
		if(fill) this.ctx.fill();
		this.ctx.restore();
	}

	/**
	 * Método que desenha um círculo
	 * @param {float} x - Posição x da figura
	 * @param {float} y - Posição y da figura
	 * @param {float} diameter - Diâmetro do círculo
	 * @param {float} props - Objeto que especifica as propriedades do círculo: 
	 * - color: Determina a cor das linhas, default preto, string;
	 * - esp: Determina a espessura das linha da figura, float;
	 * - fill: Determina se a figura vai ter preenchimento, bolean;
	 * - fill_color: Determina a cor de preenchimento da figura, default preto, string
	 */
  	circle(x=5, y=5, diameter=15, props={}) {
  		let color = typeof props.color == 'undefined' ? '#000000' : props.color;
  		let esp = typeof props.esp == 'undefined' ? this.scale(0.5) : this.scale(props.esp);
  		let fill = typeof props.fill == 'undefined' ? false : props.fill;
  		let fill_color = typeof props.fill_color == 'undefined' ? '#000000' : props.fill_color;
		let style_line = typeof props.style_line == 'undefined' ? 0 : props.style_line;
		let obj_line = [0, 0];

		if(style_line == 1) obj_line = this.obj_dotted;
		if(style_line == 2) obj_line = this.obj_dashed;

		diameter = this.scale(diameter);
		x = this.scale(x)+diameter+esp*0.7;
		y = this.scale(y)+diameter+esp*0.7;

		this.ctx.setLineDash(obj_line);
  		this.ctx.beginPath();
    	this.ctx.arc(x, y, diameter, 0, Math.PI * 2, true);
    	this.ctx.lineWidth = esp;
    	this.ctx.strokeStyle = color;
    	this.ctx.fillStyle = fill_color;
    	this.ctx.stroke();
    	if(fill) this.ctx.fill();
  	}

	/**
	 * Método que desenha uma linha
	 * @param {float} x - Posição x da linha
	 * @param {float} y - Posição y da linha
	 * @param {float} width - Largura de comprimento da linha
	 * @param {float} height - Altura de comprimento da linha
	 * @param {object} props - Objeto que especifica as propriedades da figura: 
	 * - color: Determina a cor das linhas, default preto, string;
	 * - esp: Determina a espessura das linha da figura, float;
	 * - fill: Determina se a figura vai ter preenchimento, bolean;
	 * - fill_color: Determina a cor de preenchimento da figura, default preto, string
	 */	
  	line(x=10, y=10, width=50, height=10, props={}) {
  		let color = typeof props.color == 'undefined' ? '#000000' : props.color;
  		let esp = typeof props.esp == 'undefined' ? this.scale(0.5) : this.scale(props.esp);
		let style_line = typeof props.style_line == 'undefined' ? 0 : props.style_line;
  		let fill = typeof props.fill == 'undefined' ? false : props.fill;
  		let fill_color = typeof props.fill_color == 'undefined' ? '#000000' : props.fill_color;
		let rotation = typeof props.rotation == 'undefined' ? 0 : props.rotation;
		let translate_x = 0;
		let translate_y = 0;
		let obj_line = [0, 0];

		if(style_line == 1) obj_line = this.obj_dotted;
		if(style_line == 2) obj_line = this.obj_dashed;

		x = this.scale(x);
		y = this.scale(y);
		width = this.scale(width);
		height = this.scale(height);
		translate_x = x + width/2;
		translate_y = y + height/2;

		this.ctx.save();
		this.ctx.translate(translate_x, translate_y);
		this.ctx.rotate(rotation * Math.PI / 180);
		this.ctx.translate(-translate_x, -translate_y);

  		this.ctx.lineWidth = esp;
    	this.ctx.strokeStyle = color;
    	this.ctx.fillStyle = fill_color;
		this.ctx.setLineDash(obj_line);
  		this.ctx.beginPath();
	    this.ctx.moveTo(width, height);
	    this.ctx.lineTo(x, y);
	    this.ctx.stroke();
	    if(fill) this.ctx.fill();
		this.ctx.restore();
  	}

	/**
	 * Método que desenha uma figura quadrilátera
	 * @param {float} x - Posição x da linha
	 * @param {float} y - Posição y da linha
	 * @param {float} width - Largura da figura
	 * @param {float} height - Altura d afigura
	 * @param {float} esp - Determina a espessura das linha da figura
	 * @param {string} color - Determina a cor da figura, default preto
	 */
  	rect(x=5, y=5, width=20, height=20, props={}) {
		let color = typeof props.color == 'undefined' ? '#000000' : props.color;
  		let esp = typeof props.esp == 'undefined' ? false : this.scale(props.esp);
  		let rotation = typeof props.rotation == 'undefined' ? 0 : props.rotation;
		let translate_x = 0;
		let translate_y = 0;

		x = this.scale(x);
		y = this.scale(y);
		width = this.scale(width);
		height = this.scale(height);
		esp = this.scale(esp);
		translate_x = x + width/2;
		translate_y = y + height/2;

		this.ctx.save();
		this.ctx.translate(translate_x, translate_y);
		this.ctx.rotate(rotation * Math.PI / 180);
		this.ctx.translate(-translate_x, -translate_y);

	    this.ctx.fillStyle = color;
	    this.ctx.fillRect(x, y, width, height);
	    if(esp) this.ctx.clearRect(x+esp/2, y+esp/2, width-esp, height-esp);
		this.ctx.restore();
  	}

	/**
	 * Método que desenha uma imagem
	 * @param {ImageData} img 
	 * @param {float} x 
	 * @param {float} y 
	 * @param {float} width 
	 * @param {float} height 
	 * @param {integer} rotation 
	 */
	addImage(img, x=5, y=5, width=20, height=20, rotation=0) {
		let translate_x = 0;
		let translate_y = 0;
		let scale = 2;

		x = this.scale(x);
		y = this.scale(y);
		width = this.scale(width);
		height = this.scale(height);
		translate_x = x + width/2;
		translate_y = y + height/2;

		this.ctx.save();
		this.ctx.translate(translate_x, translate_y);
		this.ctx.rotate(rotation * Math.PI / 180);
		this.ctx.translate(-translate_x, -translate_y);

		this.ctx.drawImage(img, x, y, width, height);
		this.ctx.restore();
	}

    /**
	 * Altera o nível de zoom
	 * @param {float} value - Ex: 1.2 para 120%
	 */
	setZoom(value) {
	    this.currentZoom = value;
	    this.updateZoom();
	}

	/**
	 * Atualiza visualmente o tamanho de todos os canvases no container
	 */
	updateZoom() {
	    // Calculamos a largura base em pixels na tela (ex: 210mm convertido)
	    // Usamos 3.78 como fator de conversão mm -> px para visualização em 96 DPI
	    const baseWidth = 210 * 3.78; 
	    const newWidth = baseWidth * this.currentZoom;

	    this.box.querySelectorAll('.canvas').forEach(canv => {
	    	canv.style.maxWidth = 'none';
	        canv.style.width = `${newWidth}px`;
	        canv.style.height = 'auto'; // Mantém a proporção
	    });
	}

	/**
	 * Método que define a escala no qual será renderizado no canvas
	 * @param {float} mm
	 * @returns
	 */
	scale(mm) {
		return mm * this.scl;
	}

    /**
	 * Método que limpa a área do canvas, possível passar as cordenadas da área a ser limpada
	 * @param {float} x Define a posição x onde inicia a aŕea a ser limpada
	 * @param {float} y Define a posição y onde inicia a aŕea a ser limpada
	 * @param {float} w Define a largura da área que será limpa
	 * @param {float} h Define a altura da área que será limpa
	 */
	clear(x=0, y=0, w=this.canvas.width, h=this.canvas.height) {
		x = this.scale(x);
		y = this.scale(y);
		w = this.scale(w) + this.scl;
		h = this.scale(h) + this.scl;

  		this.ctx.clearRect(x, y, w, h);
  	}

	/**
	 * Método que reseta o Canvas
	 */
	reset() {
		this.ctx.reset();
	}

    /***** Caso seja necessário, adicione aqui os métodos novos *****/
	/** code... **/
	/***************************** Fim ******************************/
}