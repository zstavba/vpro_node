import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm"
import { Languages } from "./Languages";
import { User } from "./User";
import { MeasurementUnits } from "./MeasurementUnits";
import { MessageChannel } from "worker_threads";
import { DDVType } from "./DdvTypes";

enum WorkOrderType {
    NK = "NK", // Naročila Kupcev, Medskladiščno in konsignacije
    NE = "NE", // Nalogi za vračilo MP,
    ND = "ND", // Nalogi za odpremo | Naročilo Dobaviteljem (Skladišče),
    NM = "NM", // Nalog za medskladiščnico,
    DK = "DK", // Dobavnica konsignacije,
    MP = "MP", // Medskladiščnica,
    BD = "BD", // Bremepis dobavitelja,
    CD = "CD", // Cenik Dobavitelja,
    NI = "NI", // Interno naročilo
    NR = "NR", // Nalogi za vračilo, Vračilo - Bremepis (Skladiščno)
    PD = "PD", // Povpraševanje dobavitelja,
    CE = "CE", // Sprememba Cen,
    NV = "NV", // Nalog za odpremo,
    KA = "KA", // Prevzem blaga,
    PL = "PL", // Skladiščni list,
    DEFAULT = null
}

@Entity()
export class WorkOrder {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "fk_user_id" })
    @Column({ default: 1  })
    fk_user_id: User;

    @ManyToOne(() => Languages)
    @JoinColumn({ name: 'fk_language_id' })
    @Column({ default: null })
    fk_language_id: Languages;

    @ManyToOne(() => MeasurementUnits)
    @JoinColumn({ name: "fk_em_id" })
    fk_em_id: MeasurementUnits;

    @ManyToOne(() => DDVType)
    @JoinColumn({name: "fk_tax_id"})
    fk_tax_id: DDVType;

    @Column({
        type: "enum",
        enum: WorkOrderType,
    })
    type: WorkOrderType;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    title: string;


    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    document_id: string;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    position: string;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    level: string;

    @Column({
        default: 0,
        type: "boolean",
        collation: "utf8_slovenian_ci",
    })
    closed: boolean;

    @Column({
        default: 0,
        type: "boolean",
        collation: "utf8_slovenian_ci",
    })
    confirmed: boolean;

    @Column({
        type: "date",
        collation: "utf8_slovenian_ci",
        default: null
    })
    updated_at: Date;

    @Column({
        type: "date",
        collation: "utf8_slovenian_ci",
        default: null
    })
    created_at: Date;

}