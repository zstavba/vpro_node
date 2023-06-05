import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class DDVType {

    @PrimaryGeneratedColumn()
    id: number; 

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null
    })
    ddv_type: string;

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null
    })
    name: string;

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null
    })
    degree: string;

}