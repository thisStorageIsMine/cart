var HOST = "localhost", PORT = "2861";
var storageNode = document.getElementById("storage"), cartNode = document.getElementById("cart-goods");
cartNode.style.display = "none";
window.addEventListener("DOMContentLoaded", function () { return fetchGoods(); });
function fetchGoods() {
    var fetchStorage = fetch("http://".concat(HOST, ":").concat(PORT, "/storage"))
        .then(function (data) { return data.json(); })
        .then(function (data) {
        cartNode.style.display = "";
        createGoods(data);
    })
        .catch(function (err) { return createGoodsError(); });
}
function createGoods(storage) {
    if (!storageNode)
        return;
    storageNode.innerHTML += "\n        <h1 class=\"text-4xl text-stone-50\">\n        \u0412\u0441\u0435 \u0442\u043E\u0432\u0430\u0440\u044B\n    </h1>\n    \n    ";
    for (var _i = 0, storage_1 = storage; _i < storage_1.length; _i++) {
        var good = storage_1[_i];
        createGood(good);
    }
}
function createGood(good) {
    if (!storageNode)
        return;
    var goodWrap = document.createElement("div"), goodTitle = document.createElement("h2"), goodPrice = document.createElement("p"), goodAmount = document.createElement("p"), goodBtn = document.createElement("button");
    goodWrap.className = "border bg-slate-200 rounded-xl w-full h-24 flex gap-12 justify-between items-center py-2 px-4";
    goodTitle.className = goodPrice.className = goodAmount.className = "w-[200px] text-ellipsis";
    goodBtn.className = "relative py-1 px-2 border-none  shadow-lg rounded-lg bg-slate-100 group flex justify-center items-center hover:bg-slate-900";
    goodBtn.setAttribute("data-name", "".concat(good.name));
    goodBtn.setAttribute("data-price", "".concat(good.price));
    goodBtn.setAttribute("data-amount", "".concat(good.amount));
    goodBtn.setAttribute("title", "Добавить в корзину");
    goodTitle.textContent = good.name;
    goodPrice.textContent = "".concat(good.price);
    goodAmount.textContent = "".concat(good.amount);
    goodBtn.innerHTML = "\n                <svg class=\"w-6 group-hover:fill-slate-200\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\">\n                 <path\n                        d=\"M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z\" />\n                </svg>\n    ";
    goodBtn.addEventListener("click", add2Cart);
    goodWrap.append(goodTitle, goodPrice, goodAmount, goodBtn);
    storageNode.append(goodWrap);
}
function createGoodsError() {
    document.body.innerHTML = "\n\n    <h1 class=\"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-400 text-6xl\">\n    \u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A...<br>\n    <p class=\"text-4xl mt-6 text-red-400/[70%]\">\n        \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0432\u043A\u043B\u044E\u0447\u0435\u043D \u043B\u0438 \u0441\u0435\u0440\u0432\u0435\u0440\n\n    </p>\n</h1>\n    ";
}
function add2Cart(e) {
    if (!e.currentTarget)
        return;
    var target = e.currentTarget;
    if (isGoodExist(target.dataset.name || ""))
        return;
    var cartItem = createGoodCart(target);
    cartNode === null || cartNode === void 0 ? void 0 : cartNode.append(cartItem);
}
function isGoodExist(name) {
    if (!(cartNode === null || cartNode === void 0 ? void 0 : cartNode.childNodes))
        return;
    for (var _i = 0, _a = cartNode === null || cartNode === void 0 ? void 0 : cartNode.children; _i < _a.length; _i++) {
        var good = _a[_i];
        if (good instanceof HTMLElement) {
            if (good.dataset.name === name)
                return true;
        }
    }
    return false;
}
function createGoodCart(target) {
    var cartItemWrap = document.createElement("div"), cartItemTitle = document.createElement("h2"), cartItemPrice = document.createElement("p"), cartItemInputWrap = document.createElement("button"), cartItemInputDecrease = document.createElement("button"), cartItemInputIncrease = document.createElement("button"), cartItemInput = document.createElement("input");
    cartItemWrap.setAttribute("data-name", "".concat(target.dataset.name));
    cartItemTitle.setAttribute("title", "".concat(target.dataset.name));
    cartItemWrap.className = "bg-slate-800 rounded-xl w-full h-24 flex gap-12 justify-between items-center py-2 px-4 shrink-0";
    cartItemTitle.className = "w-[200px] truncate";
    cartItemPrice.className = "w-[200px] ttruncate text-xl";
    cartItemInputWrap.className = "flex justify-center items-center";
    cartItemInputDecrease.className = cartItemInputIncrease.className = "flex justify-center items-center rounded-full border border-white p-1";
    cartItemInput.className = "w-12 text-center bg-transparent text-slate-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";
    cartItemTitle.textContent = target.dataset.name;
    cartItemPrice.innerHTML = "".concat(target.dataset.price);
    cartItemInput.value = "1";
    cartItemInputDecrease.innerHTML = "\n            <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path\n                d=\"M21.1667 10.34H2.83333C2.37292 10.34 2 10.7129 2 11.1733V12.84C2 13.3004 2.37292 13.6733 2.83333 13.6733H21.1667C21.6271 13.6733 22 13.3004 22 12.84V11.1733C22 10.7129 21.6271 10.34 21.1667 10.34Z\"\n                fill=\"white\" />\n            </svg>\n    ";
    cartItemInputIncrease.innerHTML = "\n            <svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path\n                d=\"M21.1667 10.3333H13.6667V2.83333C13.6667 2.37292 13.2937 2 12.8333 2H11.1667C10.7063 2 10.3333 2.37292 10.3333 2.83333V10.3333H2.83333C2.37292 10.3333 2 10.7063 2 11.1667V12.8333C2 13.2937 2.37292 13.6667 2.83333 13.6667H10.3333V21.1667C10.3333 21.6271 10.7063 22 11.1667 22H12.8333C13.2937 22 13.6667 21.6271 13.6667 21.1667V13.6667H21.1667C21.6271 13.6667 22 13.2937 22 12.8333V11.1667C22 10.7063 21.6271 10.3333 21.1667 10.3333Z\"\n                fill=\"white\" />\n            </svg>\n    ";
    cartItemInput.setAttribute("data-amount", "true");
    cartItemInputDecrease.addEventListener("click", function (e) { return changeAmount(e.currentTarget, -1); });
    cartItemInputIncrease.addEventListener("click", function (e) { return changeAmount(e.currentTarget, 1); });
    function changeAmount(target, n) {
        console.log(target.closest("input"));
    }
    cartItemInputWrap.append(cartItemInputDecrease, cartItemInput, cartItemInputIncrease);
    cartItemWrap.append(cartItemTitle, cartItemPrice, cartItemInputWrap);
    return cartItemWrap;
}
