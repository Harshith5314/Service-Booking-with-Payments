# Service-Booking-with-Payments

A modern, responsive, multi-role web app for online service booking — built with vanilla HTML, CSS, JS, and Bootstrap 5 (dark theme).  
Includes separate flows/pages for Service Seekers and Service Providers, area selection (Hyderabad, India), and a 2-way booking confirmation/payment process. Entirely front-end, using `localStorage` for demo purposes.

## 🌟 Features

- **Role-based login/register**: Separate authentication for Seekers and Providers.
- **Seeker workflow**:
  - Select area (Gachibowli, Hitech City, Banjara Hills, Madhapur, Kukatpally) and enter complete address.
  - Choose service, date, and slot.
  - Request sent to provider; Seeker waits for provider action.
  - Seeker pays **only after** provider confirms (redirected to a separate payment page).
  - If provider cancels, Seeker gets real-time alert.
- **Provider workflow**:
  - Add/manage available services (via a scrollable/predefined list).
  - See live incoming booking requests.
  - Can Confirm/Cancel each request; status is synced to Seekers in real time.
- **Payment flow**:
  - Once confirmed, Seeker completes payment (all simulated front-end).
  - Clear status update after payment ("Service Booked").
- **Mobile-first, responsive UI** (Bootstrap 5 + dark mode)
- Minimal modern effects, clean UX
- Works by opening files locally (front-end only, no backend required).

## 🚀 Quick Start

1. **Clone/download** the repository.

2. Place all files in one folder.

3. **Open `index.html`** in your web browser.

   - Use 2 separate tabs/windows to test the Seeker (customer) and Provider dashboards simultaneously.

4. **Start:**
    - Choose role on `index.html` (Seeker or Provider)
    - Register/log in for that role.
    - Seeker books service; Provider sees/accepts/cancels requests; Seeker gets real-time updates and pays only after confirmation.

## 📁 Project Structure


'''Service-Booking-with-Payments/
│
├── index.html
├── login-seeker.html
├── register-seeker.html
├── seeker-dashboard.html
│
├── login-provider.html
├── register-provider.html
├── provider-dashboard.html
│
├── payment.html
│
├── styles.css
├── auth.js
├── seeker.js
├── provider.js
├── payment.js
│
└── README.md


- **styles.css**: Bootstrap dark theme overrides + scroller/buttons/mobile tweaks.
- **auth.js**: Registration/login via localStorage (for demo purposes only).
- **seeker.js**: Handles booking, real-time provider confirmation/cancel flow.
- **provider.js**: Handles service management and booking notifications/acceptance.
- **payment.js**: Loads booking details by ID, processes simulated payment, and confirms.

## 🏙️ Supported Hyderabad Areas

- Gachibowli
- Hitech City
- Banjara Hills
- Madhapur
- Kukatpally

## 💡 How It Works

1. **Seeker books service** (address, date, slot).
2. **Booking stored** as "pending" in localStorage.
3. **Provider dashboard**: Sees incoming requests, can confirm/cancel.
4. - If **Confirmed**: Seeker is redirected to payment page (`payment.html?bookingId=...`).
   - If **Cancelled**: Seeker tab shows popup message ("Service Declined").
5. **Seeker completes payment:** Service is marked "booked" (no real transaction occurs — for demo only).

## 🔒 Disclaimer (Demo/Education Use Only)

- **No real money is processed.**
- All authentication & data uses browser `localStorage` (for demonstration only).
- Not intended for deployment as-is; for portfolio/demo/learning purposes.

## 💻 Tech Stack

- HTML5, CSS3, Bootstrap 5 (with dark theme)
- Vanilla JavaScript (no frameworks)
- No database, no backend: all data with localStorage

## 🌐 Website Working Link

[**Live Demo**](https://servicebookingwithpayments.netlify.app/)


## 📸 Screenshots

<img width="928" height="417" alt="image" src="https://github.com/user-attachments/assets/14c10493-0e05-4f22-9e9e-07caf349083c" />

<img width="882" height="813" alt="image" src="https://github.com/user-attachments/assets/c130452e-31f2-4080-bfc9-2ae884a92af3" />

<img width="828" height="793" alt="image" src="https://github.com/user-attachments/assets/fb5218cf-b46d-4242-ac60-3347100cd99d" />

## 📄 License

MIT — Free for personal/educational use.

---

**Made with ❤️ for learning, demo, and prototyping real-world service platforms!**
