import { AbstractRepository, UsersDocument } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

@Injectable()
export class UsersRepository extends AbstractRepository<UsersDocument> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(UsersDocument.name)
    private readonly userModel: Model<UsersDocument>,
    @InjectConnection() connection: Connection,
  ) {
    super(userModel, connection);
  }
}
