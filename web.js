
  const btn = document.getElementById("scrollbtn");

  window.onscroll = function () {
    if (document.documentElement.scrollTop > 200) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };

  btn.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

const btn1 = document.getElementById("darkModeToggle");
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  btn1.textContent = "☀️"; 
}
btn1.addEventListener("click", () => {
document.body.classList.toggle("dark-mode");
if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    btn1.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    btn1.textContent = "🌙";
  }
});
function showSection(sectionName) {
    // 1. Hide both sections
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('appointments-section').style.display = 'none';

   
    document.getElementById('nav-dashboard').classList.remove('active');
    document.getElementById('nav-appointments').classList.remove('active');

    if (sectionName === 'dashboard') {
        document.getElementById('dashboard-section').style.display = 'block';
        document.getElementById('nav-dashboard').classList.add('active');
    } else if (sectionName === 'appointments') {
        document.getElementById('appointments-section').style.display = 'block';
        document.getElementById('nav-appointments').classList.add('active');
    }
}



let currentAppointments = 0;
let currentPatients = 0;


document.getElementById('booking-form').addEventListener('submit', function(event) {
  
    event.preventDefault(); 

    
    const appointmentData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        department: document.getElementById('department').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
    };

   
    currentAppointments++;
    currentPatients++;
    document.getElementById('stat-total-appointments').innerText = currentAppointments;
    document.getElementById('stat-total-patients').innerText = currentPatients;

   
    updateDashboardList(appointmentData);

    
    updateAppointmentsTable(appointmentData);


    showSection('appointments');

   
});


function updateDashboardList(data) {
    const listContainer = document.getElementById('recent-appointments-list');
    

    const emptyMsg = listContainer.querySelector('.empty-state');
    if (emptyMsg) emptyMsg.remove();


    const recentItemHtml = `
        <div class="recent-item">
            <div class="recent-main">
                <p>${data.name}</p>
                <div class="recent-details">${data.department} · ${data.date} at ${data.time}</div>
            </div>
            <span class="status-confirmed">Confirmed</span>
        </div>
    `;

   
    listContainer.insertAdjacentHTML('afterbegin', recentItemHtml);
}


function updateAppointmentsTable(data) {
    const tableBody = document.getElementById('appointments-table-body');


    const rowHtml = `
        <tr>
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.phone}</td>
            <td>${data.department}</td>
            <td>${data.date}</td>
            <td>${data.time}</td>
            <td><button class="delete-icon" onclick="deleteRow(this)">X</button></td>
        </tr>
    `;

  
    tableBody.insertAdjacentHTML('beforeend', rowHtml);
}


function deleteRow(btn) {
  
    const row = btn.parentNode.parentNode;
    row.remove();

}

document.getElementById("appointement").addEventListener("submit", function(e) {
    e.preventDefault(); 

    // get values
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    if(name === "" || email === ""){
        alert("Please fill all required fields!");
        return;
    }

    alert("Appointment booked successfully!");

   
    this.reset();
});
document.getElementById("appointement").addEventListener("submit", function(e){
    e.preventDefault();

    let appointment = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        department: document.getElementById("department").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value
    };

  
    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  
    appointments.push(appointment);

  
    localStorage.setItem("appointments", JSON.stringify(appointments));

   
    window.location.href = "dashboard.html";
});
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

let table = document.getElementById("appointments-table");

appointments.forEach(app => {
    let row = `
        <tr>
            <td>${app.name}</td>
            <td>${app.email}</td>
            <td>${app.phone}</td>
            <td>${app.department}</td>
            <td>${app.date}</td>
            <td>${app.time}</td>
        </tr>
    `;
    table.innerHTML += row;
});
