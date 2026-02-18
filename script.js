// script.js - TAM VE DÜZELTİLMİŞ HALİ
import { db } from "./firebase-config.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// --- AYARLAR: HTML'deki ID'lerini buraya yaz ---
// Eğer ürünler ekrana gelmezse buradaki tırnak içindeki isimleri kontrol et.
const menuContainer = document.getElementById("menu-container") || document.getElementById("menu") || document.getElementById("product-list");
// script.js dosyasındaki navContainer satırını bununla değiştir:
const navContainer = document.getElementById("category-nav");

// --- VERİ ÇEKME VE SIRALAMA ---
onSnapshot(collection(db, "menu"), (snapshot) => {
    let menuData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    // 1. KATEGORİ SIRALAMASI (İstediğin Sıra)
    const kategoriSiralamasi = [
        "Aperatif",
        "Soğuk İçecekler",
        "Sıcak İçecekler",
        "Tatlılar",
        "İnternet Kafe",
    ];

    // 2. SIRALAMA MOTORU
    menuData.sort((a, b) => {
        // A) Önce Kategori Sırasını Bul
        let siraA = kategoriSiralamasi.indexOf(a.Kategori);
        let siraB = kategoriSiralamasi.indexOf(b.Kategori);

        // Listede olmayan varsa en sona at
        if (siraA === -1) siraA = 999;
        if (siraB === -1) siraB = 999;

        // B) Kategoriler farklıysa, kategoriye göre diz
        if (siraA !== siraB) {
            return siraA - siraB;
        }

        // C) Kategoriler aynıysa, Fiyata göre diz (Ucuzdan pahalıya)
        let fiyatA = parseFloat(a.Fiyat.toString().replace(/[^0-9.]/g, '')) || 0;
        let fiyatB = parseFloat(b.Fiyat.toString().replace(/[^0-9.]/g, '')) || 0;
        
        return fiyatA - fiyatB;
    });

    // Veri yoksa uyarı ver
    if (menuData.length === 0) {
        if(menuContainer) menuContainer.innerHTML = "<div style='text-align:center; padding:20px;'>Menü şu an boş.</div>";
        return;
    }

    // Fonksiyonları çalıştır
    updateCategories(menuData);
    displayMenu(menuData);
});

// --- KATEGORİ BUTONLARINI OLUŞTUR ---
function updateCategories(data) {
    if(!navContainer) return; // Hata almamak için kontrol
    navContainer.innerHTML = "";
    
    // Benzersiz kategorileri bul
    let rawCategories = [...new Set(data.map(item => item.Kategori))];

    // Senin sıralama listene göre diz
    const fixedOrder = [
        "Aperatif", "Soğuk İçecekler", "Sıcak İçecekler", 
        "Sandviçler", "Tatlılar", "İnternet Kafe", "Playstation"
    ];

    rawCategories.sort((a, b) => {
        let indexA = fixedOrder.indexOf(a);
        let indexB = fixedOrder.indexOf(b);
        if (indexA === -1) indexA = 999;
        if (indexB === -1) indexB = 999;
        return indexA - indexB;
    });

    const categories = ["Hepsi", ...rawCategories];

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.innerText = cat;
        btn.className = 'category-btn'; // CSS class'ın
        if(cat === "Hepsi") btn.classList.add('active');
        
        btn.onclick = () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            if(cat === "Hepsi") {
                displayMenu(data);
            } else {
                const filtered = data.filter(item => item.Kategori === cat);
                displayMenu(filtered);
            }
        };
        navContainer.appendChild(btn);
    });
}

// --- MENÜYÜ EKRANA BAS ---
function displayMenu(items) {
    if(!menuContainer) return;
    menuContainer.innerHTML = "";
    
    items.forEach(item => {
        // Kart HTML yapısı (Senin tasarımına uygun basit yapı)
        const html = `
            <div class="menu-item">
                <img src="${item.Resim || 'https://via.placeholder.com/150'}" alt="${item.isim}" class="item-img">
                <div class="item-info">
                    <div class="item-header">
                        <h3 class="item-title">${item.isim}</h3>
                        <span class="item-price">${item.Fiyat}</span>
                    </div>
                    <p class="item-desc">${item.Tanım || ''}</p>
                </div>
            </div>
        `;
        menuContainer.innerHTML += html;
    });
}