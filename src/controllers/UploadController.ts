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
import { Warehouses } from "../entity/Warehouses";
import { ArticleSecondInformation } from "../entity/ArticleSecondInformation";
import { User } from "../entity/User";
import { UserInformation } from "../entity/UserInformation";
import { info } from "console";
import { ZipCode } from "../entity/ZipCode";
import { performance } from "perf_hooks";

class UploadController {

    importDataANDUserInformation = async  (req:any, res:any, next:any) => {
        try {
            const fileContents = fs.readFileSync(path.join(process.cwd(), 'src', 'assets', 'other_data', 'dobavitelji.csv'));
            const records = await new Promise<any[]>((resolve, reject) => {
                parse(fileContents, { columns: true }, (err, data) => {
                  if (err) reject(err);
                  else resolve(data);
                });
            });

            if(records == null || records == undefined)
                throw new Error(`Izbrana datoteka žal ne obsatja !`);
            let startTime = performance.now();
            records.map(async item => {
                
                const getCountry: any = await AppDataSource.manager.findBy(Counrty, {
                    type: item.DRZAVA
                });
                
                const getZipCode: any = await AppDataSource.manager.findBy(ZipCode,{
                    attribute: item.POSTA
                });
                
                let user = new User();
                user.firstName = item.IME;
                user.user_identification = item.UPORABNIKI; 
                
                
    
                let information = new UserInformation();
                information.user = user;
                information.emsho = item.EMSO;
                information.tax_number = item.DAV_ST;
                information.country = (this.checkIfObjectIsEmpty(getCountry) == undefined) ? null : getCountry.id;
                information.adress = `${item.NASELJE} ${item.ULICA} ${item.HISNA_ST}`;
                information.phone_number = item.TELEFON; 

                await AppDataSource.manager.save([user,information]);

            });
            let endTime = performance.now();
            let responseTime = ((endTime - startTime) / 1000).toFixed(2);
            
            return res.status(200).json(`Podatki so bili uspešno shranjeni, čas shranjevanja podatkov: ${responseTime} s`);
        } catch(error) {
            return res.status(400).json(error);
        }
    }

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

    getArticleSecondInformation = async (req:any, res:any, next: any) => {
        try {
            const fileContents = fs.readFileSync(path.join(process.cwd(), 'src', 'assets', 'other_data', 'filtri_ostalo.csv'));
            const records = await new Promise<any[]>((resolve, reject) => {
                parse(fileContents, { columns: true }, (err, data) => {
                  if (err) reject(err);
                  else resolve(data);
                });
            });

            records.map(async item =>  {
                const getWarehouse : any = await AppDataSource.manager.findBy(Warehouses,{
                    id: item.SKLADISCE
                });

                let data = new ArticleSecondInformation();
                data.id = item.ID_ART;
                data.net_mass = (item.TEZA === undefined) ? null: item.TEZA;
                data.gross_weight = (item.TEZA === undefined) ? null: item.TEZA;
                data.length = (item.DOLZINA === undefined) ? null : item.DOLZINA;
                data.width = (item.SIRINA === undefined) ? null: item.SIRINA;
                data.thickness = null;
                data.volume = (item.VOLUMEN === undefined) ? null: item.VOLUMEN;
                data.standart = (item.STANDART === undefined) ? null : item.STANDART;
                data.quality = (item.KVALITETA === undefined) ? null: item.KVALITETA;
                data.kala = (item.KALO === undefined) ? null : item.KALO;
                data.inspection = (item.KONTROLA_P === undefined) ? null: item.KONTROLA_P;
                data.warehouse = (this.checkIfObjectIsEmpty(getWarehouse) == undefined) ? null : getWarehouse[0].id;

                await AppDataSource.manager.save(data);
            });


            return res.status(200).json("JSON data has been reed");

        } catch (error) {   
            return res.status(400).json(error);
        }
    }


    checkForNonUTF8Characters = (text: string): string => {
        if (!text.includes('?')) {
            return text; // Base case: no more question marks found
        }

        const index = text.indexOf('?');
        const char = text[index - 1]; // Get the character before the question mark
      
        // Define the replacement value based on the character before the question mark
        let replacement: string;
        switch (char) {
          case 'Š':
            replacement = "Š";
          break;
          case 'Č':
            replacement = "Č"
            break;
          case 'Ž':
            replacement = 'Ž';
            break;
          default:
            replacement = '-';
            break;
        }
        const replacedText = text.slice(0, index) + replacement + text.slice(index + 1);

        // Recursively call the function to replace remaining question marks
        return this.checkForNonUTF8Characters(replacedText);
    }

    uploadUsers = async (req:any, res:any, next:any) => {
        try {
            let ReadFile = req.file;
            const filePath = path.join(process.cwd(), 'src', 'assets', 'uploads', ReadFile.filename);
            const fileData = fs.readFileSync(filePath, 'utf8');
            const records = await new Promise<any[]>((resolve, reject) => {
                parse(fileData, { columns: true, encoding: "utf8" }, (err, data) => {
                  if (err) reject(err);
                  else resolve(data);
                });
            });
            
            return res.status(200).json(records);

        } catch(error) {
            return res.status(400).json(error);
        }
    }

    getUploadedFiles = async (req:any, res:any, next:any) => {
        try {
            const filePath = path.join(process.cwd(), 'src', 'assets', 'uploads');

            const filesInfo = await new Promise<(string | fs.Stats)[]>((resolve, reject) => {
                fs.readdir(filePath, async (err, files) => {
                    if (err) {
                        reject(err);
                    } else {
                        const fileInfoPromises = files.map(async (file) => {
                            const fullFilePath = path.join(filePath, file);
                            const stats = await fs.promises.stat(fullFilePath);
                            return {
                                name: file,
                                uploaded: stats.birthtime, // Creation time
                                lastModified: stats.mtime // Last modification time
                            };
                        });
        
                        let fileInfo: any = await Promise.all(fileInfoPromises);
                        resolve(fileInfo);
                    }
                });
            });

            return res.status(200).json({
                files: filesInfo
            });

        } catch (error) {
            return res.status(400).json(error);
        }
    }


    readUploadedFile =async (req:any, res:any, next:any) => {
        try {
            
        } catch(error) {
            return res.status(400).json(error);
        }
    }

}


export default UploadController;
