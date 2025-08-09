document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const bookingId = params.get('bookingId');

  const bookingsKey = 'bookings';
  const getBookings = () => JSON.parse(localStorage.getItem(bookingsKey)) || [];
  const saveBookings = data => localStorage.setItem(bookingsKey, JSON.stringify(data));

  const bookingDetailsDiv = document.getElementById('bookingDetails');
  const paymentForm = document.getElementById('paymentForm');
  const paymentFields = document.getElementById('payment-fields');
  const paymentConfirmDiv = document.getElementById('paymentConfirm');

  if (!bookingId) {
    bookingDetailsDiv.innerHTML = "<p class='text-danger'>Invalid booking reference.</p>";
    paymentForm.style.display = 'none';
    return;
  }

  const allBookings = getBookings();
  const booking = allBookings.find(b => b.id === bookingId);

  if (!booking) {
    bookingDetailsDiv.innerHTML = "<p class='text-danger'>Booking not found.</p>";
    paymentForm.style.display = 'none';
    return;
  }

  // Show summary
  bookingDetailsDiv.innerHTML = `
    <p><b>Area:</b> ${booking.area}</p>
    <p><b>Complete Address:</b> ${booking.fullAddress}</p>
    <p><b>Service:</b> ${booking.service}</p>
    <p><b>Date:</b> ${booking.date}</p>
    <p><b>Time Slot:</b> ${booking.time}</p>
  `;

  // Handle payment method selection
  document.getElementById('payment').addEventListener('change', e => {
    const method = e.target.value;
    paymentFields.innerHTML = '';
    if (method === 'card') {
      paymentFields.innerHTML = `
        <label class="form-label">Card Number</label>
        <input type="text" class="form-control mb-2" required placeholder="1234 5678 9012 3456">
        <label class="form-label">Expiry</label>
        <input type="text" class="form-control mb-2" required placeholder="MM/YY">
        <label class="form-label">CVV</label>
        <input type="password" class="form-control mb-2" required placeholder="123">
      `;
    }
    else if (method === 'upi') {
      paymentFields.innerHTML = `
        <label class="form-label">UPI ID</label>
        <input type="text" class="form-control" required placeholder="yourname@bank">
      `;
    }
    else if (method === 'netbanking') {
      paymentFields.innerHTML = `
        <label class="form-label">Bank Name</label>
        <input type="text" class="form-control mb-2" required placeholder="SBI">
        <label class="form-label">Net Banking ID</label>
        <input type="text" class="form-control" required>
      `;
    }
  });

  paymentForm.addEventListener('submit', e => {
    e.preventDefault();
    booking.paid = true;
    saveBookings(allBookings);
    paymentForm.classList.add('d-none');
    paymentConfirmDiv.innerHTML = "<strong>✅ Payment successful! Your service is booked.</strong>";
    paymentConfirmDiv.classList.remove('d-none');
  });
});
