import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class Sectors  {
    @PrimaryGeneratedColumn()
    id: number; 

    @Column({ type: "text", collation: "utf8_slovenian_ci" })
    id_type: string; 

    @Column({ type: "text", collation: "utf8_slovenian_ci" })
    name: string; 

    @Column({ type: "text", collation: "utf8_slovenian_ci" })
    status: string; 

    @Column({ type: "boolean", default: 1 })
    active: boolean; 

    @Column({ type: "text", collation: "utf8_slovenian_ci" })
    description: string; 

    @Column({ type: "text", collation: "utf8_slovenian_ci" })
    attribute: string; 


}