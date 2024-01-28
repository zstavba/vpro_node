import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User";
import { Currency } from "./Currency";
import { Currencies } from "./Currencies";

enum ExchangeRateType  {
    ONE = '001',
    TWO = '002',
    THREE = '003',
    FOUR = '004',
}


@Entity()
export class ExchangeRate {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Currencies)
    @JoinColumn({ name: "fk_currency_od" })
    @Column({ default: 1  })
    fk_currency_od: Currencies;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    status: string;

    @Column({
        type: "enum",
        enum: ExchangeRateType,
    })
    type: string;

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    course: string;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    unit: string;


    @Column({
        default: 0,
        type: "boolean",
        collation: "utf8_slovenian_ci",
    })
    active: boolean;

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