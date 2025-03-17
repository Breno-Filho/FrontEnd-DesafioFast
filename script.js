// Mock de dados
const colaboradores = [
    { id: 1, nome: "João" },
    { id: 2, nome: "Maria" },
    { id: 3, nome: "Pedro" }
];

const workshops = [
    { 
        id: 1, 
        nome: "Workshop de JavaScript", 
        dataRealizacao: "2025-03-20", 
        descricao: "Aprenda os fundamentos do JavaScript.", 
        participantes: [1, 2] 
    },
    { 
        id: 2, 
        nome: "Workshop de CSS", 
        dataRealizacao: "2025-04-15", 
        descricao: "Estilizando páginas web com CSS.", 
        participantes: [2, 3] 
    }
];

// Função para exibir colaboradores na página index.html
function exibirColaboradores() {
    const colaboradoresDiv = document.getElementById('colaboradores');
    colaboradoresDiv.innerHTML = '<h2>Colaboradores</h2>';
    colaboradores.forEach(colaborador => {
        colaboradoresDiv.innerHTML += `<p onclick="irParaColaborador(${colaborador.id})">${colaborador.nome}</p>`;
    });
}

// Função para exibir workshops na página workshops.html
function exibirWorkshops() {
    const workshopsDiv = document.getElementById('workshops');
    workshopsDiv.innerHTML = '<h2>Workshops</h2>';
    workshops.forEach(workshop => {
        workshopsDiv.innerHTML += `<p onclick="irParaDetalhes(${workshop.id})">${workshop.nome}</p>`;
    });
}

// Função para redirecionar para a página de detalhes do workshop
function irParaDetalhes(workshopId) {
    localStorage.setItem('workshopId', workshopId);
    window.location.href = 'workshop-details.html';
}

// Função para redirecionar para a página de workshops de um colaborador
function irParaColaborador(colaboradorId) {
    localStorage.setItem('colaboradorId', colaboradorId);
    window.location.href = 'colaborador-details.html'; // Nova página para detalhes do colaborador
}

// Função para exibir detalhes do workshop na página workshop-details.html
function exibirDetalhes() {
    const workshopId = localStorage.getItem('workshopId');
    const workshop = workshops.find(w => w.id == workshopId);
    const detalhesDiv = document.getElementById('detalhes-workshop');
    
    if (workshop) {
        detalhesDiv.innerHTML = `<h2>${workshop.nome}</h2>
                                 <p>${workshop.descricao}</p>
                                 <p>Data: ${workshop.dataRealizacao}</p>
                                 <h3>Participantes:</h3>`;
        workshop.participantes.forEach(participanteId => {
            const colaborador = colaboradores.find(c => c.id === participanteId);
            detalhesDiv.innerHTML += `<p onclick="irParaColaborador(${colaborador.id})">${colaborador.nome}</p>`;
        });
    } else {
        detalhesDiv.innerHTML = '<p>Workshop não encontrado.</p>';
    }
}

// Função para exibir detalhes do colaborador na nova página colaborador-details.html
function exibirDetalhesColaborador() {
    const colaboradorId = localStorage.getItem('colaboradorId');
    const colaborador = colaboradores.find(c => c.id == colaboradorId);
    const detalhesDiv = document.getElementById('detalhes-colaborador');
    
    if (colaborador) {
        detalhesDiv.innerHTML = `<h2>${colaborador.nome}</h2>
                                 <h3>Workshops Participados:</h3>`;
        const workshopsParticipados = workshops.filter(w => w.participantes.includes(colaborador.id));
        workshopsParticipados.forEach(workshop => {
            detalhesDiv.innerHTML += `<p onclick="irParaDetalhes(${workshop.id})">${workshop.nome}</p>`;
        });
    } else {
        detalhesDiv.innerHTML = '<p>Colaborador não encontrado.</p>';
    }
}

// Inicializa a aplicação com base na página atual
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('colaboradores')) {
        exibirColaboradores();
    }
    if (document.getElementById('workshops')) {
        exibirWorkshops();
    }
    if (document.getElementById('detalhes-workshop')) {
        exibirDetalhes();
    }
    if (document.getElementById('detalhes-colaborador')) {
        exibirDetalhesColaborador();
    }
});
 