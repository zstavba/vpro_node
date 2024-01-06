import { AnyARecord } from "dns";
import { response } from "express";
import { get } from "http";
import { Connection, ConnectionManager, createConnection, getConnectionManager } from "typeorm";
import { AppDataSource } from "../data-source";

import { Banks } from "../entity/Banks";
import { Fabric } from "../entity/Fabric";
import { Flis } from "../entity/Flis";
import { GroupType } from "../entity/GroupType";
import { User } from "../entity/User";

class GroupController {

    get = async (req:any, res:any, next:any) => {
        /* These type of function is called in case we need to get informations from foreign keys !!!  */
        const group_type_list = await AppDataSource.getRepository(GroupType)
                                                    .createQueryBuilder("group_type")
                                                    .leftJoinAndSelect("group_type.fk_user_id","user")
                                                    .getMany();
        
        return res.status(200).json(group_type_list);
    }

    getType = async (req: any, res: any, next: any) => {
        const types = await AppDataSource.manager.findBy(GroupType, {
            type: req.params.type
        });

        return res.status(200).json({
            "group_type_list": types
        });
    }

    add = async (req:any, res:any, next:any) => {

    }

    update = async (req:any, res:any, next:any) => {

    }

    delete = async ( req:any,res:any, next:any ) => {

    }

}


export default GroupController;