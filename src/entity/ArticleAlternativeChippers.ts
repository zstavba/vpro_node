import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne } from "typeorm"
import { User } from "./User";
import { CustomTariffs } from "./CustomsTariffs";
import { Counrty } from "./Country";
import { MeasurementUnits } from "./MeasurementUnits";
import { DDVType } from "./DdvTypes";
import { ArticleType } from "./ArticleType";
import { Classification } from "./Classifications";
import { GroupType } from "./GroupType";
import { Languages } from "./Languages";
import { ArticleBaics } from "./ArticleBasics";

@Entity()
export class ArticleAlternativeChippers {

    @PrimaryGeneratedColumn()
    id: number; 

    @Column({
        type: "json",
        nullable: true
    })
    languages_list: Languages[]

    @Column({
        type: "json",
        nullable: true
    })
    partners_list: User[]

    @Column({
        type: "json",
        nullable: true
    })
    article_replacement: ArticleBaics[]
}