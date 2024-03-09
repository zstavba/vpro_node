import { AnyARecord } from "dns";
import { response } from "express";
import { get } from "http";
import { AppDataSource } from "../data-source";

import { Banks } from "../entity/Banks";
import { Fabric } from "../entity/Fabric";
import { Flis } from "../entity/Flis";
import { ArticleType } from "../entity/ArticleType";

type KeyToFuncMap<T> = {
    [K in keyof T]: () => Promise<void>;
};
  
class ArticleController {


    
    getList = async (req:any, res:any, next:any) => {
        try {


            return res.status(200).json([])

        } catch(error){
            return res.status(400).json({
                message: error
            })
        }
    }

    getArticleType =  async (req:any, res:any, next:any) => {
        try {
            const ArticleTypeList = await AppDataSource.manager.find(ArticleType);

            return res.status(200).json(ArticleTypeList)
        } catch (error){
            return res.status(400).json({
                message: error
            })
        }
    }

    getArticleInfo = async (req:any, res:any, next:any) => {
        try {   
            const parameter = req.params.ident; // Assuming req.params.ident is the specific parameter value

   
            return res.status(200).json([]);

        } catch (error) {
            return res.status(400).json(error);
        }
    }

    deleteArticle = async (req: any, res:any, next: any) => {
        try {
            return res.status(200).json(req.params.id);
        } catch (error) {
            return res.status(400).json(error);
        }
    }


    getArticleSecondInformation =  async (req: any, res:any, next: any) => {
        try {
   
            return res.status(200).json([]);

        } catch(error) {
            return res.status(400).json(error);
        }
    }

}

export default ArticleController;