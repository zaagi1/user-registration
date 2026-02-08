// ======================
// ===== DOM ELEMENTS =====
// ======================
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const welcomeUser = document.getElementById("welcomeUser");
const dashboardMsg = document.getElementById("dashboardMsg");
const logoutBtn = document.getElementById("logoutBtn");


// ======================
// ===== VALIDATION FUNCTIONS =====
// ======================

// Magaca: Waa inuu xarfo keliya yahay
function isValidName(name) {
  return /^[A-Za-z\s]+$/.test(name);
}

// Password: Waa inuu nambarro keliya yahay (6 ama ka badan)
function isValidPassword(password) {
  return /^\d{6,}$/.test(password);
}


// ======================
// ===== SIGNUP LOGIC =====
// ======================
if (signupForm) {
  const signupSuccess = document.getElementById("signupSuccess");
  if (signupSuccess) signupSuccess.style.display = "none";

  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validation
    if (!isValidName(name)) {
      return alert("❌ Magaca waa inuu xarfo keliya noqdaa!");
    }

    if (!isValidPassword(password)) {
      return alert("❌ Password waa inuu nambarro keliya yahay (ugu yaraan 6 nambar)!");
    }

    // Save user
    const user = { name, email, password };
    localStorage.setItem("userData", JSON.stringify(user));

    // Show success
    if (signupSuccess) {
      signupSuccess.style.display = "block";
      signupForm.style.display = "none";
    }

    // Redirect to dashboard
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);
  });
}


// ======================
// ===== LOGIN LOGIC =====
// ======================
if (loginForm) {
  const loginSuccess = document.getElementById("loginSuccess");
  if (loginSuccess) loginSuccess.style.display = "none";

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const user = JSON.parse(localStorage.getItem("userData"));

    if (!user) {
      return alert("❌ Account ma jiro! Fadlan signup samee.");
    }

    if (email === user.email && password === user.password) {
      if (loginSuccess) loginSuccess.style.display = "block";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);
    } else {
      alert("❌ Email ama Password waa khalad!");
    }
  });
}


// ======================
// ===== DASHBOARD LOGIC =====
// ======================
if (welcomeUser) {
  const user = JSON.parse(localStorage.getItem("userData"));

  if (user) {
    welcomeUser.textContent = `Welcome, ${user.name}!`;

    if (dashboardMsg) {
      dashboardMsg.textContent =
        "🎉 Waad ku guuleysatay inaad gasho Dashboard-ka.";
    }
  } else {
    window.location.href = "login.html";
  }
}


// ======================
// ===== LOGOUT =====
// ======================
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("userData");
    window.location.href = "login.html";
  });
}
