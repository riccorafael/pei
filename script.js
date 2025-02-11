document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('agendamentoForm');
    const tableBody = document.querySelector('#agendamentosTable tbody');

    // Carregar agendamentos do localStorage ao iniciar
    function loadAgendamentos() {
        tableBody.innerHTML = ''; // Limpa a tabela
        const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        agendamentos.forEach((agendamento, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${agendamento.nome}</td>
                <td>${agendamento.pet}</td>
                <td>${agendamento.data}</td>
                <td>${agendamento.horario}</td>
                <td>${agendamento.servico}</td>
                <td><button onclick="removerAgendamento(${index})">Remover</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Salvar agendamentos no localStorage
    function salvarAgendamentos(agendamentos) {
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    }

    // Enviar formulário
    form.addEventListener('submit', event => {
        event.preventDefault();

        const nome = form.nome.value;
        const pet = form.pet.value;
        const data = form.data.value;
        const horario = form.horario.value; // Novo campo de horário
        const servico = form.servico.value;

        const novoAgendamento = { nome, pet, data, horario, servico }; // Inclui horário

        // Obter agendamentos existentes
        const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        agendamentos.push(novoAgendamento);

        // Salvar no localStorage
        salvarAgendamentos(agendamentos);

        // Atualizar a tabela
        loadAgendamentos();
        form.reset(); // Limpa o formulário
    });

    // Remover agendamento
    window.removerAgendamento = function(index) {
        const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        agendamentos.splice(index, 1); // Remove o agendamento pelo índice
        salvarAgendamentos(agendamentos); // Atualiza o localStorage
        loadAgendamentos(); // Recarrega a tabela
    };

    // Carrega os agendamentos ao iniciar
    loadAgendamentos();
});