import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne } from "typeorm"
import { User } from "./User";
import { CustomTariffs } from "./CustomsTariffs";
import { Counrty } from "./Country";
import { Warehouses } from "./Warehouses";
import { DDVType } from "./DdvTypes";
import { GroupType } from "./GroupType";
import { json } from "body-parser";
import { ArticleOrderMarketingOrderSupplier } from "./ArticleOrderMarketingOrderSupplier";

@Entity()
export class ArticleOrderMarketingOrder {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })

    stock_minimum: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })

    stock_block: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })

    signal_stock: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })

    optimal_stock: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    procurement_costs_per_unit: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    optimal_order_quantity: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    storage_cost: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    average_stock_value: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    quarantine: string; 


    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    estimated_amount_of_procurement_per_year: string; 


    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    abc_class: string; 


    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    block_price: string; 

    @Column({
        type: "boolean",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    no_charge_credit: boolean; 

    @Column({
        type: "json",
        nullable: true
    })
    suppliers_list: ArticleOrderMarketingOrderSupplier[]

}