import { Entity, PrimaryGeneratedColumn, Column , ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";
import { CustomTariffs } from "./CustomsTariffs";
import { ArticleType } from "./ArticleType";
import { Classification } from "./Classifications";
import { Article } from "./Article";
import { Warehouses } from "./Warehouses";
import { Areas } from "./Areas";
import { DDVType } from "./DdvTypes";
import { ArticleDescription } from "./ArticleDescription";

@Entity()
export class ArticleKeys {

    @PrimaryGeneratedColumn()
    id: number; 

    @ManyToOne(() => User, {nullable:true})
    @JoinColumn({name: "fk_user_id"})
    fk_user_id: User;

    @ManyToOne(() => Article, {nullable: true})
    @JoinColumn({ name: "fk_article_id" })
    fk_article_id: Article

    @ManyToOne(() => ArticleDescription, {nullable: true})
    @JoinColumn({ name: "fk_article_description_id" })
    fk_article_description_id: ArticleDescription

    @ManyToOne(() => CustomTariffs, {nullable: true})
    @JoinColumn({name: "fk_custom_tariffs_id"})
    fk_custom_tarrifs_id: CustomTariffs;

    @ManyToOne(() => ArticleType, {nullable: true})
    @JoinColumn({ name: "fk_article_type_id" })
    fk_article_type_id: ArticleType;

    @ManyToOne(() => Classification, { nullable: true })
    @JoinColumn({ name: "fk_classification_id" })
    fk_classification_id: Classification;

    @ManyToOne(() => Warehouses, {nullable: true})
    @JoinColumn({ name: "fk_warehouse_id" })
    fk_warehouse_id: Warehouses;

    @ManyToOne(() => User, {nullable: true})
    @JoinColumn({ name: "fk_supplier_id" })
    fk_supplier_id: User;

    @ManyToOne(() => Areas, {nullable: true})
    @JoinColumn({ name: "fk_areas_id" })
    fk_areas_id: Areas;

    @ManyToOne(() => DDVType, {nullable: true})
    @JoinColumn({ name: "fk_tax_id" })
    fk_taxt_id: DDVType
}
