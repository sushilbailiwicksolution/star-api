import { Column, Entity, OneToMany } from 'typeorm';
import { ExtendEntity } from './extend.entity';
import { NewLayerDataEntity } from './newlayerdata.entity';


/**
 * This is new layer entity
 * Contains Landmark fields  creates landmark in database
 */

@Entity({name: "newlayer"})
export class NewLayerEntity extends ExtendEntity {
    @Column({length: 64})
    category?: string;
    @Column()
    has_subcategory?: boolean;
    
    @OneToMany('NewLayerDataEntity','value',{ eager: true, cascade: true })
    data?: NewLayerDataEntity[];
}