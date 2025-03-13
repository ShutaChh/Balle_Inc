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
        form.addEventListener("submit", async function (e) {
          e.preventDefault();
          const password = form.querySelector('input[name="password"]');
          const confirmPassword = form.querySelector(
            'input[name="confirm_password"]'
          );
          const username = form.querySelector('input[name="fullname"]');
          let hasError = false;

          if (password && password.value.length < 8) {
            showError("Password harus minimal 8 karakter");
            hasError = true;
          }

          if (
            password &&
            confirmPassword &&
            password.value !== confirmPassword.value
          ) {
            showError("Password tidak cocok");
            hasError = true;
          }

          if (username && username.value.length < 4) {
            showError("Nama harus minimal 4 karakter");
            hasError = true;
          }

          if (!hasError) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
              submitBtn.textContent = "Loading...";
              submitBtn.disabled = true;
            }

            try {
              const formData = new FormData(form);
              const response = await fetch(form.action, {
                method: "POST",
                body: formData,
              });

              const redirectUrl = response.url;
              if (redirectUrl.includes("success")) {
                window.location.href = redirectUrl;
              } else {
                const text = await response.text();
                showError(text || "Registration failed");
              }
            } catch (error) {
              showError("An error occurred. Please try again.");
            } finally {
              if (submitBtn) {
                submitBtn.textContent = "Register";
                submitBtn.disabled = false;
              }
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
