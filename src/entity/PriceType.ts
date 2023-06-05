import { text } from "body-parser";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class PriceType {

    @PrimaryGeneratedColumn()
    id: number; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    type: string;

    @Column({
        type:"text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    name: string;

    @Column({
        type:"text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    status:string; 

    @Column({
        type:"text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    active: string; 

    @Column({
        type:"text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    created_at: string;

    @Column({
        type:"text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    updated_at: string; 

}