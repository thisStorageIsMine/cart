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
    database: process.env.DATABASE,
    multipleStatements: true
});


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
    method: "GET",
    url: "/good",
    schema: {
        querystring: {
            type: 'object',
            properties: {
                name: { type: "string" }
            },
            required: ['name']
        }
    },
    handler: async (req, reply) => {
        try {
            const query = await getGood(req.query.name);

            console.log(query);
            return query;

        } catch (error) {
            reply.code(500)
                .header('Content-type', 'application/json; charset=utf-8')
                .send({ message: error })
        }
    }

})

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

server.put('/update-storage', async (req, reply) => {
    try {

        await updateGoodsInStorage(req.body);

        reply
            .code(200)
            .header("Content-Type", 'application/json; charset=utf-8')
            .send({ message: 'succes!!!!!' });

    } catch (error) {
        reply
            .code(500)
            .header("Content-Type", 'application/json; charset=utf-8')
            .send({ message: "Не удалось обновить данные в бд" });
    }
});



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
    return await pool.query('SELECT id,name, price, amount FROM storage');
}

async function getGood(name) {
    const query = 'SELECT id, name, amount, price FROM storage WHERE name = ?;'

    const res = await pool.query(query, name);

    return res[0][0];
}

/* 

goods [
    {
        id: 1,
        name: Футболка
        amount: 15
    },
    {
        id: 2,
        name: panzerkampfwagen,
        amount: 1
    }
]
*/

async function updateGoodsInStorage(goods) {


    // const placeholders = goods.reduce((q, good) => {
    //     const queryString = `UPDATE storage SET amount = amount - ? WHERE id = ?;
    //                           INSERT INTO cart(user_id, storage_id, amount) VALUES (1, ?, ?);`;


    //     q.queries += queryString;
    //     q.params.push(good.amount, good.id);

    //     return q
    // }, { queries: "START TRANSACTION;", params: [] });

    // placeholders.queries += "COMMIT;";

    const con = await pool.getConnection();

    try {

        (await con).beginTransaction();
        for (const good of goods) {
            await con.query(`UPDATE storage SET amount = amount - ? WHERE id = ?;`, [good.amount, good.id]);
            await con.query(`INSERT INTO cart(user_id, storage_id, amount) VALUES (1, ?, ?);`, [good.id, good.amount]);
        }

        await con.commit();
        return true
    } catch (error) {
        console.log(error);
        await con.rollback();
        return false;
    } finally {
        con.release()
    }
}
