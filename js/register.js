// URL till backend-routen för registrering
const API_URL = "https://labb4-auth-api.onrender.com/api/register";

// Hämtar formuläret och meddelande-elementet från HTML
const form = document.getElementById("register-form");
const message = document.getElementById("message");

// Lyssnar på när formuläret skickas
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  message.textContent = "";

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Enkel validering innan vi skickar till API
  if (!username || !email || !password) {
    message.textContent = "Alla fält måste fyllas i.";
    return;
  }

  if (password.length < 6) {
    message.textContent = "Lösenordet måste vara minst 6 tecken.";
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      message.textContent = data.message || "Registrering misslyckades.";
      return;
    }

    message.textContent = "Konto skapat! Du kan nu logga in.";
    form.reset();
  } catch (error) {
    message.textContent = "Kunde inte ansluta till servern.";
  }
});