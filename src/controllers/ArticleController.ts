import { AnyARecord } from "dns";
import { response } from "express";
import { get } from "http";
import { Connection, ConnectionManager, createConnection, getConnectionManager } from "typeorm";
import { AppDataSource } from "../data-source";

import { Banks } from "../entity/Banks";
import { Fabric } from "../entity/Fabric";
import { Flis } from "../entity/Flis";
import { ArticleType } from "../entity/ArticleType";

class ArticleController {

    getArticleType =  async (req:any, res:any, next:any) => {
        try {
            const ArticleTypeList = await AppDataSource.manager.find(ArticleType);

            return res.status(200).json({
                article_type_list: ArticleTypeList
            })
        } catch (error){
            return res.status(400).json({
                message: error
            })
        }
    }

}

export default ArticleController;