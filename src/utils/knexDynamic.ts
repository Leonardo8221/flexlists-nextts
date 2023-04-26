import knex, { Knex } from 'knex';

export type Table = { name: string, id: number }

export type TableDefinition = {
    id: number,
    name: string,
    fields: {
        id: number,
        name: string,
        type: string
    }[]
}

export enum SchemaChangeAction {
    AddTable = 'addTable',
    UpdateTableName = 'updateTableName',
    RemoveTable = 'removeTable',
    AddField = 'addField',
    RemoveField = 'removeField',
    UpdateFieldName = 'updateFieldName',
    UpdateFieldType = 'updateFieldType',
    AddRelation = 'addRelation',
    RemoveRelation = 'removeRelation'
}

export enum SchemaChangeStatus {
    Pending = 'pending',
    Running = 'running',
    Success = 'success',
    Error = 'error'
}

export type SchemaChange = {
    id: number,
    action: SchemaChangeAction,
    tableId: number,
    fieldId?: number,
    status: SchemaChangeStatus,
    message: string
}

export type ChangeResult = {
    success: boolean,
    message: string
}

type FieldDef = {
    name: string,
    type: string
    maximum?: number,
    indexed?: string,
    precision?: number,
    required?: boolean
}

export class KnexDynamic {

    initialized = false
    knexInstance?: Knex
    //inspector?: SchemaInspector
    dbDriver?: string

    /*
        getConvention takes a relevant string, for instance a tableName 
        and an object and will return the filled template for the convention
    */
    getConvention: (convention: string, args: { [key: string]: any }) => Promise<string>

    /* 
        getTables() is a pointer to a function that returns a list of all tables in the database
    */

    getTables: () => Promise<Table[]>

    /* 
        getTableDefinition is a function which returns the current table definition with 
        the fields and their definitions for schema changes 
    */
    getTableDefinition: (tableId: number) => Promise<{ previous?: TableDefinition, current: TableDefinition }>

    /* 
        getChanges(count: int) is a pointer to a function that returns a list of the 'count' latest required changes 
        by default it returns all changes currently in in the pipeline 
        These are sorted by date of arrival 
    */
    getChanges: (locked: boolean, count?: number) => Promise<SchemaChange[]>

    /*
        TODO: the changeId is not necessarily a number, so the code generator has to geenrate it 
        completeChange(changeId: number) is a pointer to a function that marks a change as complete
    */
    completeChange: (changeId: number, unlock: boolean) => Promise<ChangeResult>

    /* 
        unlock function 
    */
    unlockChanges: () => Promise<ChangeResult>

    constructor(
        conventionFunction: (convention: string, args: { [key: string]: any }) => Promise<string>,
        getTablesFunction: () => Promise<Table[]>,
        tableDefinitionFunction: (tableId: number) => Promise<{ previous?: TableDefinition, current: TableDefinition }>,
        changesFunction: (locked: boolean, count?: number) => Promise<SchemaChange[]>,
        completeChangeFunction: (changeId: number, unlock: boolean) => Promise<ChangeResult>,
        unlockChangesFunction: () => Promise<ChangeResult>
    ) {
        this.getConvention = conventionFunction
        this.getTables = getTablesFunction
        this.getTableDefinition = tableDefinitionFunction
        this.getChanges = changesFunction
        this.completeChange = completeChangeFunction
        this.unlockChanges = unlockChangesFunction
    }

    driverMapping(driver: string) {
        switch (driver) {
            case 'pg':
                return 'postgres'
            case 'mysql':
                return 'mysql'
            case 'sqlite3':
                return 'sqlite3'
            default:
                return driver
        }
    }

    /* 
        this inits the db to the correct server etc 
        see knex https://knexjs.org/guide/#node-js
    */
    async init(driver: string, host: string, port?: number, database?: string, user?: string, password?: string): Promise<Knex> {

        if (this.initialized) {
            return knex({ client: driver })
        }

        // your base position 
        let conn: any
        switch (driver) {
            case 'pg':
                
                if (host.startsWith('postgresql')) {
                    conn = {
                        client: driver,
                        connection: host
                    }
                } else {
                    if (!database) {
                        throw new Error('database is required for postgres')
                    }
                    conn = {
                        client: driver,
                        connection: {
                            host,
                            port,
                            database,
                            user,
                            password,
                        },
                        //searchPath: ['knex', 'public'],
                    }
                }
                break
                case 'mysql':
                
                if (host.startsWith('mysql')) {
                    conn = {
                        client: driver,
                        connection: host
                    }
                } else {
                    conn = {
                        client: driver,
                        connection: {
                            host,
                            port,
                            database,
                            user,
                            password,
                        },
                        //searchPath: ['knex', 'public'],
                    }
                }
                break
            case 'sqlite3':
                if (host.startsWith('sqlite')) {
                    // dissect the sqlite connection string
                    host = host.replace('sqlite://', '')
                    conn = {
                        client: driver,
                        connection: {
                            filename: host
                        },
                        useNullAsDefault: true
                    }
                } else {
                    conn = {
                        client: driver,
                        connection: {
                            filename: host
                        },
                        useNullAsDefault: true
                    }
                }
                break
            default:
                throw new Error(`driver ${driver} not supported`)
        }



        // searchPath searches / uses postgres schemas which are not the default 'public'
        // schema's are named collections of tables; we will use the default 'public' here only 
        if (driver === 'pg') {
            conn.searchPath = ['public']
        }

        let result = knex(conn)

        // check if the db exists 
        try {
            await result.raw("SELECT 1")
            console.log('database exists')
        } catch (err: any) {
            // database does not exist probably 
            if (err.message.includes("does not exist")) {
                await result.destroy()


                conn.connection.database = this.driverMapping(driver)
                result = knex(conn)
                try {
                    await result.raw(`CREATE DATABASE ${this.dbQuote(driver, database!)}`)
                    console.log('database created')
                    await result.destroy();
                    conn.connection.database = database
                    result = knex(conn)
                } catch (err) {
                    result.destroy()
                    throw err
                }
            }
        }

        this.initialized = true
        this.knexInstance = result
        this.dbDriver = driver

        return result
    }


    async destroy() {
        await this.knexInstance?.destroy()
        this.initialized = false
    }

    dbQuote(driver: string, str: string) {
        switch (driver) {
            case 'pg':
                return `"${str}"`
            case 'mysql':
                return `\`${str}\``
            case 'sqlite3':
                return `"${str}"`
        }
        return str
    }

    async reformatTableName(id: number, tableName?: string) {
        if (!tableName) {
            return undefined
        }
       
        return `t${id}`
    }

    async getTableNames(id: number): Promise<{ previous: string | undefined, current: string }> {
        const definitions = await this.getTableDefinition(id)
        return { previous: await this.reformatTableName(id, definitions.previous?.name), current: (await this.reformatTableName(id, definitions.current.name))! }
    }

    async tableActions(diff: SchemaChange) {
        if (diff.action !== SchemaChangeAction.AddTable && diff.action !== SchemaChangeAction.UpdateTableName && diff.action !== SchemaChangeAction.RemoveTable) {
            return false
        }
        const _this = this
        switch (diff.action) {
            case SchemaChangeAction.AddTable:
                await this.knexInstance?.schema.createTable((await this.getTableNames(diff.tableId)).current, function (table) {
                    // TODO: this must be gotten from the settings
                    table.increments('id').primary()
                })
                return true
            case SchemaChangeAction.UpdateTableName:
                await this.knexInstance?.schema.renameTable((await this.getTableNames(diff.tableId)).previous!, (await this.getTableNames(diff.tableId)).current)
                return true

            case SchemaChangeAction.RemoveTable:
                await this.knexInstance?.schema.dropTable((await this.getTableNames(diff.tableId)).current)
                return true
            default:
                throw new Error('unknown action')
        }
    }

    fieldType(field: FieldDef, table: any) {
        if (!field.maximum) {
            field.maximum = 255
        }
        let tf: any
        if (field.indexed == 'primary') {
            tf = table.increments(field.name).primary()
        }
        else {
            switch (field.type) {
                case 'Text':
                case 'String': // deprecated
                    if (this.dbDriver == 'mysql') {
                        if (field.maximum <= 255) {
                            tf = table.string(field.name, field.maximum)
                        } else if (field.maximum <= 65535) {
                            tf = table.text(field.name, 'tinytext')
                        } else if (field.maximum <= 16777215) {
                            tf = table.text(field.name, 'mediumtext')
                        } else {
                            tf = table.text(field.name, 'longtext')
                        }
                    } else {
                        tf = table.string(field.name, field.maximum)
                    }
                    break
                case 'Integer':
                case 'Int': // deprecated
                    tf = table.integer(field.name)
                    break
                case 'Double':
                    tf = table.double(field.name)
                    break
                case 'Float':
                    tf = table.float(field.name)
                    break
                case 'Time':
                    tf = table.time(field.name)
                    break
                case 'Date':
                    tf = table.date(field.name)
                    break
                case 'DateTime':
                    tf = table.datetime(field.name)
                    break
                case 'Boolean':
                    tf = table.boolean(field.name)
                    break
                case 'Decimal':
                    if (field.precision) {
                        tf = table.decimal(field.name, field.precision)
                    } else {
                        tf = table.decimal(field.name)
                    }
                    break
            }
        }

        if (!tf) {
            throw `unknown field type ${field.type} with name ${field.name}`
        }

        if (field.required) {
            tf.notNullable()
        }

        return tf
    }

    async reformatFieldName(id: number, tableName: string, fieldName?: string) {
        if (!fieldName) {
            return undefined
        }

        return `f${id}`
    }

    async getTableFieldNames(tableId: number, fieldId: number): Promise<{ tableName: string, previous: FieldDef | undefined, current: FieldDef }> {
        const definitions = await this.getTableDefinition(tableId)
        const previousField = definitions.previous?.fields?.find(f => f.id == fieldId)
        if (previousField) {
            previousField.name = (await this.reformatFieldName(fieldId, definitions.previous!.name!, previousField.name))!
        }
        const currentField = definitions.current.fields.find(f => f.id == fieldId)
        if (currentField) {
            currentField.name = (await this.reformatFieldName(fieldId, definitions.current.name, currentField.name))!
        }

        // return previous and current filled according to FieldDef 
        return { tableName: (await this.getTableNames(tableId)).current, previous: previousField, current: currentField! }
    }


    async fieldActions(diff: SchemaChange) {
        if (diff.action !== SchemaChangeAction.AddField
            && diff.action !== SchemaChangeAction.UpdateFieldName
            && diff.action !== SchemaChangeAction.UpdateFieldType
            && diff.action !== SchemaChangeAction.RemoveField) {

            return false
        }
        const _this = this
        const fieldDefs = await this.getTableFieldNames(diff.tableId, diff.fieldId!)
        switch (diff.action) {
            case SchemaChangeAction.AddField:
                await this.knexInstance?.schema.alterTable(fieldDefs.tableName, function (table) {
                    _this.fieldType(fieldDefs.current, table)
                })
                return true
            case SchemaChangeAction.UpdateFieldName:
                await this.knexInstance?.schema.alterTable(fieldDefs.tableName, function (table) {
                    table.renameColumn(fieldDefs.previous!.name, fieldDefs.current.name)
                })
                return true
            case SchemaChangeAction.UpdateFieldType:
                await this.knexInstance?.schema.alterTable(fieldDefs.tableName, function (table) {
                    _this.fieldType(fieldDefs.current, table).alter()
                })
                return true
            case SchemaChangeAction.RemoveField:
                await this.knexInstance?.schema.alterTable(fieldDefs.tableName, function (table) {
                    table.dropColumn(fieldDefs.current.name);
                })
                return true
            default:
                throw new Error(`unknown action ${diff.action}}`)

        }

    }
    // async completeSchema(diff: SchemaChange) {
    //     const changes = await this.getChanges(true)
    //     const done = changes.length <= 1
    //     await this.completeChange(diff.id, done);
    // }

    async runSchemaChanges() {
        // get the schema changes
        const changes = await this.getChanges(true)

        // iterate over the changes
        for (let i = 0; i < changes.length; i++) {
            const change = changes[i]

            const result =
                (await this.tableActions(change)) ||
                (await this.fieldActions(change))

            if (result) {
                await this.completeChange(change.id, false);
            }
        }
        await this.unlockChanges()
    }

    async redoFieldNames(tableId: number, record: any) {
        // iterate over the keys and rename them to what they 
        // are supposed to be 
        const table = await this.getTableDefinition(tableId)
        const fields = table.current.fields
        const keys = Object.keys(record)
        for (let key of keys) {
            const field = fields.find(f => f.name == key)
            if (field) {
                const fieldName = await this.getTableFieldNames(tableId, field.id)
                if (fieldName.current.name != key) {
                    record[fieldName.current.name] = record[key]
                    delete record[key]
                }
            } else {
                throw `field ${key} not found`
            }
        }
        return record
    }

    async insert(tableId: number, json: any) {
        const table = (await this.getTableNames(tableId)).current

        if (!Array.isArray(json.data))
            json.data = [json.data]

        // cannot happen
        if (!this.knexInstance)
            throw 'knex not initialized'

        // iterate over the data and insert it 
        for (let row of json.data) {

            await this.knexInstance(table).insert(await this.redoFieldNames(tableId, row))
        }
    }

    async update(tableId: number, id: number, json: any) {
        const table = (await this.getTableNames(tableId)).current

        if (!Array.isArray(json.data))
            json.data = [json.data]

        // cannot happen
        if (!this.knexInstance)
            throw 'knex not initialized'

        for (let row of json.data) {
            await this.knexInstance(table).where('id', id).update(await this.redoFieldNames(tableId, row))
        }
    }

    async remove(tableId: number, id: number) {
        const table = (await this.getTableNames(tableId)).current

        // cannot happen
        if (!this.knexInstance)
            throw 'knex not initialized'

        await this.knexInstance(table).where('id', id).del()
    }

    mapCmpKnex(cmp: string): string {
        switch (cmp) {
            case 'eq':
                return '='
            case 'ne':
                return '!='
            case 'lt':
                return '<'
            case 'lte':
                return '<='
            case 'gt':
                return '>'
            case 'gte':
                return '>='
            default:
                throw `unknown comparison ${cmp} `
        }
    }

    buildQuery(json: any) {
        const _this = this
        // TODO: we only support one table at the moment
        // iterate over the tables
        for (let table of json.query.table) {

            const query = json.query.query

            if (!this.knexInstance)
                throw 'knex not initialized'

            const result = this.knexInstance
                .column(json.query.field[table])
                .from(table)
                .where((builder) => { // here is the 'magic' 
                    function rec(query: any, myBuilder: any) {
                        while (query.length > 0) {
                            const subquery = query.shift()

                            // if we indent, then we need () 
                            if (subquery.type == 'indent') {
                                myBuilder.where((builder1: any) => {
                                    rec(subquery.children, builder1)
                                })

                                // this is a real instruction 
                            } else if (subquery.type == 'cmp') {
                                myBuilder.where(subquery.field, _this.mapCmpKnex(subquery.cmp), subquery.value)
                                // here we only need to do something is it's an OR 
                            } else if (subquery.type == 'op') {
                                if (subquery.value == 'or') {
                                    myBuilder.orWhere((builder1: any) => {
                                        // continue with the rest of the query 
                                        rec(query, builder1)
                                    })
                                    break
                                }
                            }
                        }
                    }
                    rec(query, builder)
                }).toSQL().toNative()

            return result

            break // TODO: only 1 table for now
        }
        return null
    }

    async runQuery(json: any) {
        const bq = this.buildQuery(json)
        if (!bq) throw { message: 'query could not be generated' }

        // without this, it doesn't work; this seems an easy way to resolve it; 
        let q = bq.sql
        for (let i = 1; i < bq.bindings.length + 1; i++) {
            q = q.replace('$' + i, '?')
        }

        if (!this.knexInstance)
            throw 'knex not initialized'

        const result = await this.knexInstance.raw(q, bq.bindings)
        return result.rows
    }


}