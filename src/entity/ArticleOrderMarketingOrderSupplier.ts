import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne, CreateDateColumn } from "typeorm"
import { User } from "./User";
import { CustomTariffs } from "./CustomsTariffs";
import { Counrty } from "./Country";
import { Warehouses } from "./Warehouses";
import { DDVType } from "./DdvTypes";
import { GroupType } from "./GroupType";
import { json } from "body-parser";
import { Currencies } from "./Currencies";

@Entity()
export class ArticleOrderMarketingOrderSupplier {

    @PrimaryGeneratedColumn()
    id: number; 


    @ManyToOne(type => User)
    @JoinColumn({ name: "fk_supplier_id" })
    supplier: User;

    @ManyToOne(type => User)
    @JoinColumn({ name: "fk_operator_id" })
    operator: User;


    @ManyToOne(type => Currencies)
    @JoinColumn({ name: "fk_currencies_id" })
    currencies: Currencies;

    @Column({
        type: "datetime",
        default: null
    })
    delivery_time: Date;

    @Column({
        type: "datetime",
        default: null
    })
    day_of_inquiry: Date;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    NC: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    FC: string; 


    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    dev_FC: string;
    
    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    rabat: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    s_rabat: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    cost_percentage: string; 


    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    demand: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    calculation: string; 

    @CreateDateColumn()
    created_at: Date;  


   @Column({
        type: "boolean",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    ask_for_demand: boolean; 


    @Column({
        type: "boolean",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    active: boolean; 




}