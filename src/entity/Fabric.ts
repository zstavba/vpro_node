import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Fabric {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ident: string

    @Column()
    fabric_type: string

    @Column()
    fabric_name: string

    @Column()
    fabric_width: string

}