import mysql from 'mysql';

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

const Utils = {
    mysql: {
        connect: mysqlConnect,
        queryInit: mysqlQueryInit
    }
}

export default Utils;