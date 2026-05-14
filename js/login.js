// URL till login-endpointen
const API_URL = "https://labb4-auth-api.onrender.com/api/auth/login";

// Hämtar HTML-element
const form = document.getElementById("login-form");
const message = document.getElementById("message");

// När formuläret skickas
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  message.textContent = "";

  // Hämtar användarens input
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Enkel validering
  if (!username || !password) {
    message.textContent = "Användarnamn och lösenord krävs.";
    return;
  }

  try {

    // Skickar login-request till API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    const data = await response.json();

    // Om login misslyckas
    if (!response.ok) {
      message.textContent = data.message || "Inloggning misslyckades.";
      return;
    }

    // Sparar JWT-token i sessionStorage
    sessionStorage.setItem("token", data.token);

    message.textContent = "Inloggning lyckades.";

    // Skickar användaren vidare
    window.location.href = "dashboard.html";

  } catch (error) {
    message.textContent = "Kunde inte ansluta till servern.";
  }
});