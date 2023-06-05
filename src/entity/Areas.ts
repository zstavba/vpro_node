import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class Areas {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    area: string;
    
    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })

    description: string;  

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    superiors: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    municipality: string; 

    @Column({
        type: "boolean",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    active: boolean; 

}