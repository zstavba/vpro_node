import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class Dispatch {

    @PrimaryGeneratedColumn()
    id: number; 

    @Column({type: "text", collation: "utf8_slovenian_ci"})
    name: string;

    @Column({type: "text", collation: "utf8_slovenian_ci"})
    status: string;

    @Column({type: "text", collation: "utf8_slovenian_ci"})
    active: string;
    
    @Column({type: "text", collation: "utf8_slovenian_ci"})
    description: string;

    @Column({type: "text", collation: "utf8_slovenian_ci"})
    attribute: string;
}