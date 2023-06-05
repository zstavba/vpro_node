import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import { User } from "./User";
import { WarehouseUnits } from "./WarehouseUnits";

@Entity()
export class Warehouses {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type =>  User)
    @JoinColumn({name: "fk_user_id"})
    user_id: User;

    @Column({
        type: "text",
        default: null,
        charset: 'utf8mb4', 
        collation: 'utf8mb4_slovenian_ci'
    })
    title: string;

    @Column({
        type: "text",
        default: null,
        charset: 'utf8mb4', 
        collation: 'utf8mb4_slovenian_ci'
    })
    status: string;


    @Column({
        type: "text",
        default: null,
        charset: 'utf8mb4', 
        collation: 'utf8mb4_slovenian_ci'
    })
    movement: string;

    @Column({
        type: "text",
        default: null,
        charset: 'utf8mb4', 
        collation: 'utf8mb4_slovenian_ci'
    })
    transfer: string;

    @ManyToOne(type =>  WarehouseUnits, {nullable: true})
    @JoinColumn({
        name: "fk_unit_id"
    })
    unit: WarehouseUnits;


    @Column({
        default: null,
    })
    active: boolean;

    @Column({
        type: "timestamp",
        default: () => 'CURRENT_TIMESTAMP',
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