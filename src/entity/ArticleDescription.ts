import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ArticleDescription {

    @PrimaryGeneratedColumn()
    id: number; 

    @Column({
        type: "varchar",
        length: 255,
        default: null,
        collation: "utf8_slovenian_ci"
    })
    net_mas: number; 

    @Column({
        type: "varchar",
        length: 255,
        default: null,
        collation: "utf8_slovenian_ci"
    })
    gross_mas: number; 

    @Column({
        type: "varchar",
        length: 255,
        default: null,
        collation: "utf8_slovenian_ci"
    })
    material_stock: number; 

    @Column({
        type: "varchar",
        length: 255,
        default: null,
        collation: "utf8_slovenian_ci"
    })
    warehouse_stock: number; 

    @Column({
        type: "varchar",
        length: 255,
        default: null,
        collation: "utf8_slovenian_ci"
    })
    index_stock: number;

    @Column({
        type: "varchar",
        length: 255,
        default: null,
        collation: "utf8_slovenian_ci"
    })
    free_stock: number; 

    @Column({
        type: "varchar",
        length: 255,
        default: null,
        collation: "utf8_slovenian_ci"
    })
    nc: number; 

    @Column({
        type: "varchar",
        length: 255,
        default: null,
        collation: "utf8_slovenian_ci"
    })
    pc: number; 

    @Column({
        type: "varchar",
        length: 255,
        default: null,
        collation: "utf8_slovenian_ci"
    })
    mpc: number; 

}
