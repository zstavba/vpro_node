import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne } from "typeorm"
import { User } from "./User";
import { CustomTariffs } from "./CustomsTariffs";
import { Counrty } from "./Country";

@Entity()
export class ArticleOrderBasics {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => CustomTariffs)
    @JoinColumn({name: "fk_cs_id"})
    custom: CustomTariffs

    @ManyToOne(type => Counrty)
    @JoinColumn({name: "fk_country_id"})
    country: Counrty

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
    title: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    net_mas: string;


    @Column({
        type: "boolean",
        default: 1,
        collation: "utf8_slovenian_ci"
    })
    active: boolean;

    @Column({
        type: "boolean",
        default: 1,
        collation: "utf8_slovenian_ci"
    })
    intrastat: boolean;


}