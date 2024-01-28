import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import { User } from "./User";
import { Counrty } from "./Country";
import { ZipCode } from "./ZipCode";

export enum UserType {
    admin =  "admin",
    partner = "partner",
    worker = "worker",
    guest =  "guest",
    spenders = "spenders",
    suppliers = 'suppliers',
    manufacturer = 'manufacturer'
};

@Entity()
export class UserInformation {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type =>  User)
    @JoinColumn({name: "fk_user_id"})
    user: User;

    @ManyToOne(type => Counrty, {nullable: true})
    @JoinColumn({name: "fk_country_id"})
    country: Counrty;

    @ManyToOne(type => ZipCode, {nullable: true})
    @JoinColumn({ name: "fk_zip_code_id"})
    zip_code: ZipCode

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })    
    emsho: string

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })    
    tax_number: string
    
    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })    
    phone_number: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })    
    adress: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })    
    profile_image: string;

    @Column({
        type: "enum",
        enum: UserType,
        default: UserType.guest
    })
    user_type: string;

}