import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"


@Entity()
export class Banks{
    @PrimaryGeneratedColumn()
    id: number; 

    @Column()
    nsl_type: string; 

    @Column()
    nsl_id: string; 

    @Column()
    name: string; 

    @Column()
    adresss: string;  

    @Column()
    status: string; 

    @Column()
    key: string;  

    @Column()
    bank_sif: string;

    @Column()
    refrence: string;  

    @Column()
    user_type: string; 

    @Column()
    currency: string; 

    @Column()
    swift: string;







}