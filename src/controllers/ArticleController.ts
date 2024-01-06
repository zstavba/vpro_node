import { AnyARecord } from "dns";
import { response } from "express";
import { get } from "http";
import { AppDataSource } from "../data-source";

import { Banks } from "../entity/Banks";
import { Fabric } from "../entity/Fabric";
import { Flis } from "../entity/Flis";
import { ArticleType } from "../entity/ArticleType";
import { ArticleBaics } from "../entity/ArticleBasics";
import { ArticleSecondInformation } from "../entity/ArticleSecondInformation";

type KeyToFuncMap<T> = {
    [K in keyof T]: () => Promise<void>;
};
  
class ArticleController {


    
    getList = async (req:any, res:any, next:any) => {
        try {
            const List = await  AppDataSource.getRepository(ArticleBaics).find({ 
                                                                    relations : ['group1','group2','group3', 'group4', 'mu','country','article_type','tariffs','tax'], 
                                                                    order: {
                                                                        title: 'ASC', // 'ASC' for ascending or 'DESC' for descending
                                                                    },
                                                                });

            return res.status(200).json(List)

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

            const List = await AppDataSource.getRepository(ArticleBaics).find({
              where: { code: parameter },
              relations: ['group1', 'group2', 'group3', 'group4', 'mu', 'country', 'article_type', 'tariffs', 'tax', 'supplier', 'manufacturer'],
            });
            
            return res.status(200).json(List);

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
            const getSecondInformation = await AppDataSource.getRepository(ArticleSecondInformation).find({
                where : {id: req.params.id},
                relations: ["warehouse"]
            })
            return res.status(200).json({
                "information" : getSecondInformation
            });

        } catch(error) {
            return res.status(400).json(error);
        }
    }

}

export default ArticleController;