import { Entity, PrimaryGeneratedColumn, JoinColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class CostCities {


    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn({name: "fk_leader_id"})
    user: User;

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
    stm: string;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    status: string;

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
    point: string;

    @Column({
        default: null,
        type: "boolean",
        collation: "utf8_slovenian_ci",
    })
    active: boolean;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    above_stm: string;



    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        collation: "utf8_slovenian_ci"
    })
    created_at:  string;
}