import { AnyARecord } from "dns";
import { response } from "express";
import { get } from "http";
import { Connection, ConnectionManager, createConnection, getConnectionManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { Dispatch } from "../entity/Dispatch";
import { Fabric } from "../entity/Fabric";
import { Flis } from "../entity/Flis";

class DispatchController {

    get = async (req: any, res:any, next:any) => {
        const dispatch = await AppDataSource.manager.find(Dispatch);
    
        return res.status(200).json({
            "dispatch_list": dispatch
        });
    }

}

export default DispatchController;