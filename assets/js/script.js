// script.js
const context = document.getElementById('canvas_teste').getContext('2d');
const img = new Image();
img.src = 'assets/img/sonic1.png'; // Defina o caminho

// OBRIGATÓRIO: Esperar o carregamento
img.onload = function() {
  console.log('Imagem carregada com sucesso!');
  
  // Agora sim, desenhamos
  context.drawImage(img, 10, 25, 50, 50, 50, 50, 50, 50); 
  
  // Se quiser usar o texto como teste também
  context.fillText('Teste...', 10, 10);
};

// Caso haja erro no caminho do arquivo
img.onerror = function() {
  console.error('Erro ao carregar a imagem. Verifique o caminho em assets/img/');
};