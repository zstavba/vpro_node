import { AppDataSource } from "../data-source";
import { CostumerOrder } from "../entity/CostumerOrder";
import { CreditNote } from "../entity/CreditNote";
import { DebitNote } from "../entity/DebitNote";
import { ExchangeRate } from "../entity/ExchangeRates";
import { Fakturing } from "../entity/Fakturing";
import { OpenMode } from "../entity/OpenMode";
import { SupplierOrder } from "../entity/SupplierOrder";

class CommercialController {

    getOpenMode = async (req:any, res:any, next:any) => {
        try{
            let ListOpenMode = await AppDataSource.manager.find(OpenMode);

            return res.status(200).json(ListOpenMode);

        } catch (error: any) {
            return res.status(400).json(error)
        }
    }

    getExhangeRates = async (req:any, res:any, next:any) => {
        try{
            let ListExchangeRates = await AppDataSource.manager.find(ExchangeRate);

            return res.status(200).json(ListExchangeRates);
        } catch (error: any) {
            return res.status(400).json(error)
        }
    }

    getDebitNote = async (req: any, res:any, next: any) => {
        try {
            let ListDebitNote = await AppDataSource.manager.find(DebitNote);

            return res.status(200).json(200);

        } catch(error) {
            return res.status(400).json(error);
        }
    }

    getCreditNote = async (req:any, res:any, next:any) => {
        try {
            let ListCreditNote = await AppDataSource.manager.find(CreditNote);

            return res.status(200).json(ListCreditNote);

        } catch(error) {
            return res.status(400).json(error)
        }
    }

    getFakturing =  async (req:any, res:any, next: any) => {
        try {
            let ListFakturing =  await AppDataSource.manager.find(Fakturing);

            return res.status(200).json(ListFakturing);

        } catch(error) {
            return res.status(400).json(error);
        }
    }


    // getSupplier = async (req:any, res:any, next:any) => {
    //     try {

    //     } catch(error) {
    //         return res.status(400).json(error)
    //     }
    // }

    getSupplierOrder = async (req:any, res:any, next:any) => {
        try {
            let ListGetSupplierOrder = await AppDataSource.manager.find(SupplierOrder);

            return res.status(200).json(ListGetSupplierOrder);

        } catch(error) {
            return res.status(400).json(error)
        }
    }

    getCostumerOrder = async (req:any, res:any, next:any) => {
         try {
            let ListCostumerOrder = await AppDataSource.manager.find(CostumerOrder);

            return res.status(200).json(ListCostumerOrder);

         } catch(error) {
             return res.status(400).json(error)
         }
    }

}


export default CommercialController;