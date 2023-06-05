import { AnyARecord } from "dns";
import { response } from "express";
import { get } from "http";
import { Connection, ConnectionManager, createConnection, getConnectionManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { Fabric } from "../entity/Fabric";
import { Flis } from "../entity/Flis";

class HomeController {

    private connectionManager: ConnectionManager;

    constructor () {
        
        
    }
 
    index = async (req: any,res: any,next: any) => {

        return res.status(200).json({
            "message": "Welcome to VPRO Database API server !!!"
        });
    }

    getFlisList = async (req:any, res: any, next: any) => {
            const flis = await AppDataSource.manager.find(Flis);

            return res.status(200).json({
                "seznam": flis
            });
        
    }

    getFabricList = async (req:any,res:any,next:any) => {
        /* Setting Up the connection  */
        const fabric = await AppDataSource.manager.find(Fabric);

        return res.status(200).json({
            "seznam": fabric
        });
    }

    getFabricByIdent = async (req:any, res:any, next: any) => {
        const identParam = req.params.ident;
        const getOne = await AppDataSource.manager.findOneBy(Fabric,{
            ident: identParam
        });
    
        return res.status(200).json({
            tkanina: getOne
        });
    }
}

export default HomeController;