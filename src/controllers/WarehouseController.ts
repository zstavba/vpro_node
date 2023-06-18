import { AppDataSource } from "../data-source";
import { Areas } from "../entity/Areas";
import { ControlPlan } from "../entity/ControlPlan";
import { CostCities } from "../entity/CostCities";
import { MeasurementUnits } from "../entity/MeasurementUnits";
import { OrganizationalUnits } from "../entity/OrganizationalUnits";
import { UpnCodes } from "../entity/UpnCodes";
import { WarehouseCategories } from "../entity/WarehouseCategories";
import { WarehouseLocations } from "../entity/WarehouseLocations";
import { WarehouseUnits } from "../entity/WarehouseUnits";
import { Warehouses } from "../entity/Warehouses";
import { WorkCenters } from "../entity/WorkCenters";

class WarehouseController {

    get =  async (req:any, res:any, next:any) => {
        try {
            const warehouselist = await AppDataSource.getRepository(Warehouses)
                                                             .createQueryBuilder('Warehouses')
                                                             .leftJoinAndSelect('Warehouses.unit','warehouse_units')
                                                             .getMany();
            //console.log(warehouselist);

            return res.status(200).json({
                "warehousers_list": warehouselist
            })
        } catch (error) {
            return res.status(400).json({
                message: error
            })
        }
    }

    getCategories = async (req:any, res:any, next:any) => {
        try {
            const CategoriesList = await AppDataSource.manager.find(WarehouseCategories);

            return res.status(200).json({
                categories_list: CategoriesList
            });
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }
    getUnits = async (req:any, res:any, next:any) => {
        try {
            const warehouseuits = await AppDataSource.manager.find(WarehouseUnits);
            return res.status(200).json({
                "warehouse_units_list": warehouseuits
            });
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    getLocations = async( req:any, res:any, next:any) => {
        try {
            const locationsList = await AppDataSource.getRepository(WarehouseLocations)
                                                    .createQueryBuilder("WarehouseLocations")
                                                    .leftJoinAndSelect("WarehouseLocations.warehouses","warehouses")
                                                    .leftJoinAndSelect("WarehouseLocations.user","user")
                                                    .getMany();
            
            return res.status(200).json({
                locations_list: locationsList
            });

        } catch (error) {
            return res.status(400).json({
                message: error
            })
        }
    }


    getCostCities = async (req:any, res:any, next:any) => {
        try {
            const CostCitiesList = await AppDataSource.manager.find(CostCities);
            
            return res.status(200).json({
                "cost_cities_list": CostCitiesList
            });
        } catch (error) {
            return res.status(400).json({
                message: error
            })
        }
    }

    getOrganizationalUnits = async (req:any, res:any, next:any) => {
        try {
            const organizationalUnistList = await AppDataSource.getRepository(OrganizationalUnits)
                                                               .createQueryBuilder("OrganizationalUnits")
                                                               .leftJoinAndSelect("OrganizationalUnits.units","WarehouseUnits")
                                                               .leftJoinAndSelect("OrganizationalUnits.user","User")
                                                               .getMany();
            //

            return res.status(200).json({
                organizational_units_list: organizationalUnistList
            });
        } catch (error) {
            return res.status(400).json({
                message:error
            })
        }
    }

    getAreas = async (req:any, res:any, next: any) => {
        try {
            const AreaList = await AppDataSource.manager.find(Areas);

            return res.status(200).json({
                area_list: AreaList
            });

        } catch (error) {
            
            return res.status(400).json({
                message: error
            })

        }
    }

    getWorkCenters = async (req:any, res:any, next:any) => {
        try {

            const WorkCenterList = await AppDataSource.getRepository(WorkCenters)
                                                      .createQueryBuilder("WorkCenters")
                                                      .leftJoinAndSelect("WorkCenters.stm","CostCities")
                                                      .leftJoinAndSelect("WorkCenters.classification","Classifications")
                                                      .leftJoinAndSelect("WorkCenters.oe","OrganizationalUnits")
                                                      .getMany();

            return res.status(200).json({
                "work_center_list": WorkCenterList
            });

        } catch (error) {
            return res.status(400).json({
                messsage: error
            })
        }

    }

    getUpnCodes = async (req:any, res:any, next:any) => {
        try {
            const UpnList = await AppDataSource.manager.find(UpnCodes);

            return res.status(200).json({
                upn_list: UpnList
            });
        } catch(error) {
            return res.status(400).json({
                message: error
            });
        }
    }

    getControlPlan = async (req:any, res:any, next: any) => {
        try {
            const ControlPlanList = await AppDataSource.getRepository(ControlPlan)
                                                        .createQueryBuilder("ControlPlan")
                                                        .leftJoinAndSelect("ControlPlan.sector","Sectors")
                                                        .getMany();
            return res.status(200).json({
                control_plan_list: ControlPlanList
            });

        } catch(error){
            return res.status(400).json({
                message: error
            });
        }
    }

    getMeasurementUnits = async (req:any, res:any, next:any) => {
        try {
            const MessurmentUnitsList: any = await AppDataSource.manager.find(MeasurementUnits);

            return res.status(200).json({
                measurement_units_list: MessurmentUnitsList
            });
        } catch (error) {
            return res.status(400).json({
                message: error
            });
        }
    }

}

export default WarehouseController;