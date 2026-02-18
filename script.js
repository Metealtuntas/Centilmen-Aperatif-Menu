// 1. Firebase yapılandırmasını içeri al (import et)
import { db } from "./firebase-config.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const menuContainer = document.getElementById('menu-container');
const navContainer = document.getElementById('category-nav');

// 2. Firebase'deki "menu" koleksiyonunu anlık dinle
onSnapshot(collection(db, "menu"), (snapshot) => {
    // Verileri çekip düzgün bir listeye çeviriyoruz
    const menuData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    // Konsola yazdır ki verinin geldiğini görelim (F12 > Console'da çıkar)
    console.log("Firebase'den gelen veriler:", menuData);

    // Eğer veri yoksa uyarı ver
    if (menuData.length === 0) {
        menuContainer.innerHTML = "<p style='text-align:center; padding:20px;'>Menüde henüz ürün yok.</p>";
        return;
    }

    // Kategorileri güncelle ve menüyü ekrana bas
    updateCategories(menuData);
    displayMenu(menuData);
});

// --- Yardımcı Fonksiyonlar (Eskisiyle Aynı) ---

function updateCategories(data) {
    // Mevcut butonları temizle
    navContainer.innerHTML = "";
    
    // Kategorileri belirle
    const categories = ["Hepsi", ...new Set(data.map(item => item.category))];

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.innerText = cat;
        btn.className = 'category-btn';
        // İlk açılışta "Hepsi" seçili olsun
        if(cat === "Hepsi") btn.classList.add('active');
        
        btn.onclick = () => {
            // Aktif sınıfını değiştir
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filtreleme yap
            if(cat === "Hepsi") {
                displayMenu(data);
            } else {
                const filtered = data.filter(item => item.category === cat);
                displayMenu(filtered);
            }
        };
        navContainer.appendChild(btn);
    });
}

function displayMenu(items) {
    menuContainer.innerHTML = items.map(item => `
        <div class="menu-item">
            <img src="${item.img || 'https://via.placeholder.com/100'}" alt="${item.name}">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>${item.desc || ''}</p>
                <span class="price">${item.price}</span>
            </div>
        </div>
    `).join('');
}