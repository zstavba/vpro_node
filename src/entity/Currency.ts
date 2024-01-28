import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User";

enum CurrencyType  {
    ONE = '001',
    TWO = '002',
    THREE = '003',
    FOUR = '004',
    DEFAULT = 0
}


@Entity()
export class Currency {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "fk_user_id" })
    @Column({ default: 1  })
    fk_user_id: User;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    attribute_id: string;



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
    status: string;

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