# logic center

## 简介

```javascript
import { BackEnd } from 'logic-center'
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

```