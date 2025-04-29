const mysql = require("mysql");
const Koa = require("koa2");
const Router = require("@koa/router");
const { v4: uuidv4 } = require("uuid");
const http = require('http');
const { Server } = require('socket.io');
const lodash = require('lodash');


const koaApp = new Koa();
const koaRouter = new Router()

const mysqlGetConnect = ({ host, user, password, database }) => {
    const connection = mysql.createConnection({
        host: host || "localhost",
        user: user || "root",
        password: password,
        database: database
    });
    connection.connect();
    return connection;
}

const mysqlGetQueryInit = (connection) => (sqlString) => new Promise((resolve, reject) => {
    connection.query(sqlString, (error, result, fields) => {
    if (error) {
        resolve({ status: -1, data: [], msg: error });
        throw error;
    }
        console.log('sqlString', sqlString)
        resolve({ status: 0, data: result });
    });
})

const koaGetEncodeSqlParams = (data) => encodeURIComponent(data)

const koaSetError = (message = '') => {
    return JSON.stringify({ status: -1, data: [], msg: message }, null, 2)
}

const koaSetOk = (data = []) => {
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

const koaUuid = () =>  uuidv4()

const Utils = {
    mysql: {
        getConnect: mysqlGetConnect,
        getQueryInit: mysqlGetQueryInit,
    },
    koa: {
        app: koaApp,
        router: koaRouter,
        setError: koaSetError,
        setOk: koaSetOk,
        getEncodeSqlParams: koaGetEncodeSqlParams,
        getQuery: koaGetQuery,
        getBody: koaGetBody,
        getHeaders: koaGetHeaders,
        getUuid: koaUuid
    },
    http: {
       http,
    },
    socket: {
       Server, 
    },
    lodash: {
        lodash,
    }
}

module.exports = Utils;