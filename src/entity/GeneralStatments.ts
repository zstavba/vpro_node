import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User";
import { Languages } from "./Languages";

enum GeneralStatmentsType {
    BK = 'BK',
    Fk = 'FK',
    ND = 'ND',
    NK = 'NK',
    PO = 'PO',
    PR = 'PR',
    XX = "XX", 
    DEFAULT = null
}

@Entity()
export class GeneralStatments {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "fk_user_id" })
    @Column({ default: 1  })
    fk_user_id: User;

    @ManyToOne(() => Languages)
    @JoinColumn({ name: 'fk_language_id' })
    @Column({ default: 7 })
    fk_language_id: Languages;


    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    idg: string;


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
    description: string;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    status: string;

    @Column({
        type: "enum",
        enum: GeneralStatmentsType,
    })
    type: GeneralStatmentsType;

    @Column({
        default: 1,
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
    })
    created_at: Date;



}