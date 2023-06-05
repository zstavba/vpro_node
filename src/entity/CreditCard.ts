import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./User";

@Entity()
export class CreditCard {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(name => User)
    @JoinColumn({ name: "fk_user_id" })
    user_id: number;

    @Column()
    trr: string;

    @Column()
    registration_number: string; 

    @Column()
    tax_number: string; 

    @Column()
    emsho: string; 

    @Column()
    obligee: string;

    @Column()
    tax_type: string; 

    @Column()
    sektor: string;

    @Column()
    identification_number: string; 
    
}