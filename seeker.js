document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('date').min = new Date().toISOString().split('T')[0];
  ['09:00 - 10:00','10:00 - 11:00','11:00 - 12:00','12:00 - 01:00','02:00 - 03:00','03:00 - 04:00']
    .forEach(s => {let o=document.createElement('option');o.value=o.textContent=s;document.getElementById('time').appendChild(o);});

  const bookingsKey = 'bookings';
  const getBookings = () => JSON.parse(localStorage.getItem(bookingsKey)) || [];
  const saveBookings = (d) => localStorage.setItem(bookingsKey, JSON.stringify(d));
  let currentBookingId = null;

  document.getElementById('bookingForm').onsubmit = e => {
    e.preventDefault();
    const bookingId = Date.now().toString();
    currentBookingId = bookingId;
    const booking = {
      id: bookingId,
      area: address.value,
      fullAddress: fullAddress.value,
      service: service.value,
      date: date.value,
      time: time.value,
      status: 'pending',
      paid: false
    };
    const all = getBookings(); all.push(booking); saveBookings(all);
    confirmation.innerHTML = "✅ Request sent. Waiting confirmation...";
    confirmation.classList.remove('d-none');
    bookingForm.reset();
    checkBookingStatus();
  };

  function checkBookingStatus() {
    const intv = setInterval(() => {
      const booking = getBookings().find(b => b.id === currentBookingId);
      if (!booking) return;
      if (booking.status === 'confirmed') {
        clearInterval(intv);
        window.location.href = `payment.html?bookingId=${booking.id}`;
      }
      if (booking.status === 'cancelled') {
        clearInterval(intv);
        alert('❌ Provider declined your booking.');
        confirmation.classList.add('d-none');
      }
    }, 2000);
  }
});
