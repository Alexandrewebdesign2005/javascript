// Importa o módulo 'readline' nativo do Node.js, que permite ler o que o usuário digita no terminal
const readline = require('readline');

// Cria a interface conectando a entrada (teclado) e a saída (tela)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Em JavaScript moderno, colocamos a lógica principal dentro de uma função 'assíncrona' 
// Isso permite pausar o código enquanto esperamos o usuário digitar (usando o 'await')
async function main() {
    // Array de strings. O JS é muito flexível e lida com arrays automaticamente.
    const sistemas = ["", "Windows Server", "Unix", "Linux", "Netware", "Mac OS", "Outro"];
    
    // Cria um array de 7 posições, preenchendo todas com o número 0
    let votos = new Array(7).fill(0);
    let total_votos = 0;

    // console.log é o equivalente ao printf ou puts, já pulando a linha no final
    console.log("--- ENQUETE: MELHOR SISTEMA OPERACIONAL PARA SERVIDORES ---");
    console.log("1- Windows Server | 2- Unix | 3- Linux | 4- Netware | 5- Mac OS | 6- Outro");
    console.log("Digite 0 para encerrar a votação.\n");

    // Função auxiliar para transformar a leitura do teclado em uma "Promessa" (Promise),
    // o que trava a tela até o usuário apertar Enter.
    const perguntar = (pergunta) => new Promise(resolve => rl.question(pergunta, resolve));

    // Laço de repetição infinito que só será quebrado quando o usuário digitar 0
    while (true) {
        // 'await' espera a resposta. O 'parseInt' converte o texto digitado para número inteiro.
        let resposta = await perguntar("Digite o numero do seu voto: ");
        let voto_atual = parseInt(resposta);

        // Condição de parada
        if (voto_atual === 0) {
            break; // Quebra o laço while e vai para os resultados
        }

        // Verifica se o voto é válido (entre 1 e 6)
        if (voto_atual >= 1 && voto_atual <= 6) {
            votos[voto_atual]++; // Soma 1 voto na posição correta do array
            total_votos++;       // Aumenta o total geral de votos
        } else {
            console.log("ERRO: Valor inválido! Digite um número entre 1 e 6 (ou 0 para sair).");
        }
    }

    console.log("\n--- RESULTADO FINAL DA ENQUETE ---");

    if (total_votos > 0) {
        // O JS usa 'padEnd' para preencher com espaços vazios à direita, alinhando a tabela perfeitamente
        console.log(`${"Sistema Operacional".padEnd(20)} | ${"Votos".padEnd(7)} | Percentual`);
        console.log("-".repeat(49)); // Repete o traço 49 vezes

        // Laço for clássico, igual ao da linguagem C
        for (let i = 1; i <= 6; i++) {
            // No JS, a divisão já resulta em casas decimais automaticamente
            let percentual = (votos[i] / total_votos) * 100;
            
            // O .toFixed(2) formata o número para ter exatamente 2 casas decimais
            console.log(`${sistemas[i].padEnd(20)} | ${votos[i].toString().padEnd(7)} | ${percentual.toFixed(2)} %`);
        }
        
        console.log("-".repeat(49));
        console.log(`Total de votos computados: ${total_votos}`);
    } else {
        console.log("A enquete foi encerrada sem nenhum voto registrado.");
    }

    // Fecha a interface do terminal e encerra o programa
    rl.close();
}

// Invoca a função principal para o programa começar
main();