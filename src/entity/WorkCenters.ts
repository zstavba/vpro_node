import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import { User } from "./User";
import { Classification } from "./Classifications";
import { OrganizationalUnits } from "./OrganizationalUnits";
import { CostCities } from "./CostCities";

@Entity()
export class WorkCenters {

    @PrimaryGeneratedColumn()
    id: number;  

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    title: string;

    @ManyToOne(type => Classification)
    @JoinColumn({name:"fk_classification_id"})
    classification: Classification;

    @ManyToOne(type => OrganizationalUnits)
    @JoinColumn({ name: "fk_organizational_units" })
    oe: OrganizationalUnits;

    @ManyToOne(type => CostCities)
    @JoinColumn({ name: "fk_stm_id" })
    stm: CostCities

    @ManyToOne(type => User)
    @JoinColumn({name: "fk_user_id"})
    user: User;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    status: string;

    @Column({
        type: "text",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    price_work: string;

    @Column({
        type: "boolean",
        default: null,
        collation: "utf8_slovenian_ci"
    })
    active: boolean;


    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
        collation: "utf8_slovenian_ci"
    })
    created_at:  string;

}