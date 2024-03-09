import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne } from "typeorm"
import { User } from "./User";
import { Languages } from "./Languages";

enum DebitNoteType {
    BK = 'BK',
    Fk = 'FK',
    DEFAULT = null
}

@Entity()
export class DebitNote {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "fk_user_id" })
    @Column({ default: 1  })
    fk_user_id: User;
    
    @ManyToOne(() => Languages)
    @JoinColumn({ name: 'fk_language_id' })
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
    document_type: string;


    @Column({
        default: DebitNoteType.DEFAULT,
        type: "enum",
        enum: DebitNoteType,
    })
    type: DebitNoteType;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    summary: string;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    status: string;


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
    date_from: Date;

    @Column({
        type: "date",
        collation: "utf8_slovenian_ci",
        default: null
    })
    date_to: Date;

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