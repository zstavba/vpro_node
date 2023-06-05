import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne } from "typeorm"
import { User } from "./User";
import { CustomTariffs } from "./CustomsTariffs";
import { Counrty } from "./Country";
import { Warehouses } from "./Warehouses";
import { DDVType } from "./DdvTypes";
import { GroupType } from "./GroupType";
import { json } from "body-parser";

@Entity()
export class ArticleOrderMarketing {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn({name: "fk_supplier_id"})
    supplier: User;

    @ManyToOne(type => User)
    @JoinColumn({name: "fk_manufacturer_id"})
    manufacturer: User;

    @ManyToOne(type => Counrty)
    @JoinColumn({ name: "fk_country_id" })
    country: Counrty;

    @ManyToOne(type => Warehouses)
    @JoinColumn({ name: "fk_warehouse_id" })
    warehouse: Warehouses;

    @ManyToOne(type => DDVType)
    @JoinColumn({ name: "fk_tax_id" })
    tax: DDVType;

    @ManyToOne(type => GroupType)
    @JoinColumn({ name: "fk_group_1_id" })
    group1: GroupType;

    @ManyToOne(type => GroupType)
    @JoinColumn({ name: "fk_group_2_id" })
    group2: GroupType;

    @ManyToOne(type => GroupType)
    @JoinColumn({ name: "fk_group_3_id" })
    group3: GroupType;

    @ManyToOne(type => GroupType)
    @JoinColumn({ name: "fk_group_4_id" })
    group4: GroupType;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    EAN: string; 

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
    color: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    decimal_places: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    packing: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    kala: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    margin: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    production_days: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    image: string; 

    @Column({
        type: "json",
        nullable: true
    })
    warehouses_list: Warehouses[];

    @Column({
        type: "json",
        nullable: true
    })
    partners_list: User[];
}