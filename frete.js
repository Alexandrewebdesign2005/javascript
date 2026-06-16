// Importa o módulo readline para ler a entrada do teclado
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

// Utilizamos recursividade ou encadeamento de promessas para ler várias linhas no terminal
// Para simplificar, faremos uma função assíncrona que lê tudo
async function calcularFrete() {
    const question = (str) => new Promise(resolve => readline.question(str, resolve));

    // Entrada de dados
    const valorLitro = parseFloat(await question("Digite o valor do litro de combustivel (R$): "));
    const distancia = parseFloat(await question("Digite a distancia do frete em quilometros: "));
    const qtdPecas = parseInt(await question("Digite a quantidade de pecas: "));
    
    console.log("Regioes: 1-Sul, 2-Sudeste, 3-Centro-oeste");
    const regiao = parseInt(await question("Digite a regiao: "));
    const rastreamento = (await question("Deseja rastreamento (S/N)? ")).toUpperCase();

    // Processamento
    let taxaRastreamento = (rastreamento === 'S') ? 200.00 : 0.00;
    let valorFreteKm = distancia * valorLitro;
    
    let valorBase = 0, desconto = 0;

    // Estrutura condicional para Regiões
    if (regiao === 1) { valorBase = 1.00; desconto = 0.10; }
    else if (regiao === 2) { valorBase = 1.20; desconto = 0.12; }
    else if (regiao === 3) { valorBase = 1.30; desconto = 0.13; }
    else { console.log("Erro: Regiao invalida!"); readline.close(); return; }

    // Cálculo das peças
    let valorFretePecas = 0;
    if (qtdPecas <= 1000) {
        valorFretePecas = qtdPecas * valorBase;
    } else {
        let valorComDesconto = valorBase - (valorBase * desconto);
        valorFretePecas = (1000 * valorBase) + ((qtdPecas - 1000) * valorComDesconto);
    }

    let total = taxaRastreamento + valorFretePecas + valorFreteKm;

    // Saída formatada com .toFixed(2) para 2 casas decimais
    console.log(`\nTaxa rastreamento: R$ ${taxaRastreamento.toFixed(2)}`);
    console.log(`Frete pecas: R$ ${valorFretePecas.toFixed(2)}`);
    console.log(`Frete por km: R$ ${valorFreteKm.toFixed(2)}`);
    console.log(`Total: R$ ${total.toFixed(2)}`);
    
    readline.close();
}

calcularFrete();