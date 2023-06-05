import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Flis {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ident: string

    @Column()
    name: string

    @Column()
    width: string

    @Column()
    grammage: string

    @Column()
    ts: string

    @Column()
    em: string

    @Column()
    minimum_stock: string

    @Column()
    clasification: string

    @Column()
    type: string

}