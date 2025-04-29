const mysql = require("mysql");
const Koa = require("koa2");
const Router = require("@koa/router");
const { v4: uuidv4 } = require("uuid");
const http = require('http');
const { Server } = require('socket.io');
const lodash = require('lodash');

const { koaBody: koaBodyUse } = require('koa-body');
const cors = require('@koa/cors');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const koaStaticUse = require('koa-static');


const koaApp = new Koa();
const koaRouter = new Router()

const koaSetUse = ({ koaBody, koaStatic }) => {
    koaApp
        .use(koaBodyUse(
            {
            multipart: true,
            ...((koaBody && koaBody.uploadPath) ? {
                formidable: {
                    uploadDir: uploadPath,
                    keepExtensions: true,
                }
            } : {})
            }
        ))
    if (koaStatic) {
        koaApp
           .use(koaStaticUse(koaStatic.staticPath))
    }
    koaApp
        .use(cors())
        .use(router.routes())
        .use(router.allowedMethods());
}

const koaGetListen = (port = 3003) => {
    return KoaApp.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
      
}


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
        cors,
        setError: koaSetError,
        setOk: koaSetOk,
        getEncodeSqlParams: koaGetEncodeSqlParams,
        getQuery: koaGetQuery,
        getBody: koaGetBody,
        getHeaders: koaGetHeaders,
        getUuid: koaUuid,
        setUse: koaSetUse,
        getListen: koaGetListen,
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