import mysql from 'mysql';
import * as Koa from "koa2";
import * as Router from "@koa/router"

const koaApp = new Koa();
const koaRouter = new Router()

const mysqlConnect = ({ host, user, password, database }) => {
    const connection = mysql.createConnection({
        host: host || "localhost",
        user: user || "root",
        password: password,
        database: database
    });
    connection.connect();
    return connection;
}

const mysqlQueryInit = (connection) => (sqlString) => new Promise((resolve, reject) => {
    connection.query(sqlString, (error, result, fields) => {
    if (error) {
        resolve({ status: -1, data: [], msg: error });
        throw error;
    }
        console.log('sqlString', sqlString)
        resolve({ status: 0, data: result });
    });
})

const koaEncodeSqlParams = (data) => encodeURIComponent(data)

const koaResError = (message = '') => {
    return JSON.stringify({ status: -1, data: [], msg: message }, null, 2)
}

const koaResOk = (data = []) => {
    return JSON.stringify({ status: 0, data, msg: '' }, null, 2)
}

const koaGetQuery = (ctx) => {
    return ctx.request.query; 
}

const koaGetBody = (ctx) => {
    return ctx.request.body; 
}

const koaGetHeaders = (ctx) => {
    return ctx.request.headers;
}

const Utils = {
    mysql: {
        connect: mysqlConnect,
        queryInit: mysqlQueryInit,
    },
    koa: {
        app: koaApp,
        router: koaRouter,
        resError: koaResError,
        resOk: koaResOk,
        encodeSqlParams: koaEncodeSqlParams,
        getQuery: koaGetQuery,
        getBody: koaGetBody,
        getHeaders: koaGetHeaders,
    }
}

export default Utils;