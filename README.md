# ⚡ Sistema Moura Turbo - O Terror da Concorrência

Se você perde tempo caçando qual bateria serve na lasanha do cliente ou medindo caixa com trena para calcular frete, seus problemas acabaram. Este projeto é um extrator e buscador automatizado da base de dados oficial da Moura, feito sob medida para quem precisa de agilidade na hora de montar anúncios, fechar vendas no balcão (ou no Zap) e não errar a mão na margem de lucro.

## 🚀 O que essa belezinha faz?
* **Arrastão de Dados:** Puxa a lista completa de aplicações (carros, jipes clássicos, motos normais e motos grandes) direto da API da Moura.
* **Gerador de Ficha Técnica:** Cospe as especificações da bateria prontas para o Ctrl+C / Ctrl+V na descrição do anúncio.
* **Cálculo de Logística:** Calcula o peso real e o peso cubado (fator 6000) automaticamente, para você bater o custo exato de embalagem e frete sem destruir sua margem de lucro.
* **Buscador Reverso (Anti-Devolução):** O cliente não sabe a bateria, mas sabe que tem um "Marea Turbo"? O sistema acha a bateria para ele e ainda avisa se o carro precisa de linha AGM/EFB (Start-Stop), evitando devoluções por compra errada.

## 🛠️ Pré-requisitos
A única coisa que você precisa ter instalada no computador é o **Node.js**. Se já está rodando no VS Code, você já está com a faca e o queijo na mão.

## 📦 Arquivos do Projeto
* `coletar.js`: O trator. Ele varre as categorias e montadoras na API da Moura e salva tudo localmente.
* `baterias_moura.json`: O pote de ouro. Arquivo gerado pelo trator, contendo milhares de veículos e suas respectivas baterias.
* `filtrar.js`: O caixa da loja. É o painel interativo onde você faz as buscas em milissegundos sem depender da internet.

## 🎮 Como usar essa maravilha

### Passo 1: Abastecer o Estoque (Rodar apenas uma vez ou para atualizar)
Abra o terminal do VS Code e mande o trator trabalhar:
`bash
node coletar.js
`
*Ele vai demorar uns segundinhos rodando a lista de montadoras. Quando aparecer a mensagem de "BOOM!", o seu arquivo `baterias_moura.json` estará criado.*

### Passo 2: O Dia a Dia das Vendas
Com o banco de dados salvo, é só chamar o sistema interativo:
`bash
node filtrar.js
`
O painel vai abrir com 3 opções:
1. **Buscar Bateria:** Digite o código (ex: `M60GD`, `MA8,6`) e receba a lista de carros e os dados de cubagem para as transportadoras.
2. **Buscar Veículo:** Digite o nome do carro/moto (ex: `Gallardo`, `Biz`) e descubra qual modelo empurrar pro cliente.
3. **Sair:** Fecha a lojinha.

## ⚠️ Avisos Importantes
* **Motos:** Para as baterias de moto que levam hífen no catálogo oficial, o sistema é esperto o suficiente para ignorar frescuras, mas tente digitar o código certinho (ex: `MA5-D`).
* **Start-Stop:** Fique de olho nos alertas vermelhos de `AGM` e `EFB`. Vender bateria convencional para carro Start-Stop é pedir para o cliente abrir reclamação no Mercado Livre daqui a dois meses.