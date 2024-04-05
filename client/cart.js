var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var HOST = "localhost", PORT = "2861";
var serverURL = "http://".concat(HOST, ":").concat(PORT);
var storageNode = document.getElementById("storage"), cartNode = document.getElementById("cart-goods"), cartSum = document.getElementById("cart-sum"), removeDialog = document.getElementById("removeDialog"), notifications = document.getElementById("notifications"), buyBtn = document.getElementById("buy");
var userID = Math.random() * Date.now();
localStorage.setItem('id', String(userID));
window.addEventListener("DOMContentLoaded", function () { return fetchGoods(); });
// Собираем товары с сервера
function fetchGoods() {
    if (!storageNode)
        return;
    storageNode.innerHTML = '';
    var fetchStorage = fetch("".concat(serverURL, "/storage"))
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
// Создаём карточку для всех товаров
function createGood(good) {
    if (!storageNode)
        return;
    var goodWrap = document.createElement("div"), goodTitle = document.createElement("h2"), goodPrice = document.createElement("p"), goodAmount = document.createElement("p"), goodBtn = document.createElement("button");
    goodWrap.className = "border bg-slate-200 rounded-xl w-full h-24 flex gap-12 justify-between items-center py-2 px-4";
    goodTitle.className = goodPrice.className = goodAmount.className = "w-[200px] truncate";
    goodBtn.className = "relative py-1 px-2 border-none  shadow-lg rounded-lg bg-slate-100 group flex justify-center items-center hover:bg-slate-900";
    goodBtn.setAttribute("data-name", "".concat(good.name));
    goodBtn.setAttribute("data-price", "".concat(good.price));
    goodBtn.setAttribute("data-amount", "".concat(good.amount));
    goodBtn.setAttribute("data-id", "".concat(good.id));
    goodBtn.setAttribute("title", "Добавить в корзину");
    goodTitle.setAttribute("title", "".concat(good.name));
    goodTitle.textContent = good.name;
    goodPrice.textContent = "".concat(good.price);
    goodAmount.textContent = "".concat(good.amount);
    goodBtn.innerHTML = "\n                <svg class=\"w-6 group-hover:fill-slate-200\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\">\n                 <path\n                        d=\"M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z\" />\n                </svg>\n    ";
    goodBtn.addEventListener("click", add2Cart);
    goodWrap.append(goodTitle, goodPrice, goodAmount, goodBtn);
    storageNode.append(goodWrap);
}
// Если нам не пришёл ответ с сервера
function createGoodsError() {
    document.body.innerHTML = "\n\n    <h1 class=\"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-400 text-6xl\">\n    \u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A...<br>\n    <p class=\"text-4xl mt-6 text-red-400/[70%]\">\n        \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0432\u043A\u043B\u044E\u0447\u0435\u043D \u043B\u0438 \u0441\u0435\u0440\u0432\u0435\u0440\n\n    </p>\n</h1>\n    ";
}
// Добавляем в корзину
function add2Cart(e) {
    if (!e.currentTarget || !cartSum)
        return;
    var target = e.currentTarget;
    if (isGoodExist(target.dataset.name || ""))
        return;
    var cartItem = createGoodCart(target);
    cartNode === null || cartNode === void 0 ? void 0 : cartNode.append(cartItem);
    cartSum.textContent = String(Number(cartSum.textContent) + Number(target.dataset.price));
}
//Cоздаём карточку дял корзины
function createGoodCart(target) {
    var cartItemWrap = document.createElement("div"), cartItemTitle = document.createElement("h2"), cartItemPrice = document.createElement("p"), cartItemInputWrap = document.createElement("button"), cartItemInputDecrease = document.createElement("button"), cartItemInputIncrease = document.createElement("button"), cartItemInput = document.createElement("input");
    cartItemWrap.setAttribute("data-name", "".concat(target.dataset.name));
    cartItemWrap.setAttribute("data-amount", "".concat(target.dataset.amount));
    cartItemWrap.setAttribute("data-id", "".concat(target.dataset.id));
    cartItemWrap.setAttribute("data-good-amount", "1");
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
    // cartItemInput.setAttribute("data-amount", "true");
    cartItemInputDecrease.addEventListener("click", function (e) { return changeAmount(-1, Number(target.dataset.price)); });
    cartItemInputIncrease.addEventListener("click", function (e) { return changeAmount(1, Number(target.dataset.price)); });
    cartItemInput.addEventListener("change", function (e) {
        var eventTarget = e.currentTarget;
        changeAmount(Number(eventTarget.value), Number(target.dataset.price), false);
    });
    function changeAmount(n, price, ischangeCameFromBtn) {
        if (ischangeCameFromBtn === void 0) { ischangeCameFromBtn = true; }
        if (!cartSum)
            return;
        var oldValue = Number(cartItemInput.value);
        var newValue = (ischangeCameFromBtn) ? oldValue + n : n;
        var maxAmount = Number(target.dataset.amount);
        if (newValue <= 0) {
            deleteFromCart(cartItemWrap, cartItemInput, price);
        }
        else {
            cartItemInput.value = String(newValue);
            if (Number(cartItemInput.value) > maxAmount) {
                cartItemInput.value = String(maxAmount);
                cartSum.textContent = String(price * maxAmount);
                cartItemWrap.setAttribute("data-good-amount", "".concat(maxAmount));
                return;
            }
            cartSum.textContent = (ischangeCameFromBtn) ? String(Number(cartSum.textContent) + (price * n)) : String(price * newValue);
            cartItemWrap.setAttribute("data-good-amount", "".concat(newValue));
        }
    }
    cartItemInputWrap.append(cartItemInputDecrease, cartItemInput, cartItemInputIncrease);
    cartItemWrap.append(cartItemTitle, cartItemPrice, cartItemInputWrap);
    return cartItemWrap;
}
// Удалить товар из корзины
function deleteFromCart(nodeTodelete, input, price) {
    if (!cartSum)
        return;
    removeDialog.showModal();
    removeDialog.addEventListener("close", function () {
        if (removeDialog.returnValue === "remove") {
            cartSum.textContent = String(Number(cartSum.textContent) - price);
            nodeTodelete.remove();
        }
        else {
            input.value = String(1);
        }
    }, { once: true });
}
// Существует ли товар в корзине
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
buyBtn === null || buyBtn === void 0 ? void 0 : buyBtn.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    var json, reply, status, repluJSON;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                json = JSON.stringify(collectGoodsFromCart());
                return [4 /*yield*/, updateStorage(json)];
            case 1:
                reply = _a.sent(), status = reply.status;
                return [4 /*yield*/, reply.json()];
            case 2:
                repluJSON = _a.sent();
                createNotify(status);
                if (status === 200) {
                    fetchGoods();
                }
                return [2 /*return*/];
        }
    });
}); });
function collectGoodsFromCart() {
    if (!(cartNode === null || cartNode === void 0 ? void 0 : cartNode.children))
        return;
    var goods = Array.from(cartNode === null || cartNode === void 0 ? void 0 : cartNode.children), goodsArr = [];
    goods.map(function (good) {
        var obj = {
            id: Number(good.dataset.id),
            name: good.dataset.name || "",
            amount: Number(good.dataset.goodAmount)
        };
        goodsArr.push(obj);
    });
    return goodsArr;
}
function updateStorage(json) {
    return __awaiter(this, void 0, void 0, function () {
        var reply;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(serverURL, "/update-storage"), {
                        method: "PUT",
                        headers: {
                            "Content-Type": 'application/json'
                        },
                        body: json
                    })];
                case 1:
                    reply = _a.sent();
                    return [2 /*return*/, reply];
            }
        });
    });
}
// Дальше будем создавать верстку уведомленияя
var notificationWrapClasses = ["w-full", "rounded", "flex", "jistify-start", "flex-col", "gap-2", "bg-slate-200", "shadow-md", "py-[10px]", "min-h-[49px]", "relative", "overflow-hidden"], notificationHeaderWrapClasses = ["border-b", "border-b-slate-500", "px-[15px]", "pb-[5px]"], notificationParagraphClasses = ["text-sm", "px-[15px]", 'text-slate-500'], successHeaderClasses = ["text-emerald-400", "text-md"], failureHeaderClasses = ["text-red-300", "text-md"];
var cross = "<svg xmlns=\"http://www.w3.org/2000/svg\"\n                viewBox=\"0 0 384 512\"\n                class=\"absolute right-[15px] top-[13.5px] cursor-pointer\"\n                width=\"15px\"\n                onclick=\"this.parentNode.remove()\"\n                >\n                <path\n                    d=\"M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z\" />\n            </svg>";
function createNotify(status) {
    var _a, _b, _c, _d;
    if (!notifications)
        return;
    var wrap = document.createElement("div"), headerWrap = document.createElement("div"), header = document.createElement("h4"), paragraph = document.createElement("p");
    var headerClasses = (status === 200) ? successHeaderClasses : failureHeaderClasses, headerText = (status === 200) ? "Успех!" : "Не вышло D:";
    (_a = wrap.classList).add.apply(_a, notificationWrapClasses);
    (_b = headerWrap.classList).add.apply(_b, notificationHeaderWrapClasses);
    (_c = header.classList).add.apply(_c, headerClasses);
    (_d = paragraph.classList).add.apply(_d, notificationParagraphClasses);
    header.textContent = headerText;
    paragraph.textContent = (status === 200) ? "Поздравляю, вы купили товар!" : 'Что-то пошло не так(';
    headerWrap.append(header);
    wrap.append(headerWrap, paragraph);
    wrap.innerHTML += cross;
    notifications.append(wrap);
}
