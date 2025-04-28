# logic center

## Intoduction

```javascript
import { BackEnd } from 'logic-center'

// mysql

const connection = BackEnd.mysql.connect({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'database_name'
})
const MysqlQuery = BackEnd.mysql.queryInit(connection)

const fun = async () => {
    await MysqlQuery("SELECT * FROM table_name")
}

// koa2

router.get('/error', (ctx, next) => {
    ctx.body = BackEnd.koa.resError('error message')
}

router.get('/ok', (ctx, next) => {
    ctx.body = BackEnd.koa.resOk([])
}

router.get('/ok', (ctx, next) => {
    ctx.body = BackEnd.koa.resOk({})
}


resError: koaResError,
        resOk: koaResOk,


```