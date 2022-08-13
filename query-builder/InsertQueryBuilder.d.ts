import { QueryBuilder } from "./QueryBuilder";
import { ObjectLiteral } from "../common/ObjectLiteral";
import { EntityTarget } from "../common/EntityTarget";
import { QueryDeepPartialEntity } from "./QueryPartialEntity";
import { InsertResult } from "./result/InsertResult";
import { ColumnMetadata } from "../metadata/ColumnMetadata";
import { InsertOrUpdateOptions } from "./InsertOrUpdateOptions";
import { WhereExpressionBuilder } from "./WhereExpressionBuilder";
import { Brackets } from "./Brackets";
/**
 * Allows to build complex sql queries in a fashion way and execute those queries.
 */
export declare class InsertQueryBuilder<Entity> extends QueryBuilder<Entity> implements WhereExpressionBuilder {
    readonly "@instanceof": symbol;
    /**
     * Gets generated SQL query without parameters being replaced.
     */
    getQuery(): string;
    /**
     * Executes sql generated by query builder and returns raw database results.
     */
    execute(): Promise<InsertResult>;
    /**
     * Specifies INTO which entity's table insertion will be executed.
     */
    into<T>(entityTarget: EntityTarget<T>, columns?: string[]): InsertQueryBuilder<T>;
    /**
     * Values needs to be inserted into table.
     */
    values(values: QueryDeepPartialEntity<Entity> | QueryDeepPartialEntity<Entity>[]): this;
    /**
     * Optional returning/output clause.
     * This will return given column values.
     */
    output(columns: string[]): this;
    /**
     * Optional returning/output clause.
     * Returning is a SQL string containing returning statement.
     */
    output(output: string): this;
    /**
     * Optional returning/output clause.
     */
    output(output: string | string[]): this;
    /**
     * Optional returning/output clause.
     * This will return given column values.
     */
    returning(columns: string[]): this;
    /**
     * Optional returning/output clause.
     * Returning is a SQL string containing returning statement.
     */
    returning(returning: string): this;
    /**
     * Optional returning/output clause.
     */
    returning(returning: string | string[]): this;
    /**
     * Indicates if entity must be updated after insertion operations.
     * This may produce extra query or use RETURNING / OUTPUT statement (depend on database).
     * Enabled by default.
     */
    updateEntity(enabled: boolean): this;
    /**
     * Adds additional ON CONFLICT statement supported in postgres and cockroach.
     *
     * @deprecated Use `orIgnore` or `orUpdate`
     */
    onConflict(statement: string): this;
    /**
     * Adds additional ignore statement supported in databases.
     */
    orIgnore(statement?: string | boolean): this;
    /**
     * @deprecated
     *
     * `.orUpdate({ columns: [ "is_updated" ] }).setParameter("is_updated", value)`
     *
     * is now `.orUpdate(["is_updated"])`
     *
     * `.orUpdate({ conflict_target: ['date'], overwrite: ['title'] })`
     *
     * is now `.orUpdate(['title'], ['date'])`
     *
     */
    orUpdate(statement?: {
        columns?: string[];
        overwrite?: string[];
        conflict_target?: string | string[];
    }): this;
    orUpdate(overwrite: string[], conflictTarget?: string | string[], orUpdateOptions?: InsertOrUpdateOptions): this;
    /**
     * Sets WHERE condition in the query builder.
     * If you had previously WHERE expression defined,
     * calling this function will override previously set WHERE conditions.
     * Additionally you can add parameters used in where expression.
     */
    where(where: string | ((qb: this) => string) | Brackets | ObjectLiteral | ObjectLiteral[], parameters?: ObjectLiteral): this;
    /**
     * Adds new AND WHERE condition in the query builder.
     * Additionally you can add parameters used in where expression.
     */
    andWhere(where: string | ((qb: this) => string) | Brackets | ObjectLiteral | ObjectLiteral[], parameters?: ObjectLiteral): this;
    /**
     * Adds new OR WHERE condition in the query builder.
     * Additionally you can add parameters used in where expression.
     */
    orWhere(where: string | ((qb: this) => string) | Brackets | ObjectLiteral | ObjectLiteral[], parameters?: ObjectLiteral): this;
    /**
     * Sets WHERE condition in the query builder with a condition for the given ids.
     * If you had previously WHERE expression defined,
     * calling this function will override previously set WHERE conditions.
     */
    whereInIds(ids: any | any[]): this;
    /**
     * Adds new AND WHERE with conditions for the given ids.
     */
    andWhereInIds(ids: any | any[]): this;
    /**
     * Adds new OR WHERE with conditions for the given ids.
     */
    orWhereInIds(ids: any | any[]): this;
    /**
     * Creates INSERT express used to perform insert query.
     */
    protected createInsertExpression(): string;
    /**
     * Gets list of columns where values must be inserted to.
     */
    protected getInsertedColumns(): ColumnMetadata[];
    /**
     * Creates a columns string where values must be inserted to for INSERT INTO expression.
     */
    protected createColumnNamesExpression(): string;
    /**
     * Creates list of values needs to be inserted in the VALUES expression.
     */
    protected createValuesExpression(): string;
    /**
     * Gets array of values need to be inserted into the target table.
     */
    protected getValueSets(): ObjectLiteral[];
    /**
     * Checks if column is an auto-generated primary key, but the current insertion specifies a value for it.
     *
     * @param column
     */
    protected isOverridingAutoIncrementBehavior(column: ColumnMetadata): boolean;
}
