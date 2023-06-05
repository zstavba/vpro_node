import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User";



@Entity()
export class Classification {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    classification_id: number;

    @ManyToOne(name => User)
    @JoinColumn({ name: "user_id" })
    user_id: number;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    title: string; 


    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    status: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    network: string; 

    @Column({
        type: "boolean",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    active: boolean; 



}