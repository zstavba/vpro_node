import { AnyARecord } from "dns";
import { response } from "express";
import { get } from "http";
import { Connection, ConnectionManager, createConnection, getConnectionManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { ZipCode } from "../entity/ZipCode";
import { Counrty } from "../entity/Country";
import { Languages } from "../entity/Languages";
import { CustomTariffs } from "../entity/CustomsTariffs";

class CountryController {

    getById = async (req:any, res:any, next:any) => {
        try {
            const byID = await AppDataSource.manager.findBy(Counrty, {
                id: req.params.id
            });

            return res.status(200).json(byID);
            
        } catch (error: any) {
            return res.status(400).json({
                message: error
            });
        }
    }



    getZipCode = async (req:any, res:any, next:any) => {
        try {
            const zipcode = await AppDataSource.manager.find(ZipCode);

            return res.status(200).json({
                'zipcodelist': zipcode
            });

        } catch ( error: any) {
            return res.status(400).json({
                message: error
            });
        }
    }
    /* Functions for cuntryies  */

    getCountry = async (req:any, res:any, next:any) => {
        try {
            const country_list = await AppDataSource.manager.find(Counrty);

            return res.status(200).json({
                'country_list': country_list
            });

        } catch ( error: any) {
            return res.status(400).json({
                message: error
            });
        }
    }
    createCountry = async (req:any, res:any,next:any) => {

    }

    updateCountry = async (req:any, res:any,next:any) => {
        
    }

    deleteCountry = async (req:any, res:any,next:any) => {
        
    }

    /* Functions for Languages  */

    getLanguage = async (req:any,res:any, next:any) => {
        try {
            const languages = await AppDataSource.manager.find(Languages);

            return res.status(200).json(languages);

        } catch ( error: any) {
            return res.status(400).json({
                message: error
            });
        }
    }

    createLanguage = async (req:any, res:any,next:any) => {

    }

    updateLanguage = async (req:any, res:any,next:any) => {
        
    }

    deleteLanguage = async (req:any, res:any,next:any) => {
        
    }

    /* Functions for Custom Tariffs  */

    getCostumTariffs = async (req:any, res:any,next:any) => {
        try {
            const CustomTarrifsList = await AppDataSource.getRepository(CustomTariffs)
                                                        .createQueryBuilder('CustomTariffs')
                                                        .leftJoinAndSelect("CustomTariffs.em","MeasurementUnits")
                                                        .getMany();

            return res.status(200).json(CustomTarrifsList);
        } catch( error ) {
            return res.status(200).json({
                message: error
            })
        }
    }

    createCustomTariffs = async (req:any, res:any,next:any) => {

    }

    updateCustomTariffs = async (req:any, res:any,next:any) => {
        
    }

    deleteCustomTariffs = async (req:any, res:any,next:any) => {
        
    }


}

export default CountryController;