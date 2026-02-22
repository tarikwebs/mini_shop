let balance = 0;
let orders = []; //  

//  
let products = [
    {name: " 1 ", price: 100000},
    {name: " 3 ", price: 250000}
];

function initShop(){
    const shop = document.getElementById('shop');
    shop.innerHTML = '';
    products.forEach((p, idx)=>{
        const div = document.createElement('div');
        div.className = 'product';
        div.dataset.index = idx;
        div.innerHTML = `<h3>${p.name}</h3><p>: ${p.price} </p><button onclick="buy(${idx})"></button>`;
        shop.appendChild(div);
    });
}

//  
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

//  
function buy(idx){
    const product = products[idx];
    if(balance < product.price){
        alert("   !");
        return;
    }
    balance -= product.price;
    document.getElementById('balance').innerText = `: ${balance} `;
    orders.push({name: product.name, price: product.price, date: new Date().toLocaleString()});
    updateUserOrders();
    updateAdminOrders();
    alert(`  "${product.name}"    !`);
}

//   
function updateUserOrders(){
    const list = document.getElementById('userOrders');
    list.innerHTML = '';
    orders.forEach(o=>{
        const li = document.createElement('li');
        li.innerText = `${o.name} - ${o.price}  - ${o.date}`;
        list.appendChild(li);
    });
}

//   
function sendSupport(){
    const msg = document.getElementById('supportMsg').value;
    if(!msg){ alert("  !"); return; }
    alert("         !");
    document.getElementById('supportMsg').value = '';
}

//  
function adminLogin(){
    const pass = prompt("    :");
    if(pass === "13871387ixA"){
        showSection('adminPanel');
        updateAdminProducts();
        updateAdminOrders();
    } else alert("   !");
}

function updateAdminProducts(){
    const container = document.getElementById('adminProducts');
    container.innerHTML = '';
    products.forEach((p,i)=>{
        const div = document.createElement('div');
        div.innerHTML = `${i+1} - ${p.name} - ${p.price}  <button onclick="removeProduct(${i})"></button>`;
        container.appendChild(div);
    });
}

function updateAdminOrders(){
    const list = document.getElementById('adminOrders');
    list.innerHTML = '';
    orders.forEach((o, i)=>{
        const li = document.createElement('li');
        li.innerText = `${o.name} - ${o.price}  - ${o.date}`;
        list.appendChild(li);
    });
}

//  
function addProduct(){
    const name = document.getElementById('newProductName').value;
    const price = parseInt(document.getElementById('newProductPrice').value);
    if(!name || isNaN(price)){ alert("     "); return; }
    products.push({name, price});
    document.getElementById('newProductName').value = '';
    document.getElementById('newProductPrice').value = '';
    initShop();
    updateAdminProducts();
}

//  
function removeProduct(idx){
    products.splice(idx,1);
    initShop();
    updateAdminProducts();
}

//  
initShop();
updateUserOrders();