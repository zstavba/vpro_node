import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, UpdateDateColumn, CreateDateColumn} from "typeorm"
import { DDVType } from "./DdvTypes";
import { GroupType } from "./GroupType";
import { MeasurementUnits } from "./MeasurementUnits";
import { PriceType } from "./PriceType";
import { User } from "./User";


@Entity()
export class ZipCode {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    name: string;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    attribute: string;



}