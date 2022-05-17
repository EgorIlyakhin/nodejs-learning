import path from 'path';
import fs from 'fs';
import { CartType, Pokemon } from './types';
import { writeToFile, readFile } from './utils';

export class Cart {
  private static dataPath: fs.PathOrFileDescriptor = path.resolve(
    process.cwd(),
    'dist',
    'data',
    'cart.json'
  );

  static async add(item: Pokemon) {
    const cart = await Cart.fetch();

    const index = cart.list.findIndex(({ id }) => id === item.id);
    const purchase = cart.list[index];

    if (purchase) {
      purchase.count++;
      cart.list[index] = purchase;
    } else {
      item.count = 1;
      cart.list.push(item);
    }

    cart.price += +item.price;

    return writeToFile(Cart.dataPath, cart);
  }

  static async remove(id) {
    const cart = await Cart.fetch();
    const equals = c => c.id === id;

    const idx = cart.list.findIndex(equals);
    const item = cart.list[idx];

    if (item.count === 1) {
      cart.list = cart.list.filter(c => !equals(c));
    } else {
      cart.list[idx].count--;
    }

    cart.price -= item.price;
    return writeToFile(Cart.dataPath, cart);
  }

  static async fetch(): Promise<CartType> {
    return (await readFile(Cart.dataPath)) as CartType;
  }
}
