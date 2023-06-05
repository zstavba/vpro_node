import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import { User } from "./User";

export enum UserType {
    admin =  "admin",
    partner = "partner",
    worker = "worker",
    guest =  "guest",
    spenders = "spenders"
};

@Entity()
export class UserInformation {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type =>  User)
    @JoinColumn({name: "user_id"})
    user_id: User;

    @Column({ default: null })
    area: string; 

    @Column()
    phone_number: string;

    @Column()
    phone_fax: string;

    @Column({ default: null })
    phone_mobile_number: string;

    @Column()
    adress: string;

    @Column()
    country: string;

    @Column()
    profile_image: string;

    @Column({
        type: "enum",
        enum: UserType,
        default: UserType.guest
    })
    user_type: string;

}