// 1. Firebase kütüphanelerini internetten çekiyoruz (npm gerekmez)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// 2. SENİN RESİMDEKİ BİLGİLERİ BURAYA YAPIŞTIR
// (Resimdeki const firebaseConfig = { ... } süslü parantez içindekileri buraya al)
const firebaseConfig = {
  apiKey: "AIzaSyAFQqlXvRGnet7vKJLwtbVTkHSn0_IBnBs", // Senin resimdeki kod
  authDomain: "menu-25142.firebaseapp.com",        // Senin resimdeki kod
  projectId: "menu-25142",                           // Senin resimdeki kod
  storageBucket: "menu-25142.firebasestorage.app",  // Senin resimdeki kod
  messagingSenderId: "679156264820",                 // Senin resimdeki kod
  appId: "1:679156264820:web:e1d6ce6a01d0cb89370621", // Senin resimdeki kod
  measurementId: "G-M0655LPDNB"                      // Senin resimdeki kod
};

// 3. Firebase'i başlatıyoruz
const app = initializeApp(firebaseConfig);

// 4. Veritabanını dışarıya açıyoruz (Diğer dosyalarda kullanmak için)
export const db = getFirestore(app);