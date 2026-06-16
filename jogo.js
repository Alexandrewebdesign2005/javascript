const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const opcoes = ["", "Pedra", "Papel", "Tesoura"];

readline.question("Escolha: 1-Pedra, 2-Papel, 3-Tesoura: ", (input) => {
    const jogadaUsuario = parseInt(input);

    // Validação
    if (jogadaUsuario < 1 || jogadaUsuario > 3) {
        console.log("ERRO: Jogada invalida.");
        readline.close();
        return;
    }

    // Gerar jogada aleatória: Math.random() dá um número entre 0 e 1.
    // Multiplicamos por 3, arredondamos para baixo (floor) e somamos 1.
    const jogadaComputador = Math.floor(Math.random() * 3) + 1;

    console.log(`\nVoce escolheu: ${opcoes[jogadaUsuario]}`);
    console.log(`PC escolheu: ${opcoes[jogadaComputador]}\n`);

    // Lógica do vencedor
    if (jogadaUsuario === jogadaComputador) {
        console.log("--- DEU EMPATE! ---");
    } else if ((jogadaUsuario === 1 && jogadaComputador === 3) || 
               (jogadaUsuario === 2 && jogadaComputador === 1) || 
               (jogadaUsuario === 3 && jogadaComputador === 2)) {
        console.log("--- PARABENS! VOCE VENCEU! ---");
    } else {
        console.log("--- O COMPUTADOR VENCEU! ---");
    }

    readline.close();
});