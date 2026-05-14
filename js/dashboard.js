// URL till den skyddade routen i API:et
const API_URL = "http://localhost:3000/api/products";

// Hämtar HTML-element
const productsContainer = document.getElementById("products");
const message = document.getElementById("message");
const logoutButton = document.getElementById("logout-button");

// Hämtar JWT-token från sessionStorage
const token = sessionStorage.getItem("token");

// Om token saknas skickas användaren till login-sidan
if (!token) {
  window.location.href = "login.html";
}

// Funktion som hämtar skyddad data från API:et
async function getProtectedData() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        // Skickar med JWT-token till backend
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    // Om token är fel eller har gått ut
    if (!response.ok) {
      message.textContent = data.message || "Du har inte behörighet.";

      // Tar bort ogiltig token
      sessionStorage.removeItem("token");

      return;
    }

    // Rensar tidigare innehåll
    productsContainer.innerHTML = "";

    // Om API:et returnerar en array med data
    if (data.data && data.data.length > 0) {
      data.data.forEach((product) => {
        const article = document.createElement("article");
        article.classList.add("card");

        article.innerHTML = `
          <h3>${product.name}</h3>
          <p>${product.description || ""}</p>
          <p><strong>Pris:</strong> ${product.price || "Okänt"} kr</p>
        `;

        productsContainer.appendChild(article);
      });
    } else {
      productsContainer.innerHTML = "<p>Ingen skyddad data hittades.</p>";
    }
  } catch (error) {
    message.textContent = "Kunde inte hämta skyddad data från servern.";
  }
}

// Logga ut användaren
logoutButton.addEventListener("click", () => {
  sessionStorage.removeItem("token");
  window.location.href = "login.html";
});

// Kör funktionen när sidan laddas
getProtectedData();