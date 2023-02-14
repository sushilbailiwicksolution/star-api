import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { StatusEnum } from '../../../enum/status.enum';
import { UserTypeEnum } from '../../../enum/user.type.enum';
import { QueryBuilder } from '../../../service/query.builder.service';
import { NewUserDto } from '../dto/newUser.dto';
import { UpdateUserDto } from '../dto/updateUser.dto';
import { NewUserEntity } from '../entity/newUser.entity';

@Injectable()
export class NewUserService {
    private readonly logger = new Logger(NewUserService.name);
  constructor(
    @InjectRepository(NewUserEntity) private userRepository: Repository<NewUserEntity>, 
    private readonly queryBuilderService: QueryBuilder) { }

  async create(userDto: NewUserDto): Promise<NewUserEntity> {
    const user = new NewUserEntity();
    user.accountType = userDto.accountType;
    user.active = userDto.active;
    user.canChangePassword = userDto.canChangePassword;
    user.createdBy = userDto.createdBy;
    user.customerId = userDto.customerId;
    user.email_id = userDto.email_id;
    user.expires_on = userDto.expires_on;
    user.firstname = userDto.firstname;
    user.lastname = userDto.lastname;
    user.login_id = userDto.login_id;
    user.neverExpire = userDto.neverExpire;
    user.password = userDto.password;
    user.phone_no = userDto.phone_no;
    user.retype_password = userDto.retype_password;
    user.username = userDto.username;

    return this.userRepository.save(user);
  }

  async login(username: string, loginId: string, password: string): Promise<NewUserEntity> {
    let user: NewUserEntity;
    if (username) {
      user = await this.userRepository.findOne({ where: { username, password } });
    } else if (loginId) {
      user = await this.userRepository.findOne({ where: { login_id: loginId, password } });
    }
    if (!user) {
      throw new Error('Invalid request');
    }
    return user;
  }

  async find(): Promise<Array<NewUserEntity>> {
    try {
      const users = await this.userRepository.find();
      return users;
    } catch (error) {
      // Log the error
      console.error(error);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async update(id: number, updateUserDto: UpdateUserDto): Promise<NewUserEntity[]> {
    try {
      const user = await this.userRepository.find({ id });
      if (!user) {
        throw new Error('User not found');
      }
      await this.userRepository.update({ id }, updateUserDto);
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async remove(id: number): Promise<NewUserEntity | any> {
    try{
    const layer = await this.findById(id);
    layer.status = StatusEnum.DELETED
    return this.userRepository.save(layer);
    }catch(err){
             console.log(err);
             const obj = {
                error:"No user found",
                status:404
             }
             return obj;
    }
    }

  async findById(id: number): Promise<NewUserEntity> {
    try {
      const user = await this.userRepository.findOne({id});
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //Find by account type
  async findByAccountType(accountType: UserTypeEnum): Promise<NewUserEntity> {
    console.log('account type: ', accountType);
    return this.userRepository.findOne({ status: StatusEnum.ACTIVE, accountType });
}

//Paginate


}
