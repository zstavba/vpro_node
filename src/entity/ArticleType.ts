import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User";

@Entity()
export class ArticleType {

    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToOne(type => User)
    @JoinColumn({name: 'fk_user_id'})
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
    type: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    group_name: string; 

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    konto: string; 

    @Column({
        type: "boolean",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    active: boolean;



}