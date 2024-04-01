var HOST = "localhost", PORT = "2861";
var storageNode = document.getElementById("storage"), cartNode = document.getElementById("cart");
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
    storageNode.innerHTML += "\n\n    <div class=\"border bg-slate-200 rounded-xl w-full h-24 flex gap-12 justify-between items-center py-2 px-4\"\n        data-good='true'\n        data-name='".concat(good.name, "'\n        data-price='").concat(good.price, "'\n        good.amount='").concat(good.amount, "'\n    >\n        <h2 class=\"w-[200px] text-ellipsis\">").concat(good.name, "</h2>\n        <p class=\"w-[200px] text-ellipsis\">").concat(good.price, " &#8381;</p>\n        <p class=\"w-[200px] text-ellipsis\">\u041A\u043E\u043B-\u0432\u043E: <span>").concat(good.amount, "</span></p>\n        \n        <button\n            class=\"relative py-1 px-2 border-none  shadow-lg rounded-lg bg-slate-100 group flex justify-center items-center hover:bg-slate-900\"\n            title=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443\">\n            <svg class=\"w-6 group-hover:fill-slate-200\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\">\n                <path\n                    d=\"M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z\" />\n            </svg>\n        \n        </button>\n    </div>\n    \n    ");
}
function createGoodsError() {
    document.body.innerHTML = "\n\n    <h1 class=\"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-400 text-6xl\">\n    \u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A...<br>\n    <p class=\"text-4xl mt-6 text-red-400/[70%]\">\n        \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0432\u043A\u043B\u044E\u0447\u0435\u043D \u043B\u0438 \u0441\u0435\u0440\u0432\u0435\u0440\n\n    </p>\n</h1>\n    ";
}
function createLoader() {
    if (!storageNode)
        return;
    for (var i = 0; i < 5; i++) {
        storageNode.innerHTML += "\n        <span class=\"relative   rounded-xl w-full h-24 flex gap-12 justify-between items-center py-2 px-4 -z-10 overflow-hidden\n        before:absolute before:inset-[2px] before:rounded-xl  before:bg-slate-900 before:-z-[1]\n        animate-pulse\">\n            <span class=\"w-[200px] h-8 rounded-md bg-slate-800\"></span>\n            <span class=\"w-[350px] ml-40 h-8 rounded-md bg-slate-800\">;</span>\n            <span class=\"w-[200px] h-8 rounded-md bg-slate-800\"></span>\n            \n            <span\n                class=\"w-8 h-8  relative py-1 px-2 border-none  shadow-lg rounded-lg bg-slate-800\"\n                >\n                \n            </span>\n        </span>\n        \n        ";
    }
}
function removeLoader() {
    if (!storageNode)
        return;
    storageNode.innerHTML = "";
}
