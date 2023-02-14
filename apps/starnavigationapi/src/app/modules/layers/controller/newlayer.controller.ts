/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { StateDto } from "../../../dto/state.interface";
import { TransformInterceptor } from "../../../interceptors/transform.interceptor";
import { ResTransformInterceptor } from "../../../interceptors/response.interceptor";
import { NewLayerService } from "../service/newlayer.service";
import { NLayerDto } from "../dto/newlayer.dto";


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
  @ApiOperation({ summary: 'Create a new layer' })
  @ApiResponse({
    status: 201,
    description: 'The layer has been successfully created.',
    type: NLayerDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() layerDto: NLayerDto) {
    return this.newlayer.createLayer(layerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all layers' })
  @ApiResponse({ status: 200, description: 'Successful retrieval of layers', type: NLayerDto, isArray: true })
  async getLayers(): Promise<NLayerDto[]> {
    return this.newlayer.getLayers();
  }
}