import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LayerDataDto, NLayerDto, ProductDataDto } from "../dto/newlayer.dto";
import { LayerData, NLayer, ProductData } from "../entity/newlayer.entity";

@Injectable()
export class NewLayerService {
  // constructor(@InjectRepository(NLayer) private layerRepository: Repository<NLayer>) {}
 
  constructor(
    @InjectRepository(NLayer)
    private readonly layerRepository: Repository<NLayer>,
    @InjectRepository(LayerData)
    private readonly layerDataRepository: Repository<LayerData>,
    @InjectRepository(ProductData)
    private readonly productRepository: Repository<ProductData>,
  ) {}

// Get all layers 
async getLayers(): Promise<NLayerDto[]> {
 
  const layers = await this.layerRepository.find();
  const layerDTOs = [];

  for (const layer of layers) {
    const layerData = await this.layerDataRepository.find({ layer });
    const layerDTO = new NLayerDto();
    layerDTO.id = layer.id;
    layerDTO.category = layer.category;
    layerDTO.has_subcategory = layer.has_subcategory;

    const layerDataDTOs = [];
    // let id =1;
    // Dont use
    for (const data of layerData) {
      const product = await this.productRepository.find({ layerData: data });
      const layerDataDTO = new LayerDataDto();
      layerDataDTO.id = data.id;
      layerDataDTO.value = data.value;

      if(product.length>0){
      const productDTOs = [];
      for (const item of product) {
        const productDTO = new ProductDataDto();
        productDTO.product_id = item.product_id;
        productDTO.product_name = item.product_name;
        productDTOs.push(productDTO);
      }

      layerDataDTO.data = productDTOs;
    }
      layerDataDTOs.push(layerDataDTO);
      // id++;
    }
  
    layerDTO.data = layerDataDTOs;
    layerDTOs.push(layerDTO);
  }

  return layerDTOs;
}





// to handle create request 
async createLayer(layerDTO: NLayerDto): Promise<NLayerDto> {
  const layer = new NLayer();
  layer.category = layerDTO.category;
  layer.has_subcategory = layerDTO.has_subcategory;
  await this.layerRepository.save(layer);

  layerDTO.data.forEach(async layerDataDTO => {
    const layerData = new LayerData();
    layerData.value = layerDataDTO.value;
    layerData.layer = layer;
    await this.layerDataRepository.save(layerData);

    if (layerDataDTO.data) {
      layerDataDTO.data.forEach(async productDTO => {
        const product = new ProductData();
        product.product_id = productDTO.product_id;
        product.product_name = productDTO.product_name;
        product.layerData = layerData;
        await this.productRepository.save(product);
      });
    }
  });

  return layerDTO;
}




}



