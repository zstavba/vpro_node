import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User";
import { MeasurementUnits } from "./MeasurementUnits";

@Entity()
export class AlternativeCiphers {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    a_id: string;


    @ManyToOne(type => MeasurementUnits)
    @JoinColumn({ name: "fk_em_id" })
    em: MeasurementUnits;


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
    title: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    quantity: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    alt_status: string;


    @Column({
        type: "boolean",
        default: 1,
        collation: "utf8_slovenian_ci"
    })
    active: boolean;

}