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

    const goodWrap = document.createElement("div"),
        goodTitle = document.createElement("h2"),
        goodPrice = document.createElement("p"),
        goodAmount = document.createElement("p"),
        goodBtn = document.createElement("button");

    goodWrap.className += "border bg-slate-200 rounded-xl w-full h-24 flex gap-12 justify-between items-center py-2 px-4";
    goodTitle.className = "w-[200px] text-ellipsis";
    goodPrice.className = "w-[200px] text-ellipsis";
    goodAmount.className = "w-[200px] text-ellipsis";
    goodBtn.className = "relative py-1 px-2 border-none  shadow-lg rounded-lg bg-slate-100 group flex justify-center items-center hover:bg-slate-900";

    goodWrap.setAttribute("data-good", "true");
    goodWrap.setAttribute("data-name", `${good.name}`);
    goodWrap.setAttribute("data-name", `${good.price}`);
    goodWrap.setAttribute("data-name", `${good.amount}`);
    goodBtn.setAttribute("title", "Добавить в корзину");

    goodTitle.textContent = good.name;
    goodPrice.textContent = `${good.price}`;
    goodAmount.textContent = `${good.amount}`;
    goodBtn.innerHTML = `
                <svg class="w-6 group-hover:fill-slate-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                 <path
                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>
    `

    goodBtn.addEventListener("click", add2Cart);

    goodWrap.append(goodTitle, goodPrice, goodAmount, goodBtn);

    storageNode.append(goodWrap);

    // storageNode.innerHTML += `

    // <div class="border bg-slate-200 rounded-xl w-full h-24 flex gap-12 justify-between items-center py-2 px-4"
    //     data-good='true'
    //     data-name='${good.name}'
    //     data-price='${good.price}'
    //     good.amount='${good.amount}'
    // >
    //     <h2 class="w-[200px] text-ellipsis">${good.name}</h2>
    //     <p class="w-[200px] text-ellipsis">${good.price} &#8381;</p>
    //     <p class="w-[200px] text-ellipsis">Кол-во: <span>${good.amount}</span></p>

    //     <button
    //         class="relative py-1 px-2 border-none  shadow-lg rounded-lg bg-slate-100 group flex justify-center items-center hover:bg-slate-900"
    //         title="Добавить в корзину">
    //         <svg class="w-6 group-hover:fill-slate-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    //             <path
    //                 d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
    //         </svg>

    //     </button>
    // </div>

    // `
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

function add2Cart(e: MouseEvent) {
    console.log("add to cart!");
}



`
<div class=" bg-slate-800 rounded-xl w-full h-24 flex gap-12 justify-between items-center py-2 px-4">
            <h2 class="w-[200px] text-ellipsis">Футболка</h2>
            <p class="w-[200px] text-xl">2999 &#8381;</p>

            <div class="flex justify-center items-center">
                <button class="flex justify-center items-center rounded-full border border-white p-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M21.1667 10.34H2.83333C2.37292 10.34 2 10.7129 2 11.1733V12.84C2 13.3004 2.37292 13.6733 2.83333 13.6733H21.1667C21.6271 13.6733 22 13.3004 22 12.84V11.1733C22 10.7129 21.6271 10.34 21.1667 10.34Z"
                            fill="white" />
                    </svg>
                </button>

                <input
                    class="w-12 text-center bg-transparent text-slate-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    type="number" value="1">

                <button class="flex justify-center items-center rounded-full border border-white p-1">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M21.1667 10.3333H13.6667V2.83333C13.6667 2.37292 13.2937 2 12.8333 2H11.1667C10.7063 2 10.3333 2.37292 10.3333 2.83333V10.3333H2.83333C2.37292 10.3333 2 10.7063 2 11.1667V12.8333C2 13.2937 2.37292 13.6667 2.83333 13.6667H10.3333V21.1667C10.3333 21.6271 10.7063 22 11.1667 22H12.8333C13.2937 22 13.6667 21.6271 13.6667 21.1667V13.6667H21.1667C21.6271 13.6667 22 13.2937 22 12.8333V11.1667C22 10.7063 21.6271 10.3333 21.1667 10.3333Z"
                            fill="white" />
                    </svg>
                </button>
            </div>

        </div>
`