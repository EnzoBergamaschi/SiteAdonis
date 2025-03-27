// Função para exibir o formulário correspondente
function mostrarFormulario(formulario) {
    // Esconde todos os formulários
    document.getElementById('formAdicionar').style.display = 'none';
    document.getElementById('formAtualizar').style.display = 'none';
    document.getElementById('formBuscar').style.display = 'none';
    document.getElementById('formRetirar').style.display = 'none';
    document.getElementById('formulario').style.display = 'block'; // Exibe o contêiner do formulário

    // Exibe o formulário correspondente
    if (formulario === 'adicionar') {
        document.getElementById('formAdicionar').style.display = 'block';
    } else if (formulario === 'atualizar') {
        document.getElementById('formAtualizar').style.display = 'block';
    } else if (formulario === 'buscar') {
        document.getElementById('formBuscar').style.display = 'block';
    } else if (formulario === 'retirar') {
        document.getElementById('formRetirar').style.display = 'block';
    }
}

// Função para adicionar jogador
function adicionarJogador(event) {
    event.preventDefault(); // Impede o envio do formulário e a recarga da página

    let nome = document.getElementById('nome').value;
    let posicao = document.getElementById('posicao').value;
    let titular = document.getElementById('titular').value === "true";
    let altura = parseFloat(document.getElementById('altura').value);
    let idade = parseInt(document.getElementById('idade').value);

    if (!nome || !posicao || !altura || !idade) {
        alert('Todos os campos são obrigatórios.');
        return;
    }

    fetch('https://bancodados-production.up.railway.app/rstore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, posicao, titular, altura, idade })
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.nome) {
            document.getElementById('resultado').innerHTML = `<p>Jogador ${data.nome} adicionado com sucesso!</p>`;
            document.getElementById('resultado').style.display = 'block';
        } else {
            document.getElementById('resultado').innerHTML = `<p>Erro ao adicionar jogador. Verifique a API.</p>`;
            document.getElementById('resultado').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('resultado').innerHTML = `<p>Erro ao conectar com a API.</p>`;
        document.getElementById('resultado').style.display = 'block';
    });
}

// Função para buscar jogador
function buscarJogador(event) {
    event.preventDefault();

    let id = document.getElementById('idBuscar').value;
    if (!id) {
        alert('ID é obrigatório.');
        return;
    }

    fetch(`https://bancodados-production.up.railway.app/jogadores/${id}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.nome) {
                document.getElementById('resultado').innerHTML = `
                    <h2>Jogador Encontrado:</h2>
                    <p>${data.nome} - ${data.posicao} - ${data.titular ? 'Titular' : 'Reserva'} - ${data.altura}m - ${data.idade} anos</p>
                `;
            } else {
                document.getElementById('resultado').innerHTML = '<p>Jogador não encontrado.</p>';
            }
            document.getElementById('resultado').style.display = 'block';
        })
        .catch(error => {
            console.error('Erro:', error);
            document.getElementById('resultado').innerHTML = '<p>Erro ao buscar jogador.</p>';
            document.getElementById('resultado').style.display = 'block';
        });
}

// Função para retirar jogador
function retirarJogador(event) {
    event.preventDefault();

    let id = document.getElementById('idRetirar').value;
    if (!id) {
        alert('ID é obrigatório.');
        return;
    }

    fetch(`https://bancodados-production.up.railway.app/jogadores/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('resultado').innerHTML = `<p>Jogador com ID ${id} retirado com sucesso!</p>`;
        } else {
            document.getElementById('resultado').innerHTML = '<p>Erro ao retirar jogador.</p>';
        }
        document.getElementById('resultado').style.display = 'block';
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('resultado').innerHTML = '<p>Erro ao conectar com a API.</p>';
        document.getElementById('resultado').style.display = 'block';
    });
}

// Função para atualizar jogador
function atualizarJogador(event) {
    event.preventDefault();

    let id = document.getElementById('idAtualizar').value;
    if (!id) {
        alert('ID é obrigatório.');
        return;
    }

    let nome = document.getElementById('nomeAtualizar').value;
    let posicao = document.getElementById('posicaoAtualizar').value;
    let titular = document.getElementById('titularAtualizar').value === "true";
    let altura = parseFloat(document.getElementById('alturaAtualizar').value);
    let idade = parseInt(document.getElementById('idadeAtualizar').value);

    if (!nome || !posicao || !altura || !idade) {
        alert('Todos os campos são obrigatórios.');
        return;
    }

    fetch(`https://bancodados-production.up.railway.app/jogadores/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, posicao, titular, altura, idade })
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.nome) {
            document.getElementById('resultado').innerHTML = `<p>Jogador ${data.nome} atualizado com sucesso!</p>`;
        } else {
            document.getElementById('resultado').innerHTML = `<p>Erro ao atualizar jogador. Verifique a API.</p>`;
        }
        document.getElementById('resultado').style.display = 'block';
    })
    .catch(error => {
        console.error('Erro:', error);
        document.getElementById('resultado').innerHTML = `<p>Erro ao conectar com a API.</p>`;
        document.getElementById('resultado').style.display = 'block';
    });
}

// Função para fechar o formulário
function fecharFormulario() {
    document.getElementById('formulario').style.display = 'none';
}


// Função para listar jogadores - Redireciona para outra página
function listarJogadores() {
    window.location.href = '/HTML/list.html'; // Aqui você coloca o caminho para a página de listagem
}