import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User";
import { MeasurementUnits } from "./MeasurementUnits";

@Entity()
export class CustomTariffs {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => MeasurementUnits, {nullable : true})
    @JoinColumn({ name: "fk_em_id"})
    em: MeasurementUnits;

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
    stage: string;

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null
    })
    class: string;

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null
    })
    type: string;


    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null
    })
    position: string;

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null
    })
    consigment: string;
    

    @Column({
        type: "boolean",
        collation: "utf8_slovenian_ci",
        default: 1
    })
    active: boolean;

    @Column({
        type: "date",
        collation: "utf8_slovenian_ci",
        default: null
    })
    active_from: Date;

    @Column({
        type: "date",
        collation: "utf8_slovenian_ci",
        default: null
    })
    active_to: Date;




}