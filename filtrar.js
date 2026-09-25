const fs = require('fs');
const readline = require('readline');

if (!fs.existsSync('baterias_moura.json')) {
  console.error('Erro: Arquivo "baterias_moura.json" sumiu. Roda o coletar.js primeiro, consagrado!');
  process.exit(1);
}
const dados = JSON.parse(fs.readFileSync('baterias_moura.json', 'utf-8'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menuPrincipal() {
  console.log('\n==================================================');
  console.log('⚡ SISTEMA MOURA TURBO - MODO VENDEDOR NINJA ⚡');
  console.log('==================================================');
  console.log('1. Buscar Bateria (Gera Ficha Técnica p/ Anúncio)');
  console.log('2. Buscar Veículo (Descobre a bateria do cliente)');
  console.log('3. Fechar a lojinha');
  
  rl.question('\nEscolha uma opção (1, 2 ou 3): ', (opcao) => {
    switch (opcao.trim()) {
      case '1':
        buscarPorBateria();
        break;
      case '2':
        buscarPorVeiculo();
        break;
      case '3':
        console.log('\nBora descansar que o mercado livre não dorme, mas a gente sim. Falou!');
        rl.close();
        break;
      default:
        console.log('\nOpção inválida, chefe. Tenta de novo.');
        menuPrincipal();
        break;
    }
  });
}

function buscarPorBateria() {
  rl.question('\nDigite o modelo da bateria (ex: M60GD, MA70LD): ', (resposta) => {
    const modeloBateria = resposta.trim().toUpperCase();
    const registros = dados.filter(item => item.battery && item.battery.toUpperCase() === modeloBateria);

    if (registros.length === 0) {
      console.log(`\nIh, rapaz... Nenhum registro pra bateria "${modeloBateria}". Certeza que o código é esse mesmo?`);
      return menuPrincipal();
    }

    const spec = registros[0];
    
    const compativeis = registros.map(item => item.car || item.motorcycle).filter(Boolean);
    const listaLimpa = [...new Set(compativeis)].sort();

    console.log(`\n==================================================`);
    console.log(`📋 FICHA TÉCNICA PRONTA PARA O ANÚNCIO - ${modeloBateria}`);
    console.log(`==================================================`);
    console.log(`Tensão: 12V`);
    console.log(`Amperagem: ${spec.amper}Ah`);
    console.log(`CCA (Corrente de Partida): ${spec.cca}`);
    console.log(`Garantia: ${spec.garantia} meses`);
    console.log(`Tecnologia: ${spec.type || 'CONVENCIONAL'}`);
    
    if (spec.type === 'AGM' || spec.type === 'EFB') {
        console.log(`\n🚨 AVISO IMPORTANTE PARA A DESCRIÇÃO 🚨`);
        console.log(`"Bateria com tecnologia ${spec.type}. Projetada especialmente para veículos com sistema START-STOP."`);
    }

    const comprimentoCm = spec.length / 10;
    const larguraCm = spec.width / 10;
    const alturaCm = spec.height / 10;
    const volumeCm3 = comprimentoCm * larguraCm * alturaCm;
    const pesoCubado = (volumeCm3 / 6000).toFixed(2);

    console.log(`\n📦 DADOS DE LOGÍSTICA E FRETE`);
    console.log(`Dimensões (CxLxA): ${spec.length}mm x ${spec.width}mm x ${spec.height}mm`);
    console.log(`Peso Real: ${spec.weight} kg`);
    console.log(`Peso Cubado (Fator 6000): ~${pesoCubado} kg`);

    console.log(`\n🚗 VEÍCULOS COMPATÍVEIS (${listaLimpa.length})`);
    console.log(listaLimpa.join('\n'));
    console.log(`==================================================\n`);

    menuPrincipal();
  });
}

function buscarPorVeiculo() {
  rl.question('\nQual a lasanha do cliente? (ex: Gallardo, Marea, Biz): ', (resposta) => {
    const busca = resposta.trim().toUpperCase();

    const encontrados = dados.filter(item => {
      const nomeCarro = (item.car || '').toUpperCase();
      const nomeMoto = (item.motorcycle || '').toUpperCase();
      return nomeCarro.includes(busca) || nomeMoto.includes(busca);
    });

    if (encontrados.length === 0) {
      console.log(`\nVish... Não achei nenhuma bateria para "${resposta}". O cliente adaptou motor de geladeira no carro?`);
      return menuPrincipal();
    }

    console.log(`\n🔍 RESULTADOS PARA "${resposta.toUpperCase()}":`);
    
    const resultadosGerais = encontrados.map(item => {
        const veiculo = item.car || item.motorcycle;
        return `- ${veiculo} -> Vende a bateria: [ ${item.battery} ]`;
    });
    
    const listaUnica = [...new Set(resultadosGerais)].sort();
    console.log(listaUnica.join('\n'));

    menuPrincipal();
  });
}

menuPrincipal();