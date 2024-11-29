import { pool } from "../database";
import { HttpStatusCode, ModelInterface, ValidationInterface } from "../types";
import { validate } from "../utils/validator";
import { PaginationDto } from "../dto/pagination.dto";
import _ from "lodash";
import { logger } from "../utils/logger";
import CustomError from "../common/custom-error";


class FilterDto extends PaginationDto {
  [key: string]: any;
}

class BaseModel implements ModelInterface {
  public _table?: string;
  public _required?: Array<string>;
  public _validation?: ValidationInterface;

  constructor() {}

  public async findAll(filter: FilterDto) {
    const { pageIndex = 1, pageSize = 10, limit } = filter;

    const params = _.omit(filter, [
      "pageIndex",
      "pageSize",
      "limit"
    ]);

    const keys = Object.keys(params);
    const values = Object.values(params);
    const conditionsString = keys
      .map((key, index) => `${key} = ?`)
      .join(" AND ");

    let query = `SELECT * FROM ${this._table}`;

    if (conditionsString) {
      query += ` WHERE ${conditionsString}`;
    }

    const offset = (pageIndex - 1) * pageSize;
    if (pageSize && offset >= 0) {
      query += ` LIMIT ${pageSize} OFFSET ${offset}`;
    } else if (limit) {
      query += ` LIMIT ${limit}`;
    }

    try {
      const [rows] = await pool.query(query, values);
      return rows;
    } catch (e: any) {
      logger.error(`Failed to retrieve records: ${e}`);
      throw new CustomError(`Failed to retrieve records: ${e.message}`);
    }
  }

  public async findById(id: number): Promise<any> {
    const query = `SELECT * FROM ${this._table} WHERE id = ?`;
    const [rows] = await pool.execute(query, [id]);

    if (Array.isArray(rows) && rows.length > 0) {
      return rows[0];
    }
    return null;
  }

  public async findOne(filter: Record<string, any>): Promise<any> {
    const keys = Object.keys(filter);
    const values = Object.values(filter);
    const conditionsString = keys
      .map((key, index) => `${key} = ?`)
      .join(" AND ");

    const query = `SELECT * FROM ${this._table} WHERE ${conditionsString} LIMIT 1`;
    try {
      const [rows] = await pool.execute(query, values);
      if (Array.isArray(rows) && rows.length > 0) {
        return rows[0];
      }
      return null;
    } catch (err: any) {
      throw new CustomError(`Failed to find record: ${err.message}`);
    }
  }

  public async findBy(filter: Record<string, any>): Promise<any[]> {
    const keys = Object.keys(filter);
    const values = Object.values(filter);
    const conditionsString = keys
      .map((key, index) => `${key} = ?`)
      .join(" AND ");

    const query = `SELECT * FROM ${this._table} WHERE ${conditionsString}`;
    try {
      const [rows] = await pool.execute(query, values);
      return Array.isArray(rows) ? rows : [];
    } catch (err: any) {
      throw new CustomError(`Failed to find records: ${err.message}`);
    }
  }

  public async create(params: any) {
    let results;
    let [passes] = await validate(params, this._validation, this._required);

    if (passes) {
      const fields = Object.keys(params).join(", ");
      const values = Object.values(params);
      const placeholders = values.map(() => "?").join(", ");

      const query = `INSERT INTO ${this._table} (${fields}) VALUES (${placeholders})`;

      const createResult = await pool.execute(query, values);
      const resultId = (createResult[0] as any).insertId;

      if (resultId) results = await this.findById(resultId);
    }

    return results;
  }

  public async update(id: number, params: any) {
    const currentEntity = await this.findById(id);
    if (!currentEntity) {
      logger.error(`Entity with id ${id} not found`);
      throw new CustomError(
        `Entity with id ${id} not found`,
        HttpStatusCode.NOT_FOUND
      );
    }

    try {
      const updatedValues: { [key: string]: any } = {};
      for (const key in params) {
        if (params[key] !== currentEntity[key]) {
          updatedValues[key] = params[key];
        }
      }

      if (Object.keys(updatedValues).length === 0) return currentEntity;

      const updates = Object.entries(updatedValues)
        .map(([key, value]) => `${key} = ?`)
        .join(", ");
      const values = Object.values(updatedValues);

      const query = `UPDATE ${this._table} SET ${updates} WHERE id = ?`;
      await pool.execute(query, [...values, id]);

      return await this.findById(id);
    } catch (e: any) {
      logger.error(`Failed to update record: ${e}`);
      throw new CustomError(`Failed to update record: ${e.message}`);
    }
  }

  public async delete(id: number): Promise<{ message: string } | null> {
    const currentEntity = await this.findById(id);
    if (!currentEntity) {
      logger.error(`Entity with id ${id} not found`);
      throw new CustomError(
        `Entity with id ${id} not found`,
        HttpStatusCode.NOT_FOUND
      );
    }

    try {
      const query = `DELETE FROM ${this._table} WHERE id = ?`;
      const deleteResult = await pool.execute(query, [id]);

      if ((deleteResult[0] as any).affectedRows > 0) {
        logger.info(`Entity with id ${id} deleted successfully`);
        return { message: "Entity successfully deleted" };
      } else {
        logger.warn(`Entity with id ${id} was not found for deletion`);
        return { message: "No entity was deleted" };
      }
    } catch (err: any) {
      logger.error(`Error deleting entity with id ${id}: ${err.message}`);
      throw new CustomError(
        `Failed to delete entity: ${err.message}`,
        HttpStatusCode.INTERNAL_SERVER
      );
    }
  }
}

export default BaseModel;
