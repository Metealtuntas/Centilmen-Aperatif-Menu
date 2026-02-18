import { db } from "./firebase-config.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const menuContainer = document.getElementById('menu-container');
const navContainer = document.getElementById('category-nav');

// Veritabanını dinle
onSnapshot(collection(db, "menu"), (snapshot) => {
    const menuData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    if (menuData.length === 0) {
        menuContainer.innerHTML = "<p style='text-align:center; padding:20px;'>Menüde henüz ürün yok.</p>";
        return;
    }

    updateCategories(menuData);
    displayMenu(menuData);
});

function updateCategories(data) {
    navContainer.innerHTML = "";
    
    // DİKKAT: item.category yerine item.Kategori (Büyük harfle)
    const categories = ["Hepsi", ...new Set(data.map(item => item.Kategori))];

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
                // DİKKAT: item.category yerine item.Kategori
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
            <img src="https://via.placeholder.com/100" alt="${item.isim}">
            <div class="item-info">
                <h3>${item.isim}</h3>
                
                <p>${item.Tanım || ''}</p>
                
                <span class="price">${item.Fiyat}</span>
            </div>
        </div>
    `).join('');
}