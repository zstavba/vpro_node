import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class DeliveryConditions{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: "text"})
    id_type: string;

    @Column({ type: "text"})
    name: string; 

    @Column({ type: "text" })
    status: string; 

    @Column({ type: "text" })
    active: string; 

    @Column({ type: "text"})
    description: string; 

    @Column({ type: "text" })
    attribute: string; 


}