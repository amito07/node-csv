export const dbConfig = {
    HOST:'localhost',
    USER:'root',
    DB:'websocket',
    PASSWORD:'',
    dialect:'mysql',
    logging: false,
    pool:{
        max:5,
        min:0,
        acquire: 30000,
        idle: 10000
    }

}