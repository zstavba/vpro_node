import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })    
    firstName: string

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })    
    lastName: string

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })    
    username: string

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })    
    email: string

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })    
    password: string

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })    
    sex: string

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })    
    birth_date: Date

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })    
    user_identification: string

    
}
