import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, UpdateDateColumn, CreateDateColumn} from "typeorm"
import { DDVType } from "./DdvTypes";
import { GroupType } from "./GroupType";
import { MeasurementUnits } from "./MeasurementUnits";
import { PriceType } from "./PriceType";
import { User } from "./User";

@Entity()
export class Counrty {

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
    name_ang: string;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    type: string;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    code: string;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    customs: string;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    eco_group: string;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    contignent: string;


    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    origin: string;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    status: string;

    @Column({
        default: null,
        type: "boolean",
        collation: "utf8_slovenian_ci",
    })
    active: boolean;

}