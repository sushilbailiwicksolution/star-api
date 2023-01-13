import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StateDto } from "../../../dto/state.interface";
import { StatusEnum } from "../../../enum/status.enum";
import { QueryBuilder } from "../../../service/query.builder.service";
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { NewLayerCreateDto } from "../dto/newlayer.dto";
import { NewLayerEntity } from "../entity/newlayer.entity";
import * as _ from "lodash";

/**
 * NewLayerService consist of methods for NewLayer API
 */

@Injectable()
export class NewLayerService {
    private readonly logger = new Logger(NewLayerService.name);
    /**
     * This is constructor for NewLayer Service 
     * @param repository 
     * @param queryBuilderService 
     */
    constructor(
        @InjectRepository(NewLayerEntity) private repository: Repository<NewLayerEntity>,
        private readonly queryBuilderService: QueryBuilder) { }
     
    /**
     * Create new NewLayer in database 
     * @param {object}data Takes this and save it into database (new entry)
     * @returns Saves this data into database
     */
    async create(data: NewLayerCreateDto): Promise<NewLayerEntity> {
        return this.repository.save(data);
    }
    /**
     * Find NewLayer based on id provided 
     * @param {number}id Checks for the id of NewLayer into database 
     * @returns with the data related to the id 
     */
    async findById(id: number): Promise<NewLayerEntity> {
        return this.repository.findOne({ id });
    }
    /**
     * Find all the NewLayers into database
     * @returns All the NewLayers saved in database
     */
    async findAll(): Promise<Array<NewLayerEntity>> {
        return this.repository.find({status: StatusEnum.ACTIVE});
    }

    /**
     * Removes the NewLayer based on id provided.
     * @param {number}id  Checks for the id  
     * @returns 
     */
    async remove(id: number): Promise<NewLayerEntity> {
        const layer = await this.findById(id);
        layer.status = StatusEnum.DELETED;
        return this.repository.save(layer);
    }

    /**
     * Updates NewLayer based on id  provided 
     * @param id Updates NewLayer based on id provided
     * @param data 
     * @returns 
     */
    async update(id: number, data: NewLayerCreateDto): Promise<NewLayerEntity> {
        data = _.omit(data, ['id']);
        let layer = await this.findById(id);
        this.logger.log(`update: ${JSON.stringify(layer)}`);
        if (layer == null) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: `Layer id: ${id} not found`,
            }, HttpStatus.FORBIDDEN);
        }
        layer = Object.assign(layer, data);
        return this.repository.save(layer);
    }

    /**
     * @ignore
     * @param state 
     * @returns 
     */
    async paginate(state: StateDto): Promise<Pagination<NewLayerEntity>> {
        const options = { page: state.page.current, limit: state.page.size };
        const queryBuilder = this.repository.createQueryBuilder('t');
        return await paginate<NewLayerEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
    }
}