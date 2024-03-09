import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Article {

    @PrimaryGeneratedColumn()
    id: number; 

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
    name: string; 

    @Column({
        type: "boolean",
        default: 0,
        collation: "utf8_slovenian_ci"
    })
    active: boolean; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    standart: string; 

    @Column({
        type: "boolean",
        default: 0,
        collation: "utf8_slovenian_ci"
    })
    tracabillity: boolean; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    description: string; 

    @Column({
        type: "date",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    delivery: Date; 

}