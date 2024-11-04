
//Script do Modal, pop-up de confirmação
function showModal() {
    const name = document.getElementById('name').value;
    const tel = document.getElementById('tel').value;
    const service = document.getElementById('service').options[document.getElementById('service').selectedIndex].text;
    const price = document.getElementById('price').value;
    const date = document.getElementById('date').value;

    const time = document.querySelector('.time-slot button.selected') ? document.querySelector('.time-slot button.selected').innerText : 'Não selecionado';

    const confirmationDetails = `
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Telemóvel:</strong> ${tel}</p>
        <p><strong>Serviço:</strong> ${service}</p>
        <p><strong>Preço:</strong> ${price}</p>
        <p><strong>Data Agendada:</strong> ${date}</p>
        <p><strong>Horário:</strong> ${time}</p>
    `;

    document.getElementById('confirmationDetails').innerHTML = confirmationDetails;
    document.getElementById('confirmationModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

function editDetails() {
    closeModal();
}

function saveDetails() {
    // Armazena os dados no localStorage para usar na página de pagamento
    const appointmentData = {
        name: document.getElementById('name').value,
        tel: document.getElementById('tel').value,
        service: document.getElementById('service').options[document.getElementById('service').selectedIndex].text,
        price: document.getElementById('price').value,
        date: document.getElementById('date').value,
        time: document.querySelector('.time-slot button.active') ? document.querySelector('.time-slot button.active').innerText : 'Não selecionado'
    };

    localStorage.setItem('appointmentData', JSON.stringify(appointmentData));

    // Fecha o modal e redireciona para a página de pagamento
    closeModal();
    window.location.href = 'pagamento.html';
}


function setTime(time) {
    // Remove a classe 'selected' de todos os botões
    document.querySelectorAll('.time-slot button').forEach(btn => {
        btn.classList.remove('selected');
    });

    // Adiciona a classe 'selected' ao botão clicado
    event.target.classList.add('selected');

    // Aqui você pode adicionar qualquer outra lógica necessária
    // para lidar com o horário selecionado
}



function updatePrice() {
    const service = document.getElementById('service');
    const price = service.options[service.selectedIndex].value;
    document.getElementById('price').value = `R$ ${price},00`;
}


// FIMModal






//Script Usado para menu serviço selecionar o preço
function updatePrice() {
    var service = document.getElementById("service");
    var price = document.getElementById("price");
    price.value = "R$ " + service.value + ",00";
}


// DO BOTÃO DE CONFIGURAÇÃO
function showPasswordModal() {
    document.getElementById('passwordModal').style.display = 'block';
}

function checkPassword() {
    const password = document.getElementById('adminPassword').value;
    // Substitua 'senha123' pela senha que você desejar
    if (password === 'senha123') {
        window.location.href = 'adm.html';
    } else {
        alert('Senha incorreta!');
    }
    document.getElementById('adminPassword').value = '';
    document.getElementById('passwordModal').style.display = 'none';
}

// Fechar o modal quando clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('passwordModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}





// Função para carregar os horários disponíveis
// Adicione esta função ao script.js
function loadAvailableTimeSlots() {
    const timeSlots = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ];

    const container = document.getElementById('timeSlots');
    container.innerHTML = '';

    const selectedDate = document.getElementById('date').value;
    const disabledTimeSlots = JSON.parse(localStorage.getItem('disabledTimeSlots') || '{}');

    timeSlots.forEach(time => {
        const isDisabled = disabledTimeSlots[selectedDate]?.includes(time);
        const div = document.createElement('div');
        div.className = 'time-slot';
        
        if (!isDisabled) {
            div.innerHTML = `<button type="button" onclick="setTime('${time}')">${time}</button>`;
        } else {
            div.innerHTML = `<button type="button" disabled style="background-color: #ccc;">${time}</button>`;
        }
        
        container.appendChild(div);
    });
}

// Modifique a função setTime para incluir a verificação
function setTime(time) {
    const selectedDate = document.getElementById('date').value;
    const disabledTimeSlots = JSON.parse(localStorage.getItem('disabledTimeSlots') || '{}');
    
    if (disabledTimeSlots[selectedDate]?.includes(time)) {
        return; // Não permite selecionar horários desabilitados
    }

    document.querySelectorAll('.time-slot button').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

// Adicione este evento para atualizar os horários quando a data for alterada
document.getElementById('date').addEventListener('change', loadAvailableTimeSlots);

// Carregue os horários quando a página for carregada
window.addEventListener('load', loadAvailableTimeSlots);




// Função para verificar se um horário está desabilitado
function isTimeDisabled(time) {
    const disabledTimes = JSON.parse(localStorage.getItem('disabledTimes') || '[]');
    return disabledTimes.includes(time);
}

// Modifique a função setTime para incluir a classe 'selected'
function setTime(time) {
    document.querySelectorAll('.time-slot button').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

// Adicione esta linha no final do arquivo para carregar os horários quando a página for carregada
window.addEventListener('load', loadAvailableTimeSlots);


window.addEventListener('message', function(event) {
    if (event.data === 'updateTimeSlots') {
        loadAvailableTimeSlots();
    }
});









