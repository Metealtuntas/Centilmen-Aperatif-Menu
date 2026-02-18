// firebase-config.js - GÜNCEL HALİ
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"; // Giriş sistemi eklendi

// SENİN BİLGİLERİN (Burası senin attığın resimdeki gibi kalsın)
const firebaseConfig = {
  apiKey: "AIzaSyAFQqlXvRGnet7vKJLwtbVTkHSn0_IBnBs",
  authDomain: "menu-25142.firebaseapp.com",
  projectId: "menu-25142",
  storageBucket: "menu-25142.firebasestorage.app",
  messagingSenderId: "679156264820",
  appId: "1:679156264820:web:e1d6ce6a01d0cb89370621",
  measurementId: "G-M0655LPDNB"
};

// Uygulamayı başlat
const app = initializeApp(firebaseConfig);

// Dışarıya aktarılanlar (Admin sayfası bunları kullanıyor)
export const db = getFirestore(app);
export const auth = getAuth(app);  // İŞTE EKSİK OLAN SATIR BU