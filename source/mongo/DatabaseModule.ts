import type { ParsedSchema } from "./interfaces/DatabaseSchema";
import type { Document } from "mongoose";
import type { Anything } from "./interfaces/Anything";
import type { SortFunction } from "./interfaces/SortFunction";
// database module
class DatabaseModule {
  public _schema: ParsedSchema;
  public constructor(schema: ParsedSchema) {
    this._schema = schema;
  }
  public async create(data: object): Promise<Document> {
    return await new this._schema.data(data).save();
  }
  public async update(
    searchData: object,
    updateData: object
    // @ts-ignore
  ): Promise<Document> {
    const model = await this._schema.data.findOne(searchData);
    if (model) {
      Object.entries(updateData).map((value: [string, any]) => {
        (model as Anything)[value[0]] = value[1];
      });
      return await model.save();
    } else if (!model) {
      return await this.create({ ...searchData, ...updateData });
    }
  }
  public async findOne(searchData: object): Promise<Document> {
    return await this._schema.data.findOne(searchData);
  }
  public async increment(
    search: object,
    key: string,
    value: number
  ): Promise<Document> {
    // increment a number by whatever
    const data = await this.findOne(search);
    if (!data) {
      const newData: object = { ...search };
      newData[key] = value;
      return this.create(newData);
    } else {
      if ((data as Anything)[key]) {
        if (isNaN((data as Anything)[key])) {
          (data as Anything)[key] = value;
          await data.save();
          return data;
        }

        (data as Anything)[key]
          ? ((data as Anything)[key] += value)
          : ((data as Anything)[key] = value);
        await data.save();
        return data;
      } else {
        (data as Anything)[key] = value;
        await data.save();
        return data;
      }
    }
  }
  public async decrement(
    search: object,
    key: string,
    value: number
  ): Promise<Document> {
    // decrement a number by whatever
    const data = await this.findOne(search);
    if (!data) {
      const newData: object = { ...search };
      newData[key] = -value;
      return this.create(newData);
    } else {
      if ((data as Anything)[key]) {
        if (
          isNaN((data as Anything)[key]) ||
          (data as Anything)[key] == undefined
        ) {
          (data as Anything)[key] = 0;
          await data.save();
          return data;
        }
        (data as Anything)[key] -= value;
        if ((data as Anything)[key] < 0) {
          (data as Anything)[key] = 0;
        }
        await data.save();
        return data;
      } else {
        (data as Anything)[key] = 0;
        await data.save();
        return data;
      }
    }
  }
  public async leaderboard(sort: SortFunction): Promise<Array<Document>> {
    // create a leaderboard
    const Data: Array<Document> = [...(await this.find({}))].sort(sort);
    const HandeledData: Array<Document> =
      Data.length > 9 ? Data.slice(0, 10) : Data;
    return HandeledData;
  }
  public async find(data: object): Promise<Array<Document>> {
    const Data = await this._schema.data.find(data);
    return Data;
  }
  public async delete(data: object): Promise<boolean> {
    const Data = await this.findOne(data); // get data
    if (!Data) return false;
    // if no data, return false
    else await Data.deleteOne(); // if exists delete
    return true; // return true because the data exists & was deleted
  }
  public async push(
    search: object,
    key: string,
    value: any
  ): Promise<Document> {
    const data = await this.findOne(search);
    if (!data) {
      const data2 = { ...search };
      data2[key] = [value];
      return await this.create(data2);
    } else if (!data[key]) {
      const dataa = {};
      dataa[key] = [value];
      return await this.update(search, dataa);
    } else {
      const existing = data[key];
      existing.push(value);
      const obj = {};
      obj[key] = existing;
      return await this.update(search, obj);
    }
  }
}

export { DatabaseModule };
