import * as fs from 'fs'
import * as multer from 'multer';

import { readFile } from 'fs/promises'
import { Folder } from '../entity/Folder'
import { FolderItem } from '../entity/FolderItem'
import { AppDataSource } from '../data-source'
import FolderFun from '../functions/FolderFunc';
//import { outputFile, outputFileSync } from 'fs-extra/esm'



class FileManagerController {
    
    getFolderByTitle = async (req:any, res:any, next: any) => {
        try {
            let FolderObject = await AppDataSource.manager.findBy(Folder,{
                title: req.params.title
            });

            return res.status(200).json(FolderObject[0]);

        } catch (error) {
            return res.status(401).json({
                message: error.message
            });
        }
    }
    
    getFolders = async (req:any, res:any, next: any) => {
        try {
            let ListFolders = await AppDataSource.manager.find(Folder); 

            return res.status(200).json(ListFolders);

        } catch (error) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    getFolderItems = async (req:any, res:any, next: any) => {
        try {
            let FolderItemsList = await AppDataSource.getRepository(FolderItem)
                                                     .createQueryBuilder('FolderItem')
                                                     .leftJoinAndSelect('FolderItem.fk_folder_id','Folder')
                                                     .where({
                                                        fk_folder_id: req.params.id
                                                     })
                                                     .getMany();

            return res.status(200).json(FolderItemsList);
        } catch (error)  {
            return res.status(401).json({
                message: error.message
            })
        }
    }
   
    createFolder = async (req:any, res:any, next: any) => {
        try{
 

            let data = req.body; // geting data for folder
            let files = req.files // geting data for folder items; 
            let path = `${__dirname}/../assets/filemanager/${data.title}`;
            let FOLDER: FolderFun = new FolderFun();

            if(fs.existsSync(path)){
                let saveData = await FOLDER.createFolder(data);
                await FOLDER.createFolderItem(saveData,files,path);
            }

            fs.mkdir(path, {recursive: true}, (error:any) => {
                if(error) throw new Error(`Napaka: ${error}`);
            })

            let saveFolderItem = await FOLDER.createFolder(data);
            await FOLDER.createFolderItem(saveFolderItem,files,path);


            return res.status(200).json({
                message: `Nova mapa pod imenom: ${data.title} je bila uspešno ustvarjena !`
            });
        } catch(error) {
            return res.status(401).json({
                message: error.message
            })
        }
    }

    deleteFolder = async (req:any, res:any, next: any) => {
        
    }

    updateFolder = async (req:any, res:any, next: any) => {
        
    }


}

export default FileManagerController;