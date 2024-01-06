import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import { User } from "./User";
import { WarehouseUnits } from "./WarehouseUnits";


export enum CategoryFormat  {
    Defaults = "defaults",
    Commercial = "commercial",
    Production = "production"
}

@Entity()
export class WarehouseCategories {

    @PrimaryGeneratedColumn()
    id: number;

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
    subtitle: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    icon: string;


    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    link: string;
    
    @Column({
        type: 'enum',
        enum: CategoryFormat,
        default: CategoryFormat.Defaults
      })
      type: CategoryFormat


    @Column({
        type: "boolean",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    active: boolean;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        collation: "utf8_slovenian_ci"
    })
    created_at:  string;

}