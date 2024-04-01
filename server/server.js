import fastify from "fastify";
import cors from '@fastify/cors';
import mysql from 'mysql2/promise';


// Создаю сервер через библеотеку
const server = fastify();
await server.register(cors, {
    origin: true
})


// Настраиваю бд
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.HOST,
    port: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

console.log(process.env.HOST);

// Роуты
server.get('/', async (req, reply) => {
    const queryRes = await getUsers();

    return queryRes[0];
});

//Список товаров на складе
server.get("/storage", async (res, reply) => {
    const queryRes = await getGoods();
    return queryRes[0];
});

server.route({
    method: 'GET',
    url: '/add-good',
    schema: {
        querystring: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                price: { type: 'number' },
                amount: { type: 'number' }
            },
            required: ['name', 'price', 'amount'],
        },

    },
    handler: async (req, reply) => {
        try {
            const q = await createGood({
                name: req.query.name,
                price: req.query.price,
                amount: req.query.amount
            });

            reply
                .code(200)
                .header('Content-type', 'application/json; charset=utf-8')
                .send({ message: `Товар ${req.query.name} успешно добавлен` })
        } catch (error) {

            reply
                .code(500)
                .header('Content-type', 'application/json; charset=utf-8')
                .send({ message: error })


        }

    }
})



try {
    server.listen({ port: process.env.PORT });
    console.log(`Сервер работает по адресу http://localhost:${process.env.PORT}`);
} catch (err) {
    console.log('Сервер не запустился, вот ошибка: ', err);
}




// Функции для работы с БД
async function getUsers() {
    return await pool.query('SELECT * FROM users');
}

async function getGoods() {
    return await pool.query('SELECT name, price, amount FROM storage');
}

