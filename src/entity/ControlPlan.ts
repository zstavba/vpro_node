import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import { User } from "./User";
import { Sectors } from "./Sectors";

@Entity()
export class ControlPlan {

    @PrimaryGeneratedColumn()
    id: number;  

    @ManyToOne(type => Sectors, { nullable: true })
    @JoinColumn({name: "fk_sector_id"})
    sector: Sectors;

    @ManyToOne(type => User)
    @JoinColumn({ name: "fk_user_id" })
    user: User;

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
    description: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    type: string;


    @Column({
        type: "boolean",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    active: boolean;
}