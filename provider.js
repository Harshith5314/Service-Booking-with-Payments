document.addEventListener('DOMContentLoaded', () => {
  const serviceForm = document.getElementById('serviceForm');
  const serviceList = document.getElementById('serviceList');
  const bookingsKey = 'bookings';
  function getBookings() { return JSON.parse(localStorage.getItem(bookingsKey)) || []; }
  function saveBookings(data) { localStorage.setItem(bookingsKey, JSON.stringify(data)); }

  // Scrollable, predefined services
  const predefinedServices = [
    "Salon", "Cleaning", "Repair", "Home Tutor", "Laundry",
    "Carpenter", "Pet Care", "Plumbing", "Electrician", "Gardening", "Babysitting", "AC Service"
  ];
  const serviceNameInp = document.getElementById('serviceName');
  const scroller = document.getElementById('predefinedServices');
  predefinedServices.forEach(service => {
    const btn = document.createElement('button');
    btn.className = "service-option";
    btn.type = "button";
    btn.innerText = service;
    btn.onclick = () => { serviceNameInp.value = service; };
    scroller.appendChild(btn);
  });

  serviceForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = serviceNameInp.value;
    const slots = document.getElementById('timeSlots').value;
    const li = document.createElement('li');
    li.className = "list-group-item bg-dark text-light";
    li.innerHTML = `<b>${name}</b> - Slots: ${slots}`;
    serviceList.appendChild(li);
    serviceForm.reset();
  });

  // Booking request notifications
  const bookingRequestsDiv = document.createElement('div');
  bookingRequestsDiv.innerHTML = `<h5 class="mt-4">Booking Requests</h5>`;
  document.querySelector('.card-body').appendChild(bookingRequestsDiv);

  function renderBookings() {
    const all = getBookings();
    const pending = all.filter(b => b.status === 'pending');
    bookingRequestsDiv.innerHTML = `<h5 class="mt-4">Booking Requests</h5>`;
    if (pending.length === 0) {
      bookingRequestsDiv.innerHTML += `<p>No pending requests.</p>`;
    } else {
      pending.forEach(b => {
        const div = document.createElement('div');
        div.className = "bg-secondary text-light p-2 rounded mb-2";
        div.innerHTML = `
          <div><b>${b.service}</b> - ${b.area}<br>
          ${b.fullAddress}<br>
          ${b.date} at ${b.time}</div>
          <div class="mt-2 d-flex gap-2">
            <button class="btn btn-success btn-sm w-50">Confirm</button>
            <button class="btn btn-danger btn-sm w-50">Cancel</button>
          </div>
        `;
        const [confirmBtn, cancelBtn] = div.querySelectorAll('button');
        confirmBtn.onclick = () => {
          b.status = 'confirmed';
          saveBookings(all);
          renderBookings();
        };
        cancelBtn.onclick = () => {
          b.status = 'cancelled';
          saveBookings(all);
          renderBookings();
        };
        bookingRequestsDiv.appendChild(div);
      });
    }
  }
  renderBookings();
  setInterval(renderBookings, 2000);
});
