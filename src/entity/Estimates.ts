import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User";
import { Languages } from "./Languages";

enum EstimatesType {
    BK = 'BK',
    Fk = 'FK',
    ND = 'ND',
    NK = 'NK',
    PO = 'PO',
    PR = 'PR',
    DEFAULT = null
}

@Entity()
export class Estimates {

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

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    idg: string;

    @Column({
        type: "enum",
        enum: EstimatesType,
    })
    type: EstimatesType;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    document_type: string;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    description: string;

    @Column({
        default: 0,
        type: "boolean",
        collation: "utf8_slovenian_ci",
    })
    active:boolean;

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