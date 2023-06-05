import { AnyARecord } from "dns";
import { response } from "express";
import { get } from "http";
import { Connection, ConnectionManager, createConnection, getConnectionManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { BankruptcyCertificateType } from "../entity/BankruptcyCertificateType";
import { Banks } from "../entity/Banks";
import { DDVType } from "../entity/DdvTypes";
import { Fabric } from "../entity/Fabric";
import { Flis } from "../entity/Flis";
import { PaymentTypes } from "../entity/PaymentTypes";
import { Sectors } from "../entity/Sectors";
import { Currencies } from "../entity/Currencies";

class BanksController {

    get = async (req:any, res:any, next: any) => {
        const banks = await AppDataSource.manager.find(Banks);

        return res.status(200).json({
            banke: banks
        });
    }

    getBankruptcyType = async (req:any, res:any, next:any) => {
        const bankruptcy = await AppDataSource.manager.find(BankruptcyCertificateType);

        return res.status(200).json({
            "bankruptcy": bankruptcy
        });
    }

    getSectors = async (req:any, res:any, next:any) => {
        const sectors = await AppDataSource.manager.find(Sectors);

        return res.status(200).json({
            "sectors_list": sectors
        });
    }

    getDDVType = async (req:any, res:any, next: any) => {
        const DDV = await AppDataSource.manager.find(DDVType);

        return res.status(200).json({
            "ddv_list": DDV
        });
    }

    getPaymentType = async (req:any, res:any, next:any) => {
        const Payments = await AppDataSource.manager.find(PaymentTypes);

        return res.status(200).json({
            "payments": Payments
        });
    }


    getCurrencies = async (req:any, res:any, next: any) => {
        try {
            const CurrenciesList = await AppDataSource.manager.find(Currencies);
            
            return res.status(200).json({
                "currencies_list": CurrenciesList
            });

        } catch (error: any) {
            return res.status(400).json({
                message: error
            });
        }
    }


}

export default  BanksController;