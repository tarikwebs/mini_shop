let balance = 0;

function showSection(id){
    document.querySelectorAll('main section').forEach(sec=>{
        sec.classList.remove('active');
        sec.classList.add('hidden');
    });
    const sec = document.getElementById(id);
    if(sec){
        sec.classList.add('active');
        sec.classList.remove('hidden');
    }
}

function buy(button){
    const productDiv = button.parentElement;
    const name = productDiv.dataset.name;
    const price = parseInt(productDiv.dataset.price);
    if(balance < price){
        alert("💰 موجودی کافی نیست!");
        return;
    }
    balance -= price;
    document.getElementById('balance').innerText = `موجودی: ${balance} تومان`;
    alert(`✅ خرید محصول "${name}" با موفقیت انجام شد!`);
}

function sendSupport(){
    const msg = document.getElementById('supportMsg').value;
    if(!msg){ alert("پیام خالی است!"); return; }
    alert("✅ پیام شما ثبت شد و به پشتیبانی ارسال شد!");
    document.getElementById('supportMsg').value = '';
}

// پنل ادمین ساده
function adminLogin(){
    const pass = prompt("رمز ادمین را وارد کنید:");
    if(pass === "1234"){ // میتونی رمز خودتو عوض کنی
        showSection('adminPanel');
        updateAdminProducts();
    } else alert("❌ رمز اشتباه است!");
}

function updateAdminProducts(){
    const container = document.getElementById('adminProducts');
    container.innerHTML = '';
    document.querySelectorAll('#shop .product').forEach((p,i)=>{
        const div = document.createElement('div');
        div.innerHTML = `${i+1} - ${p.dataset.name} - ${p.dataset.price} تومان <button onclick="removeProduct(${i})">حذف</button>`;
        container.appendChild(div);
    });
}

function addProduct(){
    const name = document.getElementById('newProductName').value;
    const price = parseInt(document.getElementById('newProductPrice').value);
    if(!name || isNaN(price)){ alert("نام و قیمت صحیح وارد کنید"); return; }

    const div = document.createElement('div');
    div.className = 'product';
    div.dataset.name = name;
    div.dataset.price = price;
    div.innerHTML = `<h3>${name}</h3><p>قیمت: ${price} تومان</p><button onclick="buy(this)">خرید</button>`;
    document.getElementById('shop').appendChild(div);

    document.getElementById('newProductName').value = '';
    document.getElementById('newProductPrice').value = '';
    updateAdminProducts();
}

function removeProduct(index){
    const products = document.querySelectorAll('#shop .product');
    if(products[index]){
        products[index].remove();
        updateAdminProducts();
    }
}