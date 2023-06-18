import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne } from "typeorm"
import { User } from "./User";
import { CustomTariffs } from "./CustomsTariffs";
import { Counrty } from "./Country";
import { MeasurementUnits } from "./MeasurementUnits";
import { DDVType } from "./DdvTypes";
import { ArticleType } from "./ArticleType";
import { Classification } from "./Classifications";
import { GroupType } from "./GroupType";
import { Warehouses } from "./Warehouses";
import { WarehouseLocations } from "./WarehouseLocations";
import { join } from "path";

@Entity()
export class ArticleSecondInformation {

    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToOne(type => Warehouses)
    @JoinColumn({ name: "fk_warehouse_id" })
    warehouse: Warehouses;

    @ManyToOne(type => WarehouseLocations)
    @JoinColumn({ name: "fk_location_id" })
    location: WarehouseLocations;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    net_mass: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    gross_weight: string; 
    
    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    length: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    width: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    thickness: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    volume: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    standart: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    quality: string; 

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
    input_method: string; 

    @Column({
        type: "boolean",
        default: 0,
    })
    inspection: boolean;

    @Column({
        type: "boolean",
        default: 0,
    })
    with_price: boolean;

    @Column({
        type: "text",
        default: null,
    })
    float_numbers: number


    @Column({
        type: "date",
        default: null,
    })
    best_before: string; 

    @Column({
        type: "date",
        default: null,
    })
    production_date_start: string; 

    @Column({
        type: "date",
        default: null,
    })
    production_date_end: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    capacity: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    declaration: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    profile_image: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    website_link: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    description: string;
                
}