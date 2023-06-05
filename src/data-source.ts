import "reflect-metadata"
import { DataSource, TypeORMError } from "typeorm"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "username",
    password: "password",
    database: "databse_name",
    synchronize: true,
    logging: false,
    entities: ["src/entity/*.ts" ],
    migrations: [],
    subscribers: [],
    extra: {
     keepConnectionAlive: true,
     max: 150
    },
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


