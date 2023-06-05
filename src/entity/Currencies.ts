import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class Currencies {

    @PrimaryGeneratedColumn()
    id: number; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    id_type: string;


    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    name: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    country: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    code: string;

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
    active: string;
}
