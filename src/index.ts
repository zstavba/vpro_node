
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

import path = require('path');
import ArticleController from './controllers/ArticleController';
import BanksController from './controllers/BanksController';
import ClassificationsController from './controllers/ClassificationsController';
import DispatchController from './controllers/DispatchController';
import GroupController from './controllers/GroupController';

import * as multer from 'multer';
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
import CommercialController from './controllers/CommercialController';
import { Tree } from 'typeorm';
import FileManagerController from './controllers/FileManager';



const app = express();

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));


const secretKey = crypto.randomBytes(32).toString('hex');
let sess = session({
  genid: function(req) {
    return uuidv4(); // use UUIDs for session IDs
  },
  token: secretKey,
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  proxy: true,
  cookie: {
    domain: "localhost",
    resave:false,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // seven days in milliseconds
    secure: true, // Only set this to true if your app is served over HTTPS
    httpOnly:true,
  }
});

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}

app.use(sess); // Session middleware



// Middleware for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'assets/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

// Set the destination folder for static file serving
app.use(express.static(path.join(__dirname, 'assets')));

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
  next();
});
const PORT = 3000;

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
const Commerical = new CommercialController();
const Folder = new FileManagerController();

/* Uploading files to DB  */
const Upload = new UploadController();

app.get("/",Home.index);

/* Funkcionalnosti za Flise, Tkanine, Vlakna, etc ...  */
app.get("/seznam/flisov",Home.getFlisList);
app.get("/seznam/tkanin", Home.getFabricList);
app.get("/tkanina/:ident",Home.getFabricByIdent);


/* Funkcionalnosti za Partnerje, POST,PUT,GET,DELETE,UPDATE  */
//app.get("/partners/list",Partner.get);

/* Funkcionalnosti za Banke, POST,PUT,GET,DELETE,UPDATE  */false

app.get('/banks/list',Banks.get);
app.get('/banks/bankruptcy/type', Banks.getBankruptcyType);
app.get("/banks/dispatch",Dispatch.get);
app.get("/banks/sectors/list",Banks.getSectors);
app.get("/banks/tax/list",Banks.getDDVType);
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
app.get('/classifications/object/:id', Classification.getByID);
app.delete('/classifications/delete/object/:id',Classification.deleteItem)

 /* Država, podatki   POST,PUT,GET,DELETE,UPDATE  */

 /* Getters  */
 app.get('/country/:id',Country.getById);
 app.get('/country',Country.getCountry);
 app.get('/country/zipcode',Country.getZipCode);
 app.get('/country/languages',Country.getLanguage);
 app.get('/country/custom/tariffs', Country.getCostumTariffs);

/* Post */
app.post('/country/create/',Country.createCountry);
app.post('/country/create/language',Country.createLanguage);
app.post('/country/create/custom/tariffs',Country.createCustomTariffs);

app.post('/country/update/',Country.updateCountry);
app.post('/country/update/language',Country.updateLanguage);
app.post('/country/update/custom/tariffs',Country.updateCustomTariffs);


/* Delete */
app.delete('/country/delete/:id',Country.deleteCountry);
app.delete('/language/delete/:id',Country.deleteLanguage);
app.delete('/custom/tariffs/delete:id',Country.deleteCustomTariffs);


 /* User Functionallity  POST,PUT,GET,DELETE,UPDATE */
// Get Options
app.get('/users',User.get);
app.get('/user/type/:type', User.getUserByType);
app.get('/user/get/basic/:id',User.gtetUserById);
app.get('/user/get/info/:id', User.gerUserInformationById);

// POST Options  
app.post('/user/login',User.login);

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

/* Commerical Functionallity  POST,PUT,GET,DELETE,UPDATE */

app.get('/commercial/exchange/rates',Commerical.getExhangeRates);
app.get('/commerical/open/mode', Commerical.getOpenMode);
app.get('/commercial/debit/note',Commerical.getDebitNote);
app.get('/commercial/credit/note', Commerical.getCreditNote);
app.get('/commercial/fakturing',Commerical.getFakturing);
app.get('/commercial/supplier/orders',Commerical.getSupplierOrder);
app.get('/commercial/costumer/orders',Commerical.getCostumerOrder);
app.get('/commertial/offers',Commerical.getOffers);
app.get('/commertial/estimates',Commerical.getEstimates);

/* Production  Functionallity  POST,PUT,GET,DELETE,UPDATE */
app.get("/production/alternatives", Production.getALternatives);


/* Articles  Functionallity  POST,PUT,GET,DELETE,UPDATE */
app.get('/article/types/list',Articles.getArticleType);
app.get('/article/list',Articles.getList);
app.get('/articles/info/basic/:ident',Articles.getArticleInfo);
app.get('/articles/info/second/:id',Articles.getArticleSecondInformation);
app.delete('/articles/delete/:id',Articles.deleteArticle);

/* Upload Data functions  FOR File Manager  */
app.get('/upload/articles/basics',Upload.getArticlesFilesBasics);
app.get('/update/articles/basics',Upload.updateExsitingData);
app.get('/upload/articles/second/information',Upload.getArticleSecondInformation);
app.post('/upload/users',upload.single('partners'),Upload.uploadUsers);
app.get("/upload/get/files",Upload.getUploadedFiles);
app.post('/upload/new/user', Upload.importDataANDUserInformation);
app.post('/upload/exchange/rates', Upload.ExchangeRates);
app.post('/upload/open/mode', Upload.OpenMode);

// FILE Manager Controller POST,PUT,GET,DELETE, UPDATE 
app.get('/filemanager/get/folder/object/:title',Folder.getFolderByTitle);
app.get('/filemanager/get/folders', Folder.getFolders);
app.get('/filemanager/get/folders/items/:id', Folder.getFolderItems);
app.post('/filemanager/create/new/folder', upload.array('folder_items'),Folder.createFolder);




export default router;


app.listen(PORT, function () { return console.log(` VPRO Application woring on PORT: ${PORT} `); });

