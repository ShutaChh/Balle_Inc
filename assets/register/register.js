(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    try {
      // Get elements
      const sign_in_btn = document.querySelector("#sign-in-btn");
      const sign_up_btn = document.querySelector("#sign-up-btn");
      const container = document.querySelector(".container");
      const forms = document.querySelectorAll("form");

      // Check if elements exist
      if (!sign_in_btn || !sign_up_btn || !container) {
        console.error("Required elements not found");
        return;
      }

      // Add click event listeners
      sign_up_btn.addEventListener("click", () => {
        container.classList.add("sign-up-mode");
      });

      sign_in_btn.addEventListener("click", () => {
        container.classList.remove("sign-up-mode");
      });

      // Form validation
      forms.forEach((form) => {
        form.addEventListener("submit", function (e) {
          const password = form.querySelector('input[type="password"]');
          const username = form.querySelector('input[name="username"]');
          let hasError = false;

          if (password && password.value.length < 8) {
            e.preventDefault();
            showError("Password harus minimal 8 karakter");
            hasError = true;
          }

          if (username && username.value.length < 4) {
            e.preventDefault();
            showError("Username harus minimal 4 karakter");
            hasError = true;
          }

          if (!hasError) {
            const submitBtn = form.querySelector('input[type="submit"]');
            if (submitBtn) {
              submitBtn.value = "Loading...";
              submitBtn.disabled = true;
            }
          }
        });
        const emailInput = document.querySelector('input[name="email"]');
        if (emailInput) {
          emailInput.addEventListener("blur", async function () {
            if (this.value) {
              try {
                const formData = new FormData();
                formData.append("email", this.value);
                formData.append(
                  "csrf_token",
                  document.querySelector('input[name="csrf_token"]').value
                );

                const response = await fetch("check_email.php", {
                  method: "POST",
                  body: formData,
                });

                const data = await response.json();

                if (data.exists) {
                  showError("Email ini sudah terdaftar");
                  this.setCustomValidity("Email sudah terdaftar");
                } else {
                  this.setCustomValidity("");
                }
              } catch (error) {
                console.error("Error checking email:", error);
              }
            }
          });
        }
      });

      // Password visibility toggle
      const passwordInputs = document.querySelectorAll(
        'input[type="password"]'
      );
      passwordInputs.forEach((input) => {
        const toggleBtn = document.createElement("button");
        toggleBtn.type = "button";
        toggleBtn.className = "password-toggle";
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';

        toggleBtn.addEventListener("click", () => {
          const type = input.getAttribute("type");
          input.setAttribute("type", type === "password" ? "text" : "password");
        });

        input.parentNode.appendChild(toggleBtn);
      });

      // Handle error messages
      const urlParams = new URLSearchParams(window.location.search);
      const error = urlParams.get("error");

      if (error) {
        showError(error);
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );
      }
    } catch (error) {
      console.error("Initialization error:", error);
    }
  });

  function showError(message) {
    const errorDiv = document.querySelector(".error-message");
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.style.display = "block";
      setTimeout(() => {
        errorDiv.style.display = "none";
      }, 5000);
    } else {
      console.warn("Error message container not found");
    }
  }
})();
