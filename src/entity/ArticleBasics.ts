import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne } from "typeorm"
import { User } from "./User";
import { CustomTariffs } from "./CustomsTariffs";
import { Counrty } from "./Country";
import { MeasurementUnits } from "./MeasurementUnits";
import { DDVType } from "./DdvTypes";
import { ArticleType } from "./ArticleType";
import { Classification } from "./Classifications";
import { GroupType } from "./GroupType";

@Entity()
export class ArticleBaics {

    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToOne(type => User)
    @JoinColumn({ name: "fk_supplier_id" })
    supplier: User;

    @ManyToOne(type => User)
    @JoinColumn({ name: "fk_manufacturer_id" })
    manufacturer: User;

    @ManyToOne(type => Counrty)
    @JoinColumn({ name: "fk_country_id" })
    country: Counrty;

    @ManyToOne(type => MeasurementUnits)
    @JoinColumn({ name: "fk_mu_id" })
    mu: MeasurementUnits;

    @ManyToOne(type => DDVType)
    @JoinColumn({ name: "fk_tax_id" })
    tax: DDVType;

    @ManyToOne(type => CustomTariffs)
    @JoinColumn({ name: "fk_ct_id" })
    tariffs: CustomTariffs;

    @ManyToOne(type => ArticleType)
    @JoinColumn({ name: "fk_article_type_id" })
    article_type: ArticleType;
    
    @ManyToOne(type => Classification)
    @JoinColumn({ name: "fk_classification_id" })
    classification: Classification;

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
    title: string;

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
    ean: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    packaging_type: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    traceability: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    stock: string;

    @Column({
        type: "boolean",
        default: null,
    })
    hidden: boolean;

    @Column({
        type: "boolean",
        default: null,
    })
    intrasant: boolean;
    
    @Column({
        type: "boolean",
        default: null,
    })
    pallet: boolean;

    @Column({
        type: "boolean",
        default: null,
    })
    a_crate: boolean;


}