import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User";

@Entity()
export class MeasurementUnits {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn({name: 'fk_user_id'})
    fk_user_id: User;

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null
    })
    name: string; 

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null
    })
    em_ul: string; 

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null
    })
    active: string; 

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null
    })
    idg: string; 





}