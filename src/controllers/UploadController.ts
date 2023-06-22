import { AnyARecord } from "dns";
import { response } from "express";
import { get } from "http";
import { Connection, ConnectionManager, createConnection, getConnectionManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { Banks } from "../entity/Banks";
import { Fabric } from "../entity/Fabric";
import { Flis } from "../entity/Flis";
import { MeasurementUnits } from "../entity/MeasurementUnits";
import { TrafficType } from "../entity/TrafficType";
import * as  fs from 'fs';
import axios from 'axios';
import path = require("path");
import {parse} from 'csv-parse';
import { ArticleBaics } from "../entity/ArticleBasics";
import { Counrty } from "../entity/Country";
import { ArticleType } from "../entity/ArticleType";
import { Classification } from "../entity/Classifications";
import { GroupType } from "../entity/GroupType";

class UploadController {


    /* Checking if the object is null or undefined or if the specific object length is 0 then it returns  undefined;  */
    checkIfObjectIsEmpty = (object: Object | any): undefined => {
        if(object === undefined || object === null){
            return undefined;
        }else if(object.length === 0){
            return undefined;
        }else{
            return object;
        }
    }


    getArticlesFilesBasics = async (req:any, res:any, next:any) => {
        try {
            const fileContents = fs.readFileSync(path.join(process.cwd(), 'src', 'assets', 'other_data', 'STO.csv'));
            const records = await new Promise<any[]>((resolve, reject) => {
                parse(fileContents, { columns: true }, (err, data) => {
                  if (err) reject(err);
                  else resolve(data);
                });
            });
            
            records.map(async (record: any) => {
                const Article = new ArticleBaics();

                const getMU: any = await AppDataSource.manager.findBy(MeasurementUnits, {
                    idg: record.EM1 
                });

                const getCountry: any = await AppDataSource.manager.findBy(Counrty, {
                    type: record.POREKLO
                });

                const Type: any = await AppDataSource.manager.findBy(ArticleType, {
                    type: record.TIP_ART
                });

                const ClassificationList : any = await AppDataSource.manager.findBy(Classification, {
                    classification_id: record.KLASIFIKAC
                });

                const group3: any = await AppDataSource.manager.findBy(GroupType, {
                    idg: record.SKUPINA_3
                });

                const group2: any = await AppDataSource.manager.findBy(GroupType, {
                    idg: record.SKUPINA_2
                });

                const group1: any = await AppDataSource.manager.findBy(GroupType, {
                    idg: record.SKUPINA_1
                });

                const group4: any = await AppDataSource.manager.findBy(GroupType, {
                    idg: record.SKUPINA_4
                });

                Article.mu = (this.checkIfObjectIsEmpty(getMU) == undefined) ? null : getMU[0].id;
                Article.country = (this.checkIfObjectIsEmpty(getCountry) == undefined) ? 279 : getCountry[0].id;
                Article.title = (record.NAZIV === null || record.NAZIV === undefined) ? null :  record.NAZIV;
                Article.ean = (record.EAN === null || record.EAN === undefined) ? null : record.EAN;
                Article.code = (record.ID_ART === null || record.ID_ART === undefined) ? null : record.ID_ART;
                Article.article_type = (this.checkIfObjectIsEmpty(Type) == undefined) ? null: Type[0].id; 
                Article.packaging_type = null;
                Article.stock = (record.ZALOGE === null || record.ZALOGE === undefined) ? 0: record.ZALOGE;
                Article.intrasant = (record.INTRASAT === null || record.INTRASAT === undefined) ? null: record.INTRASAT;
                Article.pallet = null;
                Article.a_crate = null;
                Article.tax = null;
                Article.tariffs = null;
                Article.group3 = (this.checkIfObjectIsEmpty(group3) === undefined) ? null: group3[0].id;
                Article.group2 = (this.checkIfObjectIsEmpty(group2) === undefined) ? null: group2[0].id;
                Article.group1 = (this.checkIfObjectIsEmpty(group1) === undefined) ? null: group1[0].id;
                Article.group4 = (this.checkIfObjectIsEmpty(group4) === undefined) ? null: group4[0].id;
                Article.classification = (this.checkIfObjectIsEmpty(Classification) === undefined) ? null: record.KLASIFIKAC;
                //console.log(record);
                await AppDataSource.manager.save(Article);
            })
            return res.status(200).json("OK");
                
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    updateExsitingData = async (rea:any, res:any, next:any) => {
        try {

            const fileContents = fs.readFileSync(path.join(process.cwd(), 'src', 'assets', 'other_data', 'novo_silon.csv'));
            const records = await new Promise<any[]>((resolve, reject) => {
                parse(fileContents, { columns: true }, (err, data) => {
                  if (err) reject(err);
                  else resolve(data);
                });
            });
            
            records.map(async (record: any) => {
                //console.log(record.NAZIV)
                const findArticles = await AppDataSource.manager.findBy(ArticleBaics, {
                    title: record.NAZIV
                });

                const Article = findArticles[0];

                if(this.checkIfObjectIsEmpty(Article) != undefined) {
                    Article.code = record.ID_ART
                    await AppDataSource.manager.save(Article);
                }

                
                
                
            });

            return res.status(200).json("OK");
        } catch (error) {
            return res.status(400).json(error);
        }
    }

}


export default UploadController;
