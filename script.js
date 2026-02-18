import { db } from "./firebase-config.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const menuContainer = document.getElementById('menu-container');
const navContainer = document.getElementById('category-nav');

/// script.js içindeki onSnapshot kısmını bununla değiştir:

onSnapshot(collection(db, "menu"), (snapshot) => {
    let menuData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    // --- 1. SENİN İSTEDİĞİN KATEGORİ SIRALAMASI ---
    // Buraya hangi kategorinin önce gelmesini istiyorsan o sırayla yaz.
    const kategoriSiralamasi = [
        "Aperatif",
        "Soğuk İçecekler",
        "Sıcak İçecekler",
        "Sandviçler",
        "Tatlılar",
        "İnternet Kafe",
        "Playstation"
    ];

    // --- 2. SIRALAMA MOTORU ---
    menuData.sort((a, b) => {
        // A) Önce Kategori Sırasını Bul
        let siraA = kategoriSiralamasi.indexOf(a.Kategori);
        let siraB = kategoriSiralamasi.indexOf(b.Kategori);

        // Listede olmayan (yeni eklenmiş) bir kategori varsa en sona at
        if (siraA === -1) siraA = 999;
        if (siraB === -1) siraB = 999;

        // B) Eğer kategoriler farklıysa, kategori sırasına göre diz
        if (siraA !== siraB) {
            return siraA - siraB;
        }

        // C) Eğer kategoriler AYNIYSA (ikisi de "Soğuk İçecekler" ise), Fiyata göre diz
        let fiyatA = parseFloat(a.Fiyat.toString().replace(/[^0-9.]/g, '')) || 0;
        let fiyatB = parseFloat(b.Fiyat.toString().replace(/[^0-9.]/g, '')) || 0;
        
        return fiyatA - fiyatB; // Ucuzdan pahalıya
    });

    console.log("Özel Sıralı Veriler:", menuData);

    if (menuData.length === 0) {
        menuContainer.innerHTML = "<p style='text-align:center;'>Menü boş.</p>";
        return;
    }

    updateCategories(menuData); // Butonları oluştur
    displayMenu(menuData);      // Ürünleri listele
});

    // --- YENİ EKLENEN SIRALAMA KODU ---
    menuData.sort((a, b) => {
        // Fiyatın içindeki "TL" yazısını silip saf sayıya çeviriyoruz
        let fiyatA = parseFloat(a.Fiyat.toString().replace(/[^0-9.]/g, '')) || 0;
        let fiyatB = parseFloat(b.Fiyat.toString().replace(/[^0-9.]/g, '')) || 0;
        
        return fiyatA - fiyatB; // Küçükten büyüğe sıralar
    });
    // ----------------------------------

    console.log("Sıralanmış Veriler:", menuData);

    if (menuData.length === 0) {
        menuContainer.innerHTML = "<p style='text-align:center;'>Menü boş.</p>";
        return;
    }

    updateCategories(menuData);
    displayMenu(menuData);
;
function updateCategories(data) {
    navContainer.innerHTML = "";
    
    // 1. Veritabanındaki mevcut kategorileri bul (Benzersiz olanlar)
    let rawCategories = [...new Set(data.map(item => item.Kategori))];

    // 2. SENİN İSTEDİĞİN SABİT SIRALAMA LİSTESİ
    // (Butonların hangi sırayla dizilmesini istiyorsan buraya yaz)
    const fixedOrder = [
        "Aperatif",
        "Soğuk İçecekler",
        "Sıcak İçecekler",
        "Tatlılar",
        "İnternet Kafe",
    ];

    // 3. Kategorileri senin listene göre yeniden diz
    rawCategories.sort((a, b) => {
        let indexA = fixedOrder.indexOf(a);
        let indexB = fixedOrder.indexOf(b);

        // Eğer senin listende olmayan yeni bir kategori varsa onu en sona at
        if (indexA === -1) indexA = 999;
        if (indexB === -1) indexB = 999;

        return indexA - indexB;
    });

    // 4. "Hepsi" butonunu en başa ekle
    const categories = ["Hepsi", ...rawCategories];

    // 5. Butonları Ekrana Bas (Burası eski kodla aynı)
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.innerText = cat;
        btn.className = 'category-btn';
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

function displayMenu(items) {
    menuContainer.innerHTML = items.map(item => `
        <div class="menu-item">
            <img src="${item.Resim}" alt="${item.isim}" onerror="this.src='https://via.placeholder.com/100'">
            <div class="item-info">
                <h3>${item.isim}</h3>
                
                <p>${item.Tanım || ''}</p>
                
                <span class="price">${item.Fiyat}</span>
            </div>
        </div>
    `).join('');
}