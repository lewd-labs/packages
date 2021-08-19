"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
// database module
class DatabaseModule {
    _schema;
    constructor(schema) {
        this._schema = schema;
    }
    async create(data) {
        return await new this._schema.data(data).save();
    }
    async update(searchData, updateData
    // @ts-ignore
    ) {
        const model = await this._schema.data.findOne(searchData);
        if (model) {
            Object.entries(updateData).map((value) => {
                model[value[0]] = value[1];
            });
            return await model.save();
        }
        else if (!model) {
            return await this.create({ ...searchData, ...updateData });
        }
    }
    async findOne(searchData) {
        return await this._schema.data.findOne(searchData);
    }
    async increment(search, key, value) {
        // increment a number by whatever
        const data = await this.findOne(search);
        if (!data) {
            const newData = { ...search };
            newData[key] = value;
            return this.create(newData);
        }
        else {
            if (data[key]) {
                if (isNaN(data[key])) {
                    data[key] = value;
                    await data.save();
                    return data;
                }
                data[key]
                    ? (data[key] += value)
                    : (data[key] = value);
                await data.save();
                return data;
            }
            else {
                data[key] = value;
                await data.save();
                return data;
            }
        }
    }
    async decrement(search, key, value) {
        // decrement a number by whatever
        const data = await this.findOne(search);
        if (!data) {
            const newData = { ...search };
            newData[key] = -value;
            return this.create(newData);
        }
        else {
            if (data[key]) {
                if (isNaN(data[key]) ||
                    data[key] == undefined) {
                    data[key] = 0;
                    await data.save();
                    return data;
                }
                data[key] -= value;
                if (data[key] < 0) {
                    data[key] = 0;
                }
                await data.save();
                return data;
            }
            else {
                data[key] = 0;
                await data.save();
                return data;
            }
        }
    }
    async leaderboard(sort) {
        // create a leaderboard
        const Data = [...(await this.find({}))].sort(sort);
        const HandeledData = Data.length > 9 ? Data.slice(0, 10) : Data;
        return HandeledData;
    }
    async find(data) {
        const Data = await this._schema.data.find(data);
        return Data;
    }
    async delete(data) {
        const Data = await this.findOne(data); // get data
        if (!Data)
            return false;
        // if no data, return false
        else
            await Data.deleteOne(); // if exists delete
        return true; // return true because the data exists & was deleted
    }
    async push(search, key, value) {
        const data = await this.findOne(search);
        if (!data) {
            const data2 = { ...search };
            data2[key] = [value];
            return await this.create(data2);
        }
        else if (!data[key]) {
            const dataa = {};
            dataa[key] = [value];
            return await this.update(search, dataa);
        }
        else {
            const existing = data[key];
            existing.push(value);
            const obj = {};
            obj[key] = existing;
            return await this.update(search, obj);
        }
    }
}
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=DatabaseModule.js.map