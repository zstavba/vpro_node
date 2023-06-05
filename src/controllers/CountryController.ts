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

    getLanguage = async (req:any,res:any, next:any) => {
        try {
            const languages = await AppDataSource.manager.find(Languages);

            return res.status(200).json({
                'languages_list': languages
            });

        } catch ( error: any) {
            return res.status(400).json({
                message: error
            });
        }
    }

    getCostumTariffs = async (req:any, res:any,next:any) => {
        try {
            const CustomTarrifsList = await AppDataSource.getRepository(CustomTariffs)
                                                        .createQueryBuilder('CustomTariffs')
                                                        .leftJoinAndSelect("CustomTariffs.em","MeasurementUnits")
                                                        .getMany();

            return res.status(200).json({
                custom_tariffs_list: CustomTarrifsList
            });
        } catch( error ) {
            return res.status(200).json({
                message: error
            })
        }
    }


}

export default CountryController;