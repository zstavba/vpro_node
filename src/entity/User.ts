import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ default: null })
    username: string

    @Column()
    email: string

    @Column({ default: null })
    password: string

    @Column({ default: null })
    sex: string

    @Column({ default: null })
    age: number


    
}
