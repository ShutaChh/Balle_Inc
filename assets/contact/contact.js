const submitAjaxForm = (event) => {
  event.preventDefault();

  const form = event.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!validateName(name)) {
    alert("Please enter a valid name.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (message.length === 0) {
    alert("Please enter a message.");
    return;
  }

  emailjs
    .send("service_pzrhtvh", "template_gqfeuc9", {
      from_name: name,
      from_email: email,
      message: message,
    })
    .then(() => {
      form.innerHTML = `<h1 id='success'>Terimakasih telah menghubungi kami <br>Kami akan menghubungi anda kembali.</h1>`;
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      form.innerHTML = `<h1 id='error'>Oops! Terjadi error. <br>Silahkan coba lagi.</h1>`;
    });
};

document.querySelector("form").addEventListener("submit", submitAjaxForm);
