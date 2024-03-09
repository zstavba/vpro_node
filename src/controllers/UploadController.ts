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
import { Counrty } from "../entity/Country";
import { ArticleType } from "../entity/ArticleType";
import { Classification } from "../entity/Classifications";
import { GroupType } from "../entity/GroupType";
import { Warehouses } from "../entity/Warehouses";
import { User } from "../entity/User";
import { UserInformation } from "../entity/UserInformation";
import { info } from "console";
import { ZipCode } from "../entity/ZipCode";
import { performance } from "perf_hooks";
import { DebitNote } from "../entity/DebitNote";
import { Languages } from "../entity/Languages";
import { CreditNote } from "../entity/CreditNote";
import { Fakturing } from "../entity/Fakturing";
import { Offers } from "../entity/Offers";
import { Estimates } from "../entity/Estimates";
import { GeneralStatments } from "../entity/GeneralStatments";

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

    }

    updateExsitingData = async (rea:any, res:any, next:any) => {
        try {


            return res.status(200).json("OK");
        } catch (error) {
            return res.status(400).json(error);
        }
    }

    getArticleSecondInformation = async (req:any, res:any, next: any) => {
        try {
 


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

    importDebitNoteInformation = async (req:any, res:any, next: any) => {
        try{
            const fileContents = fs.readFileSync(path.join(process.cwd(), 'src', 'assets', 'other_data', 'bremepis.csv'));
            const records = await new Promise<any[]>((resolve, reject) => {
                parse(fileContents, { columns: true }, (err, data) => {
                  if (err) reject(err);
                  else resolve(data);
                });
            });      

            records.map(async item => {
                let DN: DebitNote =  new DebitNote();
                DN.active = true;
                DN.created_at = new Date();
                DN.type = (item.TIP == undefined || item.TIP == null || item.TIP == '') ? null : item.TIP;
                DN.description = (item.VSEBINA == null || item.VSEBINA == undefined || item.VSEBINA == '') ? null: item.VSEBINA;
                let findLanguage =  await AppDataSource.manager.findBy(Languages,{
                    id: item.JEZIK
                })

                DN.fk_language_id = (this.checkIfObjectIsEmpty(findLanguage[0]) == null) ? null: findLanguage[0];
                DN.idg = (item.IDG == null || item.IDG == undefined || item.IDG == '') ? null: item.IDG;
                DN.title = (item.NAZIV == null || item.NAZIV == undefined || item.NAZIV == '') ? null : item.NAZIV;
                DN.status = (item.STATUS == null || item.STATUS == undefined || item.STATUS == '') ? null: item.STATUS;
                DN.document_type = (item.TIP_DOK == null || item.TIP_DOK == undefined || item.TIP_DOK == '') ? null: item.TIP_DOK;
                
                await AppDataSource.manager.save(DN);
            });




            return res.status(200).json({
                message: "Podatki so bili uspešno shranjeni !"
            });

        } catch(error) {
            return res.status(401).json({
                message: error.message
            })
        }
    }

    importCreditNoteInformation = async (req:any, res:any ,next:any) => {
        try {
            const fileContents = fs.readFileSync(path.join(process.cwd(), 'src', 'assets', 'other_data', 'dobropis.csv'));
            const records = await new Promise<any[]>((resolve, reject) => {
                parse(fileContents, { columns: true }, (err, data) => {
                  if (err) reject(err);
                  else resolve(data);
                });
            });      

            records.map(async item => {
                let CN: CreditNote = new CreditNote();
                CN.active = true;
                CN.created_at = new Date();
                CN.type = (item.TIP == undefined || item.TIP == null || item.TIP == '' ) ? null : item.TIP;
                CN.title = (item.NAZIV == undefined || item.NAZIV == null || item.NAZIV == '') ? null : item.NAZIV;
                let getLanguage = await AppDataSource.manager.findBy(Languages, {
                    id: item.JEZIK
                });

                CN.fk_language_id = (this.checkIfObjectIsEmpty(getLanguage[0]) == null ) ? null : getLanguage[0];
                CN.idg = (item.IDG == undefined || item.IDG == null || item.IDG == '') ? null : item.IDG;
                CN.status = (item.STATUS == undefined || item.STATUS == null || item.STATUS == '') ? null : item.STATUS;
                CN.description = (item.VSEBINA == undefined || item.VSEBINA == null || item.VSEBINA == '') ? null : item.VSEBINA;

               await AppDataSource.manager.save(CN);

            });


            return res.status(200).json({
                message: "Podatki so bili uspešno shranjeni !"
            });
            
        } catch(error) {
            return res.status(401).json({
                message: error.message
            })
        }
    }


    importFaktoringInformation = async (req:any ,res:any, next: any) => {
        try {

            const fileContents = fs.readFileSync(path.join(process.cwd(), 'src', 'assets', 'other_data', 'fakture_tujina.csv'));
            const records = await new Promise<any[]>((resolve, reject) => {
                parse(fileContents, { columns: true }, (err, data) => {
                  if (err) reject(err);
                  else resolve(data);
                });
            });    


            records.map(async item => {
                let FK: Fakturing = new Fakturing();
                FK.active = true;
                FK.created_at = new Date();
                FK.type = (item.TIP == null || item.TIP == undefined || item.TIP == '') ? null : item.TIP;
                FK.idg = (item.IDG == null || item.IDG == undefined || item.IDG == '') ?  null : item.IDG;
                FK.status = (item.STATUS == null || item.STATUS == undefined || item.STATUS == '') ? null : item.STATUS;
                let findLanguage = await AppDataSource.manager.findBy(Languages,{
                    id: item.JEZIK
                });
                FK.fk_language_id = (this.checkIfObjectIsEmpty(findLanguage[0]) == null ) ? null : findLanguage[0];
                FK.description = (item.VSEBINA == null || item.VSEBINA == undefined || item.VSEBINA == '') ? null: item.VSEBINA;

                await AppDataSource.manager.save(FK);


            });


            return res.status(200).json({
                message: "Podatki so bili uspešno shranjeni"
            });

        } catch(error){
            return res.status(401).json({
                message: error.message
            })
        }
    }

    importOfferingInformation = async (req:any, res:any, next: any) => {
        try {
            const fileContents = fs.readFileSync(path.join(process.cwd(), 'src', 'assets', 'other_data', 'bremepis.csv'));
            const records = await new Promise<any[]>((resolve, reject) => {
                parse(fileContents, { columns: true }, (err, data) => {
                  if (err) reject(err);
                  else resolve(data);
                });
            });   

            records.map(async item => {
                let Offer: Offers = new Offers();

                Offer.active = true;
                Offer.created_at = new Date();
                let findLanguage = await AppDataSource.manager.findBy(Languages,{
                    id: item.JEZIK
                });
                Offer.fk_language_id = (this.checkIfObjectIsEmpty(findLanguage[0]) == null) ? null : findLanguage[0];
                Offer.idg = (item.IDG == undefined || item.IDG == null || item.IDG == '') ? null : item.IDG;
                Offer.type = (item.TIP == undefined || item.TIP == null || item.TIP == '') ? null : item.TIP;
                Offer.description = (item.VSEBINA == undefined ||item.VSEBINA == null || item.VSEBINA == '') ? null : item.VSEBINA;


                await AppDataSource.manager.save(Offer);
                

            });


            return res.status(200).json({
                message: "Podatki so bili uspešno shranjeni !"
            });

        } catch(error){
            return res.status(401).json({
                message: error.message
            })
        }
    }

    importEstimateInformation = async (req:any, res:any, next:any) => {
        try {
            const fileContents = fs.readFileSync(path.join(process.cwd(), 'src', 'assets', 'other_data', 'predracuni.csv'));
            const records = await new Promise<any[]>((resolve, reject) => {
                parse(fileContents, { columns: true }, (err, data) => {
                  if (err) reject(err);
                  else resolve(data);
                });
            });   

            records.map(async item => {
                let EST: Estimates = new Estimates();
                EST.active = true;
                EST.created_at = new Date();
                EST.type = (item.TIP == null || item.TIP == undefined || item.TIP == '') ? null: item.TIP;
                EST.document_type = (item.TIPI_DOK == null || item.TIPI_DOK == undefined || item.TIPI_DOK == '') ? null : item.TIPI_DOK;
                EST.title = (item.NAZIV == null || item.NAZIV == undefined || item.NAZIV == '') ? null : item.NAZIV;
                let findLanguages = await AppDataSource.manager.findBy(Languages, {
                    id: item.JEZIK
                });
                EST.fk_language_id = (this.checkIfObjectIsEmpty(findLanguages[0]) == null) ? null :  findLanguages[0];
                EST.description = (item.VSEBINA == null || item.VSEBINA == undefined || item.VSEBINA == '') ? null: item.VSEBINA;
                EST.idg = (item.IDG == null || item.IDG == undefined || item.IDG == '') ? null: item.IDG;
                
                await AppDataSource.manager.save(EST);
            });
            
            return res.status(200).json({
                message: "Podatki so bili uspešno shranjeni !"
            })

        } catch(error){
            return res.status(401).json({
                message: error.message
            });
        }
    }

    imporGeneralStatmentsInformation = async (req: any, res:any, next: any) => {
        try {   
            const fileContents = fs.readFileSync(path.join(process.cwd(), 'src', 'assets', 'other_data', 'splošne_izjave.csv'));
            const records = await new Promise<any[]>((resolve, reject) => {
                parse(fileContents, { columns: true }, (err, data) => {
                  if (err) reject(err);
                  else resolve(data);
                });
            });   

            records.map(async item => {
                let GS : GeneralStatments = new GeneralStatments();

                GS.active = (item.AKTIVEN == null || item.AKTIVEN == undefined || item.AKTIVEN == '') ? null: item.AKTIVEN;
                GS.created_at = new Date();
                let findLanguage = await AppDataSource.manager.findBy(Languages,{
                    id: item.JEZIK
                });
                GS.fk_language_id = (this.checkIfObjectIsEmpty(findLanguage[0]) == null) ? null : findLanguage[0];
                GS.idg = (item.IDG == null || item.IDG == undefined || item.IDG == '') ? null: item.IDG;
                GS.status = (item.STATUS == null || item.STATUS == undefined || item.STATUS == '') ? null:  item.STATUS;
                GS.title = (item.NAZIV == null || item.NAZIV == undefined || item.NAZIV == '') ? null: item.NAZIV;
                GS.description = (item.VSEBINA == null || item.VSEBINA == undefined || item.VSEBINA == '') ? null: item.VSEBINA;
                
                await AppDataSource.manager.save(GS);


            });

            return res.status(200).json({
                message: "Podatki so bili uspešno shranjeni !"
            })

        } catch(error) {
            return res.status(401).json({
                message: error.message
            })
        }
    }




}


export default UploadController;
