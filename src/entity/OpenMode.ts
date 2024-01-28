import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User";

@Entity()
export class OpenMode {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    title: string;

    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    status: string;
    
    @Column({
        default: null,
        type: "text",
        collation: "utf8_slovenian_ci",
    })
    attribute: string;
    

    @Column({
        default: 0,
        type: "boolean",
        collation: "utf8_slovenian_ci",
    })
    active: boolean;

}