import { AppDataSource } from "../data-source";
import { Folder } from "../entity/Folder";
import { FolderItem } from "../entity/FolderItem";

import * as fs from 'fs';

class FolderFun {
    checkIfDirectoryExists = (directory_path: string): boolean => {

        if(!fs.existsSync(directory_path))
            return false;

        return true;
    }

 

    createFolder = async (folder: any): Promise<Folder> => {
        let folder_item: Folder = new Folder();
        folder_item.title = folder.title;
        folder_item.type = folder.type;
        folder_item.has_children = true;
        folder_item.fk_user_id = folder.fk_user_id;

        let saveFolder = await  AppDataSource.manager.save(folder_item);
     
        return saveFolder;
    }

    createFolderItem =  async (folder: Folder, files: any, path: string) => {
        for(let file of files){
            let Item : FolderItem = new FolderItem();
            const fileName = file.path.split('/');

            Item.fk_folder_id = folder;
            Item.path = path; 
            Item.size = file.size;
            Item.title = fileName[8];
            Item.type = file.type;
            
            await AppDataSource.manager.save(Item);

            const sourcePath = file.path;
            const destinationPath = `${path}/${Item.title}`;

            if (fs.existsSync(sourcePath)) {
                fs.rename(sourcePath, destinationPath, (error: any) => {
                    if (error) throw new Error(`Napaka: ${error}`);
                });
            } else {
                console.error(`File not found at path: ${sourcePath}`);
            }
            
        }
    }

}

export default FolderFun;