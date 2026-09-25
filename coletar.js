const fs = require('fs');

const marcas = [
  "Fiat", "Chevrolet", "Volkswagen", "Ford", "Renault", 
  "Toyota", "Hyundai", "Honda", "Nissan", "Jeep", "Peugeot", "Citroen",
  
  "Mitsubishi", "BMW", "Mercedes", "Audi", "Kia", "Volvo", "Land Rover",
  "Porsche", "Mini", "Dodge", "Chrysler", "Lexus", "Suzuki",

  "Alfa Romeo", "Chery", "Caoa Chery", "JAC", "SEAT", "Subaru", 
  "Daewoo", "Mazda", "Troller", "JPX", "Lada", "SsangYong",

  "Yamaha", "Kawasaki", "Harley-Davidson", "Triumph", "Ducati", 
  "Dafra", "Kasinski", "Sundown", "KTM", "Royal Enfield", "Husqvarna", "Shineray"
];

const categorias = ['carro', 'moto']; 

async function baixarTudo() {
  console.log("Iniciando a operação arrastão na base da Moura... Segura peão!\n");
  let bancoCompleto = [];

  for (const categoria of categorias) {
    for (const marca of marcas) {
      try {
        const url = `https://moura.com.br/api/mf-search/${categoria}/_complete?s=${marca}`;
        const resposta = await fetch(url);
        
        if (!resposta.ok) continue; 
        
        const dados = await resposta.json();
        
        if (dados.length > 0) {
          console.log(`Pescado: ${marca} (${categoria}) -> ${dados.length} modelos`);
          bancoCompleto.push(...dados);
        }
      } catch (erro) {
      }
    }
  }

  const mapaUnico = new Map();
  bancoCompleto.forEach(item => {
    const chave = item.id || `${item.car || item.motorcycle}-${item.battery}`;
    mapaUnico.set(chave, item);
  });
  const dadosFinais = Array.from(mapaUnico.values());

  fs.writeFileSync('baterias_moura.json', JSON.stringify(dadosFinais, null, 2), 'utf-8');
  console.log(`\nBOOM! 💥 Coleta finalizada. ${dadosFinais.length} veículos/motos salvos com sucesso em "baterias_moura.json".`);
}

baixarTudo();