import dbSettings from "./DATABASE.conf.js";
import fastify from "fastify";
import mysql from 'mysql2/promise';


const PORT = 2861; //На этом порту будет работать сервер!

// Создаю сервер через библеотеку
const server = fastify();

// Настраиваю бд
const pool = mysql.createPool({
    connectionLimit: 100,
    host: dbSettings.HOST,
    user: dbSettings.USER,
    password: dbSettings.PASSWORD,
    database: dbSettings.DATABASE
});

// Роуты
server.get('/', async (req, reply) => {
    const queryRes = await getUsers();

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
                 .send({message: `Товар ${req.query.name} успешно добавлен`})
        } catch (error) {
            
            reply
                 .code(500)
                 .header('Content-type', 'application/json; charset=utf-8')
                 .send({message: error})


        }
        
    }
})



try {
    server.listen({port: PORT});
    console.log(`Сервер работает по адресу http://localhost:${PORT}`);
} catch (err) {
    console.log('Сервер не запустился, вот ошибка: ', err);
}




// Функции
async function getUsers() {
    return await pool.query('SELECT * FROM users');
}

async function createGood(good) {
    const q = await pool.query(`INSERT INTO storage (id, name, price, amount)
                                VALUES (NULL, '${good.name}', '${good.price}', '${good.amount}');`)
}

