import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class UpnCodes {

    @PrimaryGeneratedColumn()
    id: number

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
    title: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    status: string;

    @Column({
        type: "boolean",
        default: 0,
        collation: "utf8_slovenian_ci"
    })
    active: boolean;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    description: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    attribute: string;

}