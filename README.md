# logic center

## Intoduction

```javascript
import { BackEnd } from 'logic-center'

// mysql

const { connect, queryInit } = BackEnd.mysql

const connection = connect({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'database_name'
})
const MysqlQuery = queryInit(connection)

const fun = async () => {
    await MysqlQuery("SELECT * FROM table_name")
}

// koa2


const { app, router, resError, resOk, encodeSqlParams, getQuery, getBody, getHeaders } = BackEnd.koa

router.get('/error', (ctx, next) => {
    ctx.body = resError('error message')
}

router.get('/ok', (ctx, next) => {
    ctx.body = resOk([])
}

router.get('/ok', (ctx, next) => {
    ctx.body = resOk({})
}

router.post('/encodeSqlParams', (ctx, next) => {
    const { name } = ctx.request.body
    await MysqlQuery(`SELECT * FROM table_name where name = ""${encodeSqlParams(name)}"`)
}

```