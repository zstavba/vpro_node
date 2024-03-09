import * as fs from 'fs'
import * as multer from 'multer';

import { readFile } from 'fs/promises'
import { Folder } from '../entity/Folder'
import { FolderItem } from '../entity/FolderItem'
import { AppDataSource } from '../data-source'
import FolderFun from '../functions/FolderFunc';
import { rejects } from 'assert';
//import { outputFile, outputFileSync } from 'fs-extra/esm'
enum FolderType {
    MERITVE = 'meritve',
    TEHNOLOGIJA = 'tehnologija',
    KONTROLNI_PLAN = 'kontrolni plan',
    NAPAKE = 'vdrževalci napake',
    DEFAULT = 'null',
}



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
   
            let folderList = []
            const getFolders = await AppDataSource.getRepository(Folder)
                                                  .createQueryBuilder("folder")
                                                  .where("folder.id = :id OR folder.fk_parent_folder_id = :id", {
                                                    id: req.params.id
                                                  })
                                                  .getMany();
         
            const foldersList =  await Promise.all(
                getFolders.map( async (folder: Folder) => {
                    const items = await AppDataSource.manager.findBy(FolderItem, {
                        fk_folder_id: folder,
                    }); 
                            
                    return {
                        ...folder,
                        folder_items: items
                    };
                    
                })    
            );                                  
                                                      
            return res.status(200).json(foldersList);
        } catch (error)  {
            return res.status(401).json({
                message: error.message
            })
        }
    }

    getItemsByUser = async (req:any, res:any, net:any) => {
        try {
            let items = await AppDataSource.getRepository(FolderItem)
                                           .createQueryBuilder('FolderItem')
                                           .leftJoinAndSelect('FolderItem.fk_folder_id',"Folder")
                                           .where("Folder.fk_user_id = :id", {
                                                id: req.params.id
                                           })
                                           .take(5)
                                           .getMany();

            return res.status(200).json(items);                         
        } catch(error: any) {
            return res.status(401).json({
                message: error.message
            })
        }
    }

    deleteFolderItem = async (req:any, res:any, next: any) => {
        try {
            let dirName: string = process.cwd();

            let findItem = await AppDataSource.getRepository(FolderItem)
                                              .createQueryBuilder('FolderItem')
                                              .leftJoinAndSelect('FolderItem.fk_folder_id','Folder')
                                              .where({
                                                id: req.params.id
                                              })
                                              .getOne();

            if(!findItem)
                throw new Error(`Datoteka z IDjem: ${req.params.id} ni bila najdena !`)

            let fullPath: string = `${dirName}/src${findItem.path}/${findItem.title}`;

            await AppDataSource.manager.delete(FolderItem, {
                id: req.params.id
            });
           
            let errorMessage: string = `Datoteka pod imenom: ${findItem.title} je bila uspešno izbrisana.`;
            return res.status(200).json({
                message: errorMessage
            })

        } catch(error) {
            return res.status(400).json({
                message: error
            })
        }
    }


    createFolder = async (req:any, res:any, next: any) => {
        try{
 

            let data = req.body; // geting data for folder
            let files = req.files // geting data for folder items; 
            let path = `${process.cwd()}/src/assets/filemanager/${data.title}`;
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

    uploadNewFolderItems = async (req:any, res:any, next: any) => {
        try {
            const folderFiles = req.files;
            const folderID = req.body.folder_id;
            let FOLDER: FolderFun  = new FolderFun();

            let findFolder = await AppDataSource.manager.findBy(Folder, {
                id: folderID
            });
            
            if(!findFolder)
                throw new Error(`Napaka: Datoteka pod imenom: ${findFolder[0].title} ni bila najdena, preden želite nložiti datoteko v mapo, jo prej ustvarite ! `)

            let path: string = `${process.cwd()}/src/assets/filemanager/${findFolder[0].title}`    
            console.log(path);
            await FOLDER.createFolderItem(findFolder[0],folderFiles,path);
            

            return res.status(200).json({
                message: "Datoteke so bile supešno sharnjene !"
            })

        } catch (error) {
            return res.status(401).json({
                message: error.message
            })
        }
    }

    createSubFolder = async (req:any, res:any, next: any) => {
        try {
            let userID: number  = req.body.user_id;
            let folderID: number = req.body.folder_id;
            let folderTITLE: string = req.body.folder_name;
            
            let findFolder = await AppDataSource.manager.findBy(Folder,{
                id: folderID
            });

            if(!findFolder)
                throw new Error(`Napaka: datoteka z IDjem: ${folderID} ni bila najdena !`);

            let FolderItem: Folder = new Folder();
            FolderItem.title = folderTITLE;
            FolderItem.type = FolderType.DEFAULT;
            FolderItem.has_children = true;
            FolderItem.parent_folder = findFolder[0];


            await AppDataSource.manager.save(FolderItem);


            return res.status(200).json({
                message: "OK"
            });
        } catch(error) {
            return res.status(401).json({
                message: error.message
            });
        }
    }

    deleteFolder = async (req:any, res:any, next: any) => {
        
    }

    updateFolder = async (req:any, res:any, next: any) => {
        
    }


}

export default FileManagerController;