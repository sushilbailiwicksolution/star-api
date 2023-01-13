

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AssetEntity } from './asset.entity';
import { NewLayerEntity } from './newlayer.entity';



@Entity({ name: "newlayer_data" })
export class NewLayerDataEntity {
    @PrimaryGeneratedColumn()
    id?: number;
    @CreateDateColumn({name: "created_at"})
    createdAt?: Date;
    @UpdateDateColumn({name: "updated_at"})
    updatedAt?: Date;
   
    @ManyToOne(() => NewLayerEntity, map => map.data)
    value?: NewLayerEntity;
}