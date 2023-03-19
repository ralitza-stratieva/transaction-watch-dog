import pg from 'pg';
import dotenv from 'dotenv';

const Client = pg.Client;
const config = dotenv.config().parsed;

const connection = {
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    port: config.DBPORT
};

const createDatabase = async () => {
    const client = new Client(connection);

    const sql = `
    CREATE DATABASE transaction_watch_dog;
    `;

    try {
        await client.connect();
        await client.query(sql);

        console.log('Database "transaction_watch_dog" created.');
        await client.end();
    } catch (error) {
        console.log(error);
    }
}

const createConfigurationsTable = async () => {
    const client = new Client(connection);
    
    // add better type to the array if possible
    const sql = `
        CREATE TABLE configurations (
            id SERIAL PRIMARY KEY,
            name VARCHAR (255) NOT NULL,
            filters jsonb []
        );
    `;

    try {
        await client.connect();
        await client.query(sql);
    
        console.log('Table "configurations" created.');
        await client.end();
    } catch (error) {
        console.log(error);
    }
}

const createTransactionsTable = async () => {
    const client = new Client(connection);
    
    // double check types
    const sql = `
        CREATE TABLE transactions (
            id SERIAL PRIMARY KEY,
            configuration_id INTEGER NOT NULL,
            access_list VARCHAR[][], 
            block_hash bytea,
            block_number INTEGER, 
            chain_id bytea, 
            "from" bytea, 
            gas INTEGER, 
            gas_price INTEGER, 
            "input" bytea, 
            max_fee_per_gas INTEGER,
            max_priority_fee_per_gas INTEGER,
            nonce INTEGER,
            r bytea, 
            s bytea,
            "to" bytea,
            transaction_index INTEGER,
            "type" INTEGER,
            v bytea,
            "value" INTEGER,
            FOREIGN KEY (configuration_id) REFERENCES configurations(id) ON DELETE CASCADE
        );
    `;

    try {
        await client.connect();
        await client.query(sql);
    
        console.log('Table "transactions" created.');
        await client.end();
    } catch (error) {
        console.log(error);
    }
}

const createTables = async () => {
    await createConfigurationsTable();
    await createTransactionsTable();
}

const setupDatabase = async () => {
    await createDatabase();
    await createTables();
}

await setupDatabase();