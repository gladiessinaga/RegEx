document.addEventListener("DOMContentLoaded", () => {
    // Ambil elemen
    const form = document.querySelector("form");
    const email = document.getElementById("email");
    const username = document.getElementById("username");
    const nama = document.getElementById("nama");
    const telepon = document.getElementById("telepon");
    const password = document.getElementById("password");
    const showPasswordCheckbox = document.getElementById("showPassword");
  
    // Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-z0-9]{8,}$/;
    const namaRegex = /^([A-Z][a-z]+(?:\s[A-Z][a-z]+)*)$/;
    const teleponRegex = /^[0-9]{11,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  
    // Show / Hide error
    function showError(id, message) {
      let errorEl = document.getElementById(id);
      if (!errorEl) {
        errorEl = document.createElement("p");
        errorEl.id = id;
        errorEl.className = "text-sm text-red-500 mt-1";
        const inputField = document.getElementById(id.replace("Error", ""));
        inputField.parentNode.appendChild(errorEl);
      }
      errorEl.textContent = message;
      errorEl.classList.remove("hidden");
    }
  
    function hideError(id) {
      const errorEl = document.getElementById(id);
      if (errorEl) errorEl.classList.add("hidden");
    }
  
    // Validasi tiap input
    function validateEmail() {
      const value = email.value.trim();
      if (!emailRegex.test(value)) {
        showError("emailError", "Format email tidak valid");
        return false;
      }
      hideError("emailError");
      return true;
    }
  
    function validateUsername() {
      const value = username.value.trim();
      if (!usernameRegex.test(value)) {
        showError("usernameError", "Username minimal 8 huruf kecil/angka");
        return false;
      }
      hideError("usernameError");
      return true;
    }
  
    function validateNama() {
      const value = nama.value.trim();
      if (!namaRegex.test(value)) {
        showError("namaError", "Nama harus diawali huruf kapital");
        return false;
      }
      hideError("namaError");
      return true;
    }
  
    function validateTelepon() {
      const value = telepon.value.trim();
      if (!teleponRegex.test(value)) {
        showError("teleponError", "Nomor telepon minimal 11 digit angka");
        return false;
      }
      hideError("teleponError");
      return true;
    }
  
    function validatePassword() {
      const value = password.value.trim();
      if (!passwordRegex.test(value)) {
        showError("passwordError", "Password minimal 8 karakter, 1 huruf besar, 1 angka, 1 simbol");
        return false;
      }
      hideError("passwordError");
      return true;
    }
  
    // Event checkbox show password
    showPasswordCheckbox.addEventListener("change", () => {
      password.type = showPasswordCheckbox.checked ? "text" : "password";
    });
  
    // Submit handler
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const isEmailValid = validateEmail();
      const isUsernameValid = validateUsername();
      const isNamaValid = validateNama();
      const isTeleponValid = validateTelepon();
      const isPasswordValid = validatePassword();
  
      if (isEmailValid && isUsernameValid && isNamaValid && isTeleponValid && isPasswordValid) {
        Swal.fire({
          icon: "success",
          title: "Sukses!",
          text: "Form berhasil dikirim!",
        });
        form.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Periksa kembali data yang kamu isi.",
        });
      }
    });
  });
  