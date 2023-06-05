import { AnyARecord } from "dns";
import { response } from "express";
import { get } from "http";
import { Connection, ConnectionManager, createConnection, getConnectionManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { Fabric } from "../entity/Fabric";
import { Flis } from "../entity/Flis";
import { Partners } from "../entity/Partners";

class PartnersController {

    get = async (req:any, res: any, next: any) => {
        const partners = await AppDataSource.manager.find(Partners);

        return res.status(200).json({
            "partners": partners
        });
    }
}


export default PartnersController;