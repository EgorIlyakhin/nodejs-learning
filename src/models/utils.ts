import fs from 'fs';

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, content) => (err ? reject(err) : resolve(JSON.parse(content))));
  });

export const writeToFile = (path, data) =>
  new Promise<void>((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data), err => (err ? reject(err) : resolve(data)));
  });
