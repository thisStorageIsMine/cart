const HOST = "localhost",
    PORT = "2861";


const storageNode = document.getElementById("storage"),
    cartNode = document.getElementById("cart");

cartNode!.style.display = "none";

window.addEventListener("DOMContentLoaded", () => fetchGoods());


function fetchGoods() {
    const fetchStorage = fetch(`http://${HOST}:${PORT}/storage`)
        .then(data => data.json())
        .then(data => {
            cartNode!.style.display = "";
            createGoods(data);
        })
        .catch(err => createGoodsError());

}

interface Good {
    name: string;
    price: number;
    amount: number;
}

function createGoods(storage: Good[]) {
    if (!storageNode) return;

    storageNode.innerHTML += `
        <h1 class="text-4xl text-stone-50">
        Все товары
    </h1>
    
    `

    for (const good of storage) {
        createGood(good);
    }
}

function createGood(good: Good) {
    if (!storageNode) return;

    storageNode.innerHTML += `

    <div class="border bg-slate-200 rounded-xl w-full h-24 flex gap-12 justify-between items-center py-2 px-4"
        data-good='true'
        data-name='${good.name}'
        data-price='${good.price}'
        good.amount='${good.amount}'
    >
        <h2 class="w-[200px] text-ellipsis">${good.name}</h2>
        <p class="w-[200px] text-ellipsis">${good.price} &#8381;</p>
        <p class="w-[200px] text-ellipsis">Кол-во: <span>${good.amount}</span></p>
        
        <button
            class="relative py-1 px-2 border-none  shadow-lg rounded-lg bg-slate-100 group flex justify-center items-center hover:bg-slate-900"
            title="Добавить в корзину">
            <svg class="w-6 group-hover:fill-slate-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                    d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
        
        </button>
    </div>
    
    `
}

function createGoodsError() {
    document.body.innerHTML = `

    <h1 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-400 text-6xl">
    Что-то пошло не так...<br>
    <p class="text-4xl mt-6 text-red-400/[70%]">
        Проверьте включен ли сервер

    </p>
</h1>
    `;
}

function createLoader() {
    if (!storageNode) return;
    for (let i = 0; i < 5; i++) {
        storageNode.innerHTML += `
        <span class="relative   rounded-xl w-full h-24 flex gap-12 justify-between items-center py-2 px-4 -z-10 overflow-hidden
        before:absolute before:inset-[2px] before:rounded-xl  before:bg-slate-900 before:-z-[1]
        animate-pulse">
            <span class="w-[200px] h-8 rounded-md bg-slate-800"></span>
            <span class="w-[350px] ml-40 h-8 rounded-md bg-slate-800">;</span>
            <span class="w-[200px] h-8 rounded-md bg-slate-800"></span>
            
            <span
                class="w-8 h-8  relative py-1 px-2 border-none  shadow-lg rounded-lg bg-slate-800"
                >
                
            </span>
        </span>
        
        `
    }
}

function removeLoader() {
    if (!storageNode) return;

    storageNode.innerHTML = ""
}

