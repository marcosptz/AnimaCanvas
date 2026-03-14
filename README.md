# AnimaCanvas.js 🎨🚀

**AnimaCanvas** é uma biblioteca JavaScript leve e independente desenvolvida para facilitar a criação de animações e jogos 2D utilizando o poder do HTML5 Canvas. Ela serve como a classe base (engine) para gerenciar renderização, escalas, zoom e loops de animação.

Este projeto faz parte do ecossistema de ferramentas web desenvolvidas por **MarcosPetzinger**, focando em simplicidade e performance.

## 🌟 Principais Recursos

* **Orientação a Objetos:** Estrutura baseada em classes (`ES6`), permitindo fácil extensão para personagens e objetos.
* **Gestão de Escala:** Sistema interno para lidar com proporções e medidas (mm para px).
* **Controle de Zoom:** Funções integradas para manipulação visual da mesa de trabalho.
* **Extensível:** Feito para ser a base de bibliotecas mais complexas ou jogos específicos.
* **Mobile Friendly:** Desenvolvido para funcionar diretamente via protocolo `file://`, facilitando testes rápidos em dispositivos móveis.

---

## 🚀 Como começar

### 1. Instalação

Basta incluir os arquivos na ordem correta no seu projeto. Como a biblioteca utiliza herança de classes, a ordem de carregamento é essencial:

```html
<script src="assets/js/AnimaCanvas.js"></script>
<script src="assets/js/Character.js"></script>
<script src="assets/js/main.js"></script>

```

### 2. Uso Básico

Para criar um novo motor de animação, instancie a classe apontando para o ID do seu container HTML:

```javascript
// main.js
const app = new AnimaCanvas('meu-container', {
    width: 210,   // Largura em mm
    height: 297,  // Altura em mm
    scale: 11.811 // Definição de escala personalizada
});

```

### 3. Criando um Personagem (Character)

A força da biblioteca está na extensão. Você pode criar personagens que herdam as propriedades do motor:

```javascript
class Hero extends AnimaCanvas {
    constructor(element, props, name, imgPath) {
        super(element, props);
        this.name = name;
        this.img = new Image();
        this.img.src = imgPath;
    }
    
    // Implemente sua lógica de desenho e animação aqui
}

```

---

## 🛠 Arquitetura do Projeto

* **`AnimaCanvas.js`**: O núcleo da biblioteca. Gerencia o elemento `<canvas>`, o contexto 2D e as propriedades globais.
* **`Character.js`**: Classe modelo para criação de entidades animadas com suporte a Sprite Sheets.
* **`main.js`**: Ponto de entrada para inicialização da lógica do seu projeto específico.

---

## 📱 Testes Mobile

Esta biblioteca foi projetada para funcionar sem a necessidade obrigatória de módulos (`type="module"`), permitindo que você teste seus avanços diretamente no navegador do celular abrindo o arquivo `index.html`.

---

## 🤝 Contribuições

Sinta-se à vontade para abrir *Issues* ou enviar *Pull Requests*. Toda ajuda para tornar o **AnimaCanvas** mais robusto é bem-vinda!

**Desenvolvido por [Marcos Petzinger**](https://www.google.com/search?q=https://github.com/marcosptz)