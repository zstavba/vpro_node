import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import { User } from "./User";
import { Warehouses } from "./Warehouses";

@Entity()
export class WarehouseLocations {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn({name: "fk_user_id"})
    
    user: User

    @ManyToOne(type => Warehouses)
    @JoinColumn({name: "fk_warehouse_id"})
    warehouses: Warehouses


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
    width: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    height: string;

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
    status: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    priority: string;


    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    stock: string;

    @Column({
        default: null,
    })
    active: boolean;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        collation: "utf8_slovenian_ci"
    })
    updated_at:  string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        collation: "utf8_slovenian_ci"
    })
    created_at:  string;



}