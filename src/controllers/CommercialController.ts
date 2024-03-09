import { AppDataSource } from "../data-source";
import { CostumerOrder } from "../entity/CostumerOrder";
import { CreditNote } from "../entity/CreditNote";
import { DebitNote } from "../entity/DebitNote";
import { Estimates } from "../entity/Estimates";
import { ExchangeRate } from "../entity/ExchangeRates";
import { Fakturing } from "../entity/Fakturing";
import { GeneralStatments } from "../entity/GeneralStatments";
import { Offers } from "../entity/Offers";
import { OpenMode } from "../entity/OpenMode";

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
            let ListDebitNote = await AppDataSource.getRepository(DebitNote)
                                                   .createQueryBuilder("DebitNote")
                                                   .leftJoinAndSelect("DebitNote.fk_language_id","Languages")
                                                   .getMany();


            return res.status(200).json(ListDebitNote);

        } catch(error) {
            return res.status(400).json(error);
        }
    }

    getCreditNote = async (req:any, res:any, next:any) => {
        try {
            let ListCreditNote = await AppDataSource.getRepository(CreditNote)
                                                    .createQueryBuilder("CreditNote")
                                                    .leftJoinAndSelect("CreditNote.fk_language_id","Languages")
                                                    .getMany();

            return res.status(200).json(ListCreditNote);

        } catch(error) {
            return res.status(400).json(error)
        }
    }

    getFakturing =  async (req:any, res:any, next: any) => {
        try {
            let ListFakturing =  await AppDataSource.getRepository(Fakturing)
                                                    .createQueryBuilder("Fakturing")
                                                    .leftJoinAndSelect("Fakturing.fk_language_id","Languages")
                                                    .getMany();

            return res.status(200).json(ListFakturing);

        } catch(error) {
            return res.status(400).json(error);
        }
    }


    getFakturingByLanguageID = async (req:any, res:any, next:any) => {
        try {
            let FakturingList = await AppDataSource.getRepository(Fakturing)
                                                   .createQueryBuilder("Fakturing")
                                                   .leftJoinAndSelect("Fakturing.fk_language_id","Languages")
                                                   .where("Fakturing.fk_language_id = :id",{
                                                        id: req.params.id
                                                   })
                                                   .getMany();

            return res.status(200).json(FakturingList);

        } catch(error) {
            return res.status(401).json({
                message: error.message
            });
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

    getOffers = async (req:any, res:any, next:any) => {
         try {
            let ListGetOffer = await AppDataSource.getRepository(Offers)
                                                  .createQueryBuilder("Offers")
                                                  .leftJoinAndSelect("Offers.fk_language_id","Languages")
                                                  .getMany();

            return res.status(200).json(ListGetOffer)

        } catch(error) {
             return res.status(400).json(error)
         }
    }

    getEstimates = async (req:any, res:any, next: any) => {
        try {   
            let ListEstimates = await AppDataSource.getRepository(Estimates)
                                                    .createQueryBuilder("Estimates")
                                                    .leftJoinAndSelect("Estimates.fk_language_id","Languages")
                                                    .getMany();

            return res.status(200).json(ListEstimates);
            
        } catch(error) {
            return res.status(400).json(error);
        }
    }

    getGeneralStatment = async (req:any, res:any, next: any) => {
        try {
            let GeneralStatmentList = await AppDataSource.getRepository(GeneralStatments)
                                                         .createQueryBuilder("GS")
                                                         .leftJoinAndSelect("GS.fk_language_id","Languages")
                                                         .getMany();

            return res.status(200).json(GeneralStatmentList);
        } catch(error){
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getGeneralStatmentByLaguageID = async (req:any, res:any, next:any) => {
        try {
            let GSFLID = await AppDataSource.getRepository(GeneralStatments)
                                            .createQueryBuilder("GS")
                                            .leftJoinAndSelect("GS.fk_language_id","Languages")
                                            .where("GS.fk_language_id = :id",{
                                                id: req.params.id
                                            })
                                            .getMany();
            
            return res.status(200).json(GSFLID);

        } catch (error) {
            return res.status(401).json({
                message: error.message
            });
        }
    }
}


export default CommercialController;