document.addEventListener('DOMContentLoaded', function () {
    // Verificar se o banco de dados já existe no armazenamento local
    if (!localStorage.getItem('indicadores.db')) {
        // Mostrar a mensagem e o botão de criar novo banco de dados
        document.getElementById('message').innerHTML = '<p>O banco de dados <strong>indicadores.db</strong> não existe no navegador.</p>';
        document.getElementById('createDBBtn').classList.remove('d-none');
    } else {
        // Mostrar mensagem que o banco de dados já existe
        document.getElementById('message').innerHTML = '<p>O banco de dados <strong>indicadores.db</strong> já está salvo no navegador.</p>';
        document.getElementById('downloadDBBtn').classList.remove('d-none');
        document.getElementById('deleteDBBtn').classList.remove('d-none');
    }

    // Adicionar evento ao botão para criar o banco de dados
    document.getElementById('createDBBtn').addEventListener('click', function () {
        // Criar o banco de dados e salvar no armazenamento local
        localStorage.setItem('indicadores.db', 'Dados do banco de dados inicializados.');
        document.getElementById('message').innerHTML = '<p>O banco de dados <strong>indicadores.db</strong> foi criado e salvo no navegador.</p>';
        document.getElementById('createDBBtn').classList.add('d-none');
        document.getElementById('downloadDBBtn').classList.remove('d-none');
        document.getElementById('deleteDBBtn').classList.remove('d-none');
    });

    // Adicionar evento ao botão para baixar o banco de dados
    document.getElementById('downloadDBBtn').addEventListener('click', function () {
        // Simular o download do banco de dados
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(localStorage.getItem('indicadores.db'));
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "indicadores.db");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    });

    // Adicionar evento ao botão para excluir o banco de dados
    document.getElementById('deleteDBBtn').addEventListener('click', function () {
        // Excluir o banco de dados do armazenamento local
        localStorage.removeItem('indicadores.db');
        document.getElementById('message').innerHTML = '<p>O banco de dados <strong>indicadores.db</strong> foi excluído do navegador.</p>';
        document.getElementById('downloadDBBtn').classList.add('d-none');
        document.getElementById('deleteDBBtn').classList.add('d-none');
        document.getElementById('createDBBtn').classList.remove('d-none');
    });

    // Adicionar evento ao botão para adicionar nova data de evento
    document.getElementById('addEventDateBtn').addEventListener('click', function () {
        // Adicionar nova data de evento
        addEventDate();
    });
    
});
function loadEventDates() {
    // Carregar as datas de evento do banco de dados
    var db = JSON.parse(localStorage.getItem('indicadores.db'));
    var eventDateList = document.getElementById('eventDateList');

    // Limpar as datas de evento existentes
    eventDateList.innerHTML = '';

    // Adicionar as datas de evento
    for (var i = 0; i < db.eventDates.length; i++) {
        var dateDiv = document.createElement('div');
        dateDiv.classList.add('input-group', 'mb-3');

        var dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.classList.add('form-control');
        dateInput.value = db.eventDates[i];

        var deleteBtn = document.createElement('button');
        deleteBtn.classList.add('btn', 'btn-danger');
        deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
        deleteBtn.addEventListener('click', function () {
            removeEventDate(this.parentNode);
        });

        dateDiv.appendChild(dateInput);
        dateDiv.appendChild(deleteBtn);
        eventDateList.appendChild(dateDiv);
    }
}

function addEventDate() {
    // Obter a nova data de evento do input
    var newEventDate = document.getElementById('eventDateInput').value;

    if (newEventDate) {
        // Salvar a nova data de evento no banco de dados
        var db = JSON.parse(localStorage.getItem('indicadores.db'));
        if (!db.eventDates) {
            db.eventDates = [];
        }
        db.eventDates.push(newEventDate);
        localStorage.setItem('indicadores.db', JSON.stringify(db));

        // Atualizar a lista de datas de evento
        loadEventDates();

        // Limpar o input
        document.getElementById('eventDateInput').value = '';
    }
}

function removeEventDate(dateDiv) {
    // Remover a data de evento do banco de dados
    var db = JSON.parse(localStorage.getItem('indicadores.db'));
    var dateInput = dateDiv.querySelector('input');
    var dateToRemove = dateInput.value;
    db.eventDates = db.eventDates.filter(function (date) {
        return date !== dateToRemove;
    });
    localStorage.setItem('indicadores.db', JSON.stringify(db));

    // Remover o elemento da lista
    dateDiv.remove();
}