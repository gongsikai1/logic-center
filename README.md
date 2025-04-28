# logic center

## Intoduction

```javascript
import { BackEnd } from 'logic-center'

// mysql

const {
    getConnect,
    getQueryInit
} = BackEnd.mysql

const connection = getConnect({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'database_name'
})
const getMysqlQuery = getQueryInit(connection)

const fun = async () => {
    await getMysqlQuery("SELECT * FROM table_name")
}

// koa2


const {
    app,
    router,
    setError,
    setOk,
    setEncodeSqlParams,
    getQuery,
    getBody,
    getHeaders,
    getUuid
} = BackEnd.koa

router.get('/error', (ctx, next) => {
    ctx.body = setError('error message')
}

router.get('/ok', (ctx, next) => {
    ctx.body = setOk([])
}

router.get('/ok', (ctx, next) => {
    ctx.body = setOk({})
}

router.post('/encodeSqlParams', (ctx, next) => {
    const uuid = getUuid()
    const { name } = ctx.request.body
    await MysqlQuery(`SELECT * FROM table_name where name = ""${setEncodeSqlParams(name)}"`)
}

```