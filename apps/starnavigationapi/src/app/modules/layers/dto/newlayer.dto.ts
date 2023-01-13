import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { array } from 'joi';


/**
 * This is NewLayerCreate class
 * 
 * Describes all the fields of new layer for API 
 * 
 * @ignore
 */
export class NewLayerDataDto {
    @ApiProperty({})
    @Expose()
    id?: number;
    @ApiProperty({})
    @Expose()
    value?:string
}

export class NewLayerCreateDto {
    @Expose()
    id?: number;
    @IsString()
    @Expose()
    @ApiProperty({
        description: 'new layer api '
    })
    category?: string;
    @IsString()
    @Expose()
    @ApiProperty()
    has_subcategory?: boolean;
    @Expose()
    createdAt?: Date;
    @Expose()
    updatedAt?: Date;
    
    @Expose()
    @ApiProperty({ type: () => NewLayerDataDto, isArray: true })
    data?:Array<NewLayerDataDto>

   
}