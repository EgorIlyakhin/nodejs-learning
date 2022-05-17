import { v4 as uuid } from 'uuid';
import fs from 'fs';
import path from 'path';
import { List, Pokemon, Sexes, Types } from './types';
import { readFile, writeToFile } from './utils';

export class Model {
  private name: string;
  private photo: string;
  private sex: Sexes;
  private type: Types;
  private id: string;
  private count: number;
  private price: number;
  private static dataPath: fs.PathOrFileDescriptor = path.resolve(
    process.cwd(),
    'dist',
    'data',
    'model.json'
  );

  constructor(name, photo, sex, type, price) {
    this.name = name;
    this.photo = photo;
    this.sex = sex;
    this.type = type;
    this.id = uuid();
    this.price = price;
    this.count = 0;
  }

  static async getAll(): Promise<List> {
    return (await readFile(Model.dataPath)) as List;
  }

  static async getById(itemId): Promise<Pokemon | undefined> {
    const model = await Model.getAll();

    return (model as List).find(p => p.id === itemId);
  }

  async save() {
    const model = await Model.getAll();

    model.push({
      name: this.name,
      photo: this.photo,
      sex: this.sex,
      type: this.type,
      id: this.id,
      count: this.count,
      price: this.price,
    });

    return writeToFile(Model.dataPath, model);
  }

  static async update(newItem) {
    const model = await Model.getAll();

    const index = model.findIndex(({ id }) => id === newItem.id);
    model[index] = newItem;

    return writeToFile(Model.dataPath, model);
  }
}
