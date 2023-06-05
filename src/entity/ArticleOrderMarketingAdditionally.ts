import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToMany, ManyToOne } from "typeorm"
import { User } from "./User";
import { CustomTariffs } from "./CustomsTariffs";
import { Counrty } from "./Country";
import { Warehouses } from "./Warehouses";
import { DDVType } from "./DdvTypes";
import { GroupType } from "./GroupType";
import { json } from "body-parser";

@Entity()
export class ArticleOrderMarketingAdditionally {

    @PrimaryGeneratedColumn()
    id: number;

}