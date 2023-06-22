
import { Session } from 'express-session';
import path = require('path');
import ArticleController from './controllers/ArticleController';
import BanksController from './controllers/BanksController';
import ClassificationsController from './controllers/ClassificationsController';
import DispatchController from './controllers/DispatchController';
import GroupController from './controllers/GroupController';
const express = require("express");
const bodyParser = require("body-parser");

import HomeController from './controllers/HomeController';
import PartnersController from './controllers/PartnersController';
import PriceController from './controllers/PriceController';
import TrafficController from './controllers/TraficController';
import UnitsController from './controllers/UnitsController';
import WorkOrderController from './controllers/WorkOrder';
import CountryController from './controllers/CountryController';
import UserController from './controllers/UserController';
import WarehouseController from './controllers/WarehouseController';
import ProductionController from './controllers/ProductionController';
import UploadController from './controllers/UploadController';

const app = express();
/* Setting the Work Order file storage  */
app.set(express.static(path.join(`${__dirname}/assets`)));


const PORT = 3000;

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json());
app.use(express.urlencoded());

app.use((req: any, res: any, next: any) => {
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader('Access-Control-Allow-Methods', "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
  
    next();
  });

const router = express.Router();

const Home = new HomeController();
const Banks = new BanksController();
const Articles = new ArticleController();
const Prices = new PriceController();
const Dispatch = new DispatchController();
const Traffic =  new TrafficController();
const Groups = new GroupController();
const Units = new UnitsController();
const WorkOrder = new WorkOrderController();
const Classification = new ClassificationsController();
const Country = new CountryController();
const User = new UserController();
const WareHouse = new WarehouseController();
const Production = new ProductionController();

/* Uploading files to DB  */
const Upload = new UploadController();

app.get("/",Home.index);

/* Funkcionalnosti za Flise, Tkanine, Vlakna, etc ...  */
app.get("/seznam/flisov",Home.getFlisList);
app.get("/seznam/tkanin", Home.getFabricList);
app.get("/tkanina/:ident",Home.getFabricByIdent);


/* Funkcionalnosti za Partnerje, POST,PUT,GET,DELETE,UPDATE  */
//app.get("/partners/list",Partner.get);

/* Funkcionalnosti za Banke, POST,PUT,GET,DELETE,UPDATE  */

app.get('/banks/list',Banks.get);
app.get('/banks/bankruptcy/type', Banks.getBankruptcyType);
app.get("/banks/dispatch",Dispatch.get);
app.get("/banks/sectors/list",Banks.getSectors);
app.get("/banks/ddv/list",Banks.getDDVType);
app.get("/banks/payments/list",Banks.getPaymentType);
app.get("/banks/currencies/list",Banks.getCurrencies);


/* Funkcionalnosti za Artikle, POST,PUT,GET,DELETE,UPDATE  */



/* Funkcionalnosti za Cenik, POST,PUT,GET,DELETE,UPDATE  */
app.get("/prices/list",Prices.get);
app.get("/prices/list/:type",Prices.getByType);

/* Funkcionalnosti za Promet, POST,PUT,GET,DELETE,UPDATE  */
app.get('/traffic/list',Traffic.get);


/* Funkcionalnosti za SKUPINE, POST,PUT,GET,DELETE,UPDATE  */
app.get("/group/list",Groups.get);
app.get("/group/list/:type",Groups.getType);

/* Funkcionalnosti za MERSKE ENOTE, POST,PUT,GET,DELETE,UPDATE  */
app.get("/units/list",Units.get);


/* Delovni Nalogi za MERSKE ENOTE, POST,PUT,GET,DELETE,UPDATE  */



/* Klasifikacije   POST,PUT,GET,DELETE,UPDATE  */

app.get('/classifications/list', Classification.get);

 /* Država, podatki   POST,PUT,GET,DELETE,UPDATE  */

 app.get('/country',Country.getCountry);
 app.get('/country/zipcode',Country.getZipCode);
 app.get('/country/languages',Country.getLanguage);
 app.get('/country/custom/tariffs', Country.getCostumTariffs);

 /* User Functionallity  POST,PUT,GET,DELETE,UPDATE */
app.get('/users',User.get);


/* Warehouse Functionallity  POST,PUT,GET,DELETE,UPDATE */
app.get('/warehouse/list', WareHouse.get);
app.get('/warehouse/categories', WareHouse.getCategories);
app.get('/warehouse/units', WareHouse.getUnits);
app.get('/warehouse/locations',WareHouse.getLocations);
app.get('/warehouse/cost/cities',WareHouse.getCostCities);
app.get("/warehouse/organizational/units",WareHouse.getOrganizationalUnits);
app.get('/warehouse/areas',WareHouse.getAreas);
app.get('/warehouse/centers',WareHouse.getWorkCenters);
app.get('/warehouse/upn/codes',WareHouse.getUpnCodes);
app.get('/warehouse/control/plan',WareHouse.getControlPlan);
app.get('/warehouse/meassurment/units',WareHouse.getMeasurementUnits);

/* Production  Functionallity  POST,PUT,GET,DELETE,UPDATE */
app.get("/production/alternatives", Production.getALternatives);


/* Articles  Functionallity  POST,PUT,GET,DELETE,UPDATE */
app.get('/article/types/list',Articles.getArticleType);
app.get('/article/list',Articles.getList);
app.get('/articles/info/basic/:ident',Articles.getArticleInfo);

/* Upload Data functions  */
app.get('/upload/articles/basics',Upload.getArticlesFilesBasics);
app.get('/update/articles/basics',Upload.updateExsitingData);

export default router;


app.listen(PORT, function () { return console.log(` VPRO Application woring on PORT: ${PORT} `); });

