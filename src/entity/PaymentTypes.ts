import { ExecOptionsWithStringEncoding } from "child_process";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User";

@Entity()
export class PaymentTypes {

    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToOne(type => User)
    @JoinColumn({ name: "fk_user_id" })
    @Column({ default: 1 })
    fk_user_id: User; 

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null
    })
    name: string; 

}