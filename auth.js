// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// Cấu hình Firebase dùng project "spck-ea3e5"
const firebaseConfig = {
  apiKey: "AIzaSyDS2JF1sji2lfSZNzWE0zlQ88VIkK71rM0",
  authDomain: "spck-ea3e5.firebaseapp.com",
  projectId: "spck-ea3e5",
  storageBucket: "spck-ea3e5.firebasestorage.app",
  messagingSenderId: "1070426098190",
  appId: "1:1070426098190:web:293951bda73ed346258a5f"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'vi';
const provider = new GoogleAuthProvider();

// Đợi DOM sẵn sàng rồi mới gán sự kiện
document.addEventListener("DOMContentLoaded", () => {
  const googleLoginButtons = document.querySelectorAll(".google-btn");

  googleLoginButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          alert("Chào " + user.displayName);
          window.location.href = "./main.html"; // Chuyển hướng sau khi đăng nhập
        })
        .catch((error) => {
          alert("Đăng nhập thất bại: " + error.message);
        });
    });
  });
});
