import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import { User } from "./User";
import { Warehouses } from "./Warehouses";
import { CostCities } from "./CostCities";
import { WarehouseUnits } from "./WarehouseUnits";

@Entity()
export class OrganizationalUnits {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null
    })
    title: string; 

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null
    })
    status: string; 

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null
    })
    type: string; 

    @Column({
        type: "boolean",
        collation: "utf8_slovenian_ci",
        default: null
    })
    active: boolean; 

    @Column({
        type: "boolean",
        collation: "utf8_slovenian_ci",
        default: null
    })
    point: boolean; 

    @ManyToOne(type => WarehouseUnits)
    @JoinColumn({name: "fk_unit_id"})
    units: WarehouseUnits

    @ManyToOne(type => User)
    @JoinColumn({ name: "fk_user_id" })
    user: User;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        collation: "utf8_slovenian_ci"
    })
    created_at:  string;

}