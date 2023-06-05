import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, JoinTable } from "typeorm"
import { User } from "./User";

@Entity()
export class GroupType {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "fk_user_id" })
    @Column({ default: 1  })
    fk_user_id: User;

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null
    })
    type: string;

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
    active: string;

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null  
    })
    status: string; 

    @Column({
        type: "text",
        collation: "utf8_slovenian_ci",
        default: null  
    })
    idg: string
    
}