const menuData = [
    {id: 1, category: "Aperatif", name: "Tost", price: "100 TL", desc: "", img: "https://th.bing.com/th/id/OIP.5S-ZcCp74DRjhyB22pnnHwHaE7?w=286&h=191&c=7&r=0&o=7&pid=1.7&rm=3" },
    { id: 1, category: "Aperatif", name: "Köfte ekmek", price: "150 TL", desc: "", img: "https://img.freepik.com/premium-photo/delicious-turkish-meatballs-sandwich-kofte-ekmek-turkish-name-kofte-ekmek-ekmek-arasi-kofte_693630-4361.jpg?w=1380" },
    {id: 1, category: "Aperatif", name: "sucuk ekmek", price: "85 TL", desc: "", img: "https://tse2.mm.bing.net/th/id/OIP.fQs71vkYUp6ua-EGml8GwQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" },
    {id: 1, category: "Aperatif", name: "Patso", price: "50 TL", desc: "", img: "https://tse4.mm.bing.net/th/id/OIP.GCcTEGeMFFx3rA5KdHBx4gHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" },
    {id: 1, category: "Aperatif", name: "Çiğ Köfte Dürüm", price: " 60TL", desc: "", img: "https://th.bing.com/th/id/OIP._2VvWjQ1NtSUqvTiHOeA6wHaFj?w=245&h=184&c=7&r=0&o=7&pid=1.7&rm=3" },
    {id: 1, category: "Aperatif", name: "Çiğ Köfte", price: "600TL", desc: "kg", img: "https://www.cigkofteciomurusta.com/app/view/assets/site_images/1kg_cigkofte.png" },
    

    
    
    { id: 2, category: "Soğuk İçecekler", name: "Ayran", price: "25 TL", desc: "", img: "https://www.gelgorgari.com/image/cache/data/urunler/sutas-ayran-225-ml-600x315.jpg" },
    { id: 2, category: "Soğuk İçecekler", name: "Gazoz", price: "35 TL", desc: "", img: "https://th.bing.com/th/id/OIP.f-2PZXBtw1P0uGwHILJmpQHaHa?w=219&h=219&c=7&r=0&o=7&pid=1.7&rm=3" },
    { id: 2, category: "Soğuk İçecekler", name: "Pepsi", price: "55 TL", desc: "", img: "https://th.bing.com/th/id/OIP.mOqKm4z2_vrpL5XY6xYmWgHaHa?w=178&h=180&c=7&r=0&o=7&pid=1.7&rm=3" },
    { id: 2, category: "Soğuk İçecekler", name: "Su", price: "10 TL", desc: "", img: "https://th.bing.com/th/id/OIP.rT4U-7U7zlr8ZygfPmElXgAAAA?w=312&h=155&c=7&r=0&o=7&pid=1.7&rm=3" },
    { id: 2, category: "Soğuk İçecekler", name: "Bardak Su", price: "5 TL", desc: "", img: "https://cdn.dsmcdn.com/ty585/product/media/images/20221104/9/207191027/613266475/1/1_org.jpg" },



    { id: 3, category: "Sıcak İçecekler", name: "Çay", price: "15 TL", desc: "", img: "https://img.piri.net/resim/imagecrop/2022/12/10/11/50/resized_7a691-26b7cb58adobestock_225380470.jpeg" },

   { id: 4, category: "internet cafe", name: "PC", price: "Saat'lik 50 TL", desc: "", img:'https://avatars.mds.yandex.net/get-altay/9707320/2a00000189f44c3dbf3d09d5e3ac1dbe9bcc/orig' },
    { id: 4, category: "internet cafe", name: "PS", price: "Saat'lik 80 TL", desc: "", img:'https://avatars.mds.yandex.net/get-altay/4737312/2a0000017aec3586a5a771215af3b7e0a29c/L_height' },
    { id: 4, category: "internet cafe", name: "Bilardo", price: "Saat'lik 150 TL", desc: "", img:'https://cdn.dsmcdn.com/mrktng/seo/23nisan2/bilardo-kurallari-2.jpg' },


];



const menuContainer = document.getElementById('menu-container');
const navContainer = document.getElementById('category-nav');

// Kategorileri Benzersiz Hale Getir ve Nav'a Ekle
const categories = ["Hepsi", ...new Set(menuData.map(item => item.category))];

categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.innerText = cat;
    btn.className = 'category-btn';
    btn.onclick = () => filterMenu(cat, btn);
    navContainer.appendChild(btn);
});

function displayMenu(items) {
    menuContainer.innerHTML = items.map(item => `
        <div class="menu-item">
            <img src="${item.img}" alt="${item.name}">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <span class="price">${item.price}</span>
            </div>
        </div>
    `).join('');
}

function filterMenu(category, btn) {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    if(category === "Hepsi") return displayMenu(menuData);
    const filtered = menuData.filter(item => item.category === category);
    displayMenu(filtered);
}

// İlk açılışta hepsini göster
displayMenu(menuData);