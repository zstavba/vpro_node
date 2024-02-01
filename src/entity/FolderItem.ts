import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, ManyToMany } from "typeorm"
import { User } from "./User";
import { Folder } from "./Folder";




@Entity()
export class FolderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Folder)
    @JoinColumn({ name: "fk_folder_id" })
    fk_folder_id: Folder;

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null  
    })
    title: string; 
    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null  
    })
    type: string; 

    @Column({
        type: "float",
        collation: "utf8_slovenian_ci",
        default: null  
    })
    size: number;     

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null  
    })
    path: string; 

}