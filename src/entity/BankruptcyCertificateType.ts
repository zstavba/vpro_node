/* BankruptcyCertificateType.  */

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class BankruptcyCertificateType {

    @PrimaryGeneratedColumn()
    id: number; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    currency: string; 


    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    type: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    created_at: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    unit: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    course: string; 

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
    rogue_currency: string; 

    
}