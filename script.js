// Klik class aktif
const menuOpsion = document.querySelector('.menu-opsion');
const menuButton = document.querySelector('#menu-button');

    document.querySelector("*").style.overflowX  = "hidden"


if (menuButton && menuOpsion) {
    menuButton.onclick = (event) => {
        event.preventDefault();
        console.log();
        menuOpsion.classList.toggle('active');
    };

    document.addEventListener('click', function (e) {
        if (!menuOpsion.contains(e.target) && !menuButton.contains(e.target)) {
            menuOpsion.classList.remove('active');
       document.querySelector("*").style.overflowX  = "hidden"
        }
    });
}




// Mendapatkan elemen yang diperlukan
let keranjangIcon = document.querySelector("#icon-keranjang");
let Keranjang = document.querySelector(".keranjang");
let closeKeranjang = document.querySelector("#close-keranjang");

// Fungsi untuk membuka keranjang
keranjangIcon.onclick = (event) => {
    event.preventDefault();
    Keranjang.classList.toggle('active');
};

// Fungsi untuk menutup keranjang
closeKeranjang.onclick = () => {
    Keranjang.classList.remove('active');
};

// Menutup keranjang jika klik di luar elemen keranjang
document.addEventListener('click', function (e) {
    if (!Keranjang.contains(e.target) && !keranjangIcon.contains(e.target)) {
        Keranjang.classList.remove('active');
    }
});

// Menunggu halaman selesai dimuat untuk mengaktifkan fungsi lainnya
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    // Mengatur tombol untuk menghapus item dari keranjang
    var removeCartButtons = document.getElementsByClassName('icon-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    // Mengatur input jumlah produk dalam keranjang
    var quantityInputs = document.getElementsByClassName('card-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    // Menambahkan item ke keranjang
    var addCartButtons = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCartButtons.length; i++) {
        var button = addCartButtons[i];
        button.addEventListener('click', addCartClicked);
    }

    // Membeli produk
    document.querySelector('.btn-buy').addEventListener('click', buyButtonClicked);
}

// Fungsi untuk menambah item ke keranjang
function addCartClicked(event) {
    event.stopPropagation(); // Menghentikan event agar tidak memengaruhi elemen lain
    var button = event.target;
    var shopProducts = button.closest('.card-item');
    var title = shopProducts.querySelector('.product-title').innerText;
    var price = shopProducts.querySelector('.button-text').innerText;
    var produkImg = shopProducts.querySelector('img').src;

    addProductToCart(title, price, produkImg);
    updatetotal();
}

// Fungsi untuk menambahkan produk ke keranjang
function addProductToCart(title, price, produkImg) {
    var keranjangKontent = document.querySelector('.keranjang-kontent');

    var cartItemNames = keranjangKontent.querySelectorAll('.produck-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            alert("Anda Sudah Memasukan Produk Ini Ke Keranajng 🙌");
            return;
        }
    }

    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('keranjang-box');

    var cartBoxContent = `
        <img src="${produkImg}" alt="foto produk" class="keranjang-img">
        <div class="detail-box">
            <p class="produck-title">${title}</p>
            <span class="keranjang-price">${price}</span>
            <input type="number" value="1" class="card-quantity">
        </div>
        <i class="fa-solid fa-trash icon-remove"></i>
    `;
    cartShopBox.innerHTML = cartBoxContent;

    keranjangKontent.appendChild(cartShopBox);

    // Menambahkan event listener untuk menghapus produk
    cartShopBox.querySelector('.icon-remove').addEventListener('click', removeCartItem);
    cartShopBox.querySelector('.card-quantity').addEventListener('change', quantityChanged);
}

// Fungsi untuk menghapus item dari keranjang
function removeCartItem(event) {
    event.stopPropagation();
    var buttonClicked = event.target;
    buttonClicked.closest('.keranjang-box').remove();
    updatetotal();
}

// Fungsi untuk mengubah jumlah produk dalam keranjang
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

// Fungsi untuk membeli item
function buyButtonClicked() {
    alert('Trimakasih Sudah Berbelanja 🥰 Pesanan Anda Akan di Proses secepatnya !!! ');
    var cartContent = document.querySelector('.keranjang-kontent');
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

// Fungsi untuk memperbarui total harga keranjang
function updatetotal() {
    var keranjangKontent = document.querySelector('.keranjang-kontent');
    var keranjangBoxes = keranjangKontent.querySelectorAll('.keranjang-box');
    var total = 0;

    for (var i = 0; i < keranjangBoxes.length; i++) {
        var box = keranjangBoxes[i];
        var priceElement = box.querySelector('.keranjang-price');
        var quantityElement = box.querySelector('.card-quantity');

        var price = parseFloat(priceElement.innerText.replace(/[^0-9.-]+/g, '').trim());
        var quantity = parseInt(quantityElement.value);

        if (!isNaN(price) && !isNaN(quantity)) {
            total += price * quantity;
        }
    }

    document.querySelector('.total-price').innerText = 'Rp' + total.toLocaleString('id-ID', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

// kontak
// Inisialisasi EmailJS
// Inisialisasi EmailJS
try {
    emailjs.init("c-S3UmbRoVXHDm-HU"); // Ganti dengan Public Key Anda
    console.log("EmailJS diinisialisasi dengan sukses.");
} catch (error) {
    console.error("Gagal inisialisasi EmailJS:", error);
}

// Menangani pengiriman form
document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah pengiriman form secara default

    // Ambil data dari form
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

   
    const data = {
        service_id: "service_euden8u",
        template_id: "template_j2j44xs", 
        user_id: "c-S3UmbRoVXHDm-HU",
        template_params: {
            from_name: name,
            from_email: email,
            message: message
        }
    };

   
    fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(data) 
    })
        .then(response => {
            if (response.ok) {
                console.log("Email berhasil dikirim.");
                alert("Pesan Anda telah dikirim!");
            } else {
                return response.json().then(err => {
                    console.error("Terjadi kesalahan:", err);
                    alert("Terjadi kesalahan, coba lagi nanti.");
                });
            }
        })
        .catch(error => {
            console.error("Kesalahan jaringan:", error);
            alert("Kesalahan jaringan, coba lagi nanti.");
        });
});

// kontak end

// tombol on off suara
document.addEventListener("DOMContentLoaded", function () {
    const soundControl = document.getElementById("sound-control");
    const soundIcon = document.getElementById("sound-icon");
    const audioPlayer = document.getElementById("audio-player");

    let isPlaying = false;  
    soundControl.addEventListener("click", function (event) {
      event.preventDefault(); // Mencegah refresh halaman
    if (isPlaying) {
        audioPlayer.pause();
        soundIcon.classList.remove("fa-volume-up");
        soundIcon.classList.add("fa-volume-mute");
    } else {
        audioPlayer.play();
        soundIcon.classList.remove("fa-volume-mute");
        soundIcon.classList.add("fa-volume-up");
    }
    isPlaying = !isPlaying;
    });
});
// end

// popup
// Mengambil elemen yang diperlukan
const searchIcon = document.getElementById('search-icon');
const popup = document.getElementById('popup');

// Menampilkan popup saat ikon pencarian diklik
searchIcon.addEventListener('click', function (event) {
  event.preventDefault(); // Menghindari link default
  popup.style.right = '0'; // Menggerakkan popup dari luar ke dalam
});

// Menutup popup ketika area di luar konten popup diklik
window.addEventListener('click', function (event) {
  if (event.target === popup) {
    popup.style.right = '-400px'; // Mengembalikan popup ke luar layar
  }
});