import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne } from "typeorm"
import { User } from "./User";

@Entity()
export class DDVType {

    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToOne(name => User)
    @JoinColumn({name: "fk_user_id"})
    @Column({
        default: 1
    })
    fk_user_id: User;

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null
    })
    ddv_type: string;

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
    degree: string;

}