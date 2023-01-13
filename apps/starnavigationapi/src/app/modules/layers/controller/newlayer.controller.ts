/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { StateDto } from "../../../dto/state.interface";
import { TransformInterceptor } from "../../../interceptors/transform.interceptor";
import { NewLayerEntity } from "../entity/newlayer.entity";
import { NewLayerCreateDto } from "../dto/newlayer.dto";
import { ResTransformInterceptor } from "../../../interceptors/response.interceptor";
import { NewLayerService } from "../service/newlayer.service";


/**
 * handles request related to NewLayers
 */
@Controller({
    version: ['1'],
    path: 'newlayer'
})
@ApiTags('newlayer')
@UseInterceptors(ResTransformInterceptor)


export class NewLayerController {
    private readonly logger = new Logger(NewLayerController.name);
    /**
     * Constructor for NewLayer controller 
     * @param newlayer 
     */
    constructor(private newlayer: NewLayerService) { }

    /**
     * handles NewLayer creation
     * @param data 
     * @returns 
     */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create new layer ' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'This layer  has been successfully created.'})
    public async create(@Body() data: NewLayerCreateDto): Promise<NewLayerCreateDto> {
        return this.newlayer.create(data);
    }

    /**
     * Find all the NewLayer 
     * @returns 
     */
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Fin all NewLayer' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findAll() {
        return this.newlayer.findAll();
    }

    /**
     * Find a NewLayer by id provided
     * @param id 
     * @returns 
     */
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find NewLayer by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findOne(@Param('id') id) {
        return this.newlayer.findById(id);
    }

    /**
     * Updates a NewLayer with new data based on id
     * @param id 
     * @param data 
     * @returns 
     */

    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Updated NewLayer' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The NewLayer has been successfully updated.'})
    public async update(@Param('id') id: number, @Body() data: NewLayerCreateDto) {
        return this.newlayer.update(id, data);
    }

    /**
     * Delete a NewLayer
     * @param id 
     * @returns 
     */
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete NewLayer by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async remove(@Param('id') id: number): Promise<NewLayerCreateDto> {
        return this.newlayer.remove(id);
    }

    /**
     * Find NewLayer list by pagination
     * @param state 
     * @returns 
     */
    @Post('paginate')
    @ApiOperation({ summary: 'Find NewLayer list by pagination' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async paginate(@Body() state: StateDto): Promise<Pagination<NewLayerEntity>> {
        return this.newlayer.paginate(state);
    }
}