const HOST = "localhost",
    PORT = "2861";

const serverURL = `http://${HOST}:${PORT}`;

const storageNode = document.getElementById("storage"),
    cartNode = document.getElementById("cart-goods"),
    cartSum = document.getElementById("cart-sum"),
    removeDialog: HTMLDialogElement = document.getElementById("removeDialog") as HTMLDialogElement,
    notifications = document.getElementById("notifications"),
    buyBtn = document.getElementById("buy");

const userID = Math.random() * Date.now();

localStorage.setItem('id', String(userID));



window.addEventListener("DOMContentLoaded", () => fetchGoods());

// Собираем товары с сервера
function fetchGoods() {
    if (!storageNode) return

    storageNode.innerHTML = '';



    const fetchStorage = fetch(`${serverURL}/storage`)
        .then(data => data.json())
        .then(data => {
            cartNode!.style.display = "";
            createGoods(data);
        })
        .catch(err => createGoodsError());

}

interface Good {
    id: number;
    name: string;
    price?: number;
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

// Создаём карточку для всех товаров
function createGood(good: Good) {
    if (!storageNode) return;

    const goodWrap = document.createElement("div"),
        goodTitle = document.createElement("h2"),
        goodPrice = document.createElement("p"),
        goodAmount = document.createElement("p"),
        goodBtn = document.createElement("button");

    goodWrap.className = "border bg-slate-200 rounded-xl w-full h-24 flex gap-12 justify-between items-center py-2 px-4";
    goodTitle.className = goodPrice.className = goodAmount.className = "w-[200px] truncate";
    goodBtn.className = "relative py-1 px-2 border-none  shadow-lg rounded-lg bg-slate-100 group flex justify-center items-center hover:bg-slate-900";

    goodBtn.setAttribute("data-name", `${good.name}`);
    goodBtn.setAttribute("data-price", `${good.price}`);
    goodBtn.setAttribute("data-amount", `${good.amount}`);
    goodBtn.setAttribute("data-id", `${good.id}`);
    goodBtn.setAttribute("title", "Добавить в корзину");
    goodTitle.setAttribute("title", `${good.name}`);


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

}

// Если нам не пришёл ответ с сервера
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


// Добавляем в корзину
function add2Cart(e: MouseEvent) {
    if (!e.currentTarget || !cartSum) return;
    const target = e.currentTarget as HTMLButtonElement;

    if (isGoodExist(target.dataset.name || "")) return;

    const cartItem = createGoodCart(target);


    cartNode?.append(cartItem);
    cartSum!.textContent = String(Number(cartSum.textContent) + Number(target.dataset.price));
}

//Cоздаём карточку дял корзины
function createGoodCart(target: HTMLButtonElement) {
    const cartItemWrap = document.createElement("div"),
        cartItemTitle = document.createElement("h2"),
        cartItemPrice = document.createElement("p"),
        cartItemInputWrap = document.createElement("button"),
        cartItemInputDecrease = document.createElement("button"),
        cartItemInputIncrease = document.createElement("button"),
        cartItemInput = document.createElement("input");

    cartItemWrap.setAttribute("data-name", `${target.dataset.name}`);
    cartItemWrap.setAttribute("data-amount", `${target.dataset.amount}`);
    cartItemWrap.setAttribute("data-id", `${target.dataset.id}`);
    cartItemWrap.setAttribute("data-good-amount", "1");

    cartItemTitle.setAttribute("title", `${target.dataset.name}`);

    cartItemWrap.className = "bg-slate-800 rounded-xl w-full h-24 flex gap-12 justify-between items-center py-2 px-4 shrink-0";
    cartItemTitle.className = "w-[200px] truncate";
    cartItemPrice.className = "w-[200px] ttruncate text-xl";
    cartItemInputWrap.className = "flex justify-center items-center";
    cartItemInputDecrease.className = cartItemInputIncrease.className = "flex justify-center items-center rounded-full border border-white p-1";
    cartItemInput.className = "w-12 text-center bg-transparent text-slate-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"

    cartItemTitle.textContent = target.dataset.name as string;
    cartItemPrice.innerHTML = `${target.dataset.price}`;
    cartItemInput.value = "1";
    cartItemInputDecrease.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21.1667 10.34H2.83333C2.37292 10.34 2 10.7129 2 11.1733V12.84C2 13.3004 2.37292 13.6733 2.83333 13.6733H21.1667C21.6271 13.6733 22 13.3004 22 12.84V11.1733C22 10.7129 21.6271 10.34 21.1667 10.34Z"
                fill="white" />
            </svg>
    `;
    cartItemInputIncrease.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M21.1667 10.3333H13.6667V2.83333C13.6667 2.37292 13.2937 2 12.8333 2H11.1667C10.7063 2 10.3333 2.37292 10.3333 2.83333V10.3333H2.83333C2.37292 10.3333 2 10.7063 2 11.1667V12.8333C2 13.2937 2.37292 13.6667 2.83333 13.6667H10.3333V21.1667C10.3333 21.6271 10.7063 22 11.1667 22H12.8333C13.2937 22 13.6667 21.6271 13.6667 21.1667V13.6667H21.1667C21.6271 13.6667 22 13.2937 22 12.8333V11.1667C22 10.7063 21.6271 10.3333 21.1667 10.3333Z"
                fill="white" />
            </svg>
    `

    // cartItemInput.setAttribute("data-amount", "true");

    cartItemInputDecrease.addEventListener("click", (e: MouseEvent) => changeAmount(-1, Number(target.dataset.price)));
    cartItemInputIncrease.addEventListener("click", (e: MouseEvent) => changeAmount(1, Number(target.dataset.price)));
    cartItemInput.addEventListener("change", (e: Event) => {
        const eventTarget = e.currentTarget as HTMLInputElement;
        changeAmount(Number(eventTarget.value), Number(target.dataset.price), false)
    })

    function changeAmount(n: number, price: number, ischangeCameFromBtn: boolean = true) {
        if (!cartSum) return;

        const oldValue = Number(cartItemInput.value);
        const newValue = (ischangeCameFromBtn) ? oldValue + n : n;
        const maxAmount = Number(target.dataset.amount);


        if (newValue <= 0) {
            deleteFromCart(cartItemWrap, cartItemInput, price);
        } else {
            cartItemInput.value = String(newValue);


            if (Number(cartItemInput.value) > maxAmount) {
                cartItemInput.value = String(maxAmount);

                cartSum.textContent = String(price * maxAmount);
                cartItemWrap.setAttribute("data-good-amount", `${maxAmount}`);
                return;
            }

            cartSum.textContent = (ischangeCameFromBtn) ? String(Number(cartSum!.textContent) + (price * n)) : String(price * newValue);
            cartItemWrap.setAttribute("data-good-amount", `${newValue}`);
        }


    }

    cartItemInputWrap.append(cartItemInputDecrease, cartItemInput, cartItemInputIncrease);
    cartItemWrap.append(cartItemTitle, cartItemPrice, cartItemInputWrap);

    return cartItemWrap;
}


// Удалить товар из корзины
function deleteFromCart(nodeTodelete: HTMLElement, input: HTMLInputElement, price: number) {
    if (!cartSum) return;

    removeDialog.showModal();
    removeDialog.addEventListener("close", () => {

        if (removeDialog.returnValue === "remove") {
            cartSum.textContent = String(Number(cartSum!.textContent) - price);
            nodeTodelete.remove()
        } else {
            input.value = String(1);
        }
    }, { once: true });
}


// Существует ли товар в корзине
function isGoodExist(name: string) {
    if (!cartNode?.childNodes) return;

    for (let good of cartNode?.children) {
        if (good instanceof HTMLElement) {
            if (good.dataset.name === name) return true;

        }
    }

    return false
}

// Покупаем!!!!111!

interface UpdateGoods {
    id: number;
    name: string;
    amount: number;
}

buyBtn?.addEventListener("click", async () => {

    const json: string = JSON.stringify(collectGoodsFromCart());

    const reply = await updateStorage(json),
        status = reply.status,
        repluJSON = await reply.json();

    createNotify(status);

    if (status === 200) {
        fetchGoods();
    }
});

function collectGoodsFromCart() {
    if (!cartNode?.children) return;

    const goods: HTMLElement[] = Array.from(cartNode?.children) as HTMLElement[],
        goodsArr: Good[] = [];

    goods.map((good: HTMLElement) => {
        const obj: Good = {
            id: Number(good.dataset.id),
            name: good.dataset.name || "",
            amount: Number(good.dataset.goodAmount)
        }

        goodsArr.push(obj);
    })

    return goodsArr
}


async function updateStorage(json: string) {
    const reply = await fetch(`${serverURL}/update-storage`, {
        method: "PUT",
        headers: {
            "Content-Type": 'application/json'
        },
        body: json
    })

    return reply;
}




// Дальше будем создавать верстку уведомленияя
const notificationWrapClasses = ["w-full", "rounded", "flex", "jistify-start", "flex-col", "gap-2", "bg-slate-200", "shadow-md", "py-[10px]", "min-h-[49px]", "relative", "overflow-hidden"],
    notificationHeaderWrapClasses = ["border-b", "border-b-slate-500", "px-[15px]", "pb-[5px]"],
    notificationParagraphClasses = ["text-sm", "px-[15px]", 'text-slate-500'],
    successHeaderClasses = ["text-emerald-400", "text-md"],
    failureHeaderClasses = ["text-red-300", "text-md"];

const cross = `<svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                class="absolute right-[15px] top-[13.5px] cursor-pointer"
                width="15px"
                onclick="this.parentNode.remove()"
                >
                <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>`;

function createNotify(status: number) {
    if (!notifications) return;

    const wrap = document.createElement("div"),
        headerWrap = document.createElement("div"),
        header = document.createElement("h4"),
        paragraph = document.createElement("p");

    const headerClasses = (status === 200) ? successHeaderClasses : failureHeaderClasses,
        headerText = (status === 200) ? "Успех!" : "Не вышло D:";

    wrap.classList.add(...notificationWrapClasses);
    headerWrap.classList.add(...notificationHeaderWrapClasses);
    header.classList.add(...headerClasses);
    paragraph.classList.add(...notificationParagraphClasses);

    header.textContent = headerText;
    paragraph!.textContent = (status === 200) ? "Поздравляю, вы купили товар!" : 'Что-то пошло не так(';

    headerWrap.append(header);
    wrap.append(headerWrap, paragraph);
    wrap.innerHTML += cross;

    notifications.append(wrap);
}
