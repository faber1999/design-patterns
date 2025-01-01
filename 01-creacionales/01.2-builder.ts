/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 */

import { COLORS } from '../helpers/colors.ts'

//! Tarea: crear un QueryBuilder para construir consultas SQL
/**
 * Debe de tener los siguientes métodos:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- si no se pasa ningún campo, se seleccionan todos con el (*)
 * - where(condition: string): QueryBuilder - opcional
 * - orderBy(field: string, order: string): QueryBuilder - opcional
 * - limit(limit: number): QueryBuilder - opcional
 * - execute(): string - retorna la consulta SQL
 * 
 ** Ejemplo de uso:
  const usersQuery = new QueryBuilder("users") // users es el nombre de la tabla
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log('Consulta: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */

//! Solución

class QueryBuilder {
  private provider?: 'sqlserver' | 'sqlite'

  private table?: string
  private fields: string[] = []
  private conditions: string[] = []
  private orderFields: string[] = []
  private limitCount?: number

  constructor(provider: 'sqlserver' | 'sqlite') {
    this.provider = provider
  }

  from(table: string): QueryBuilder {
    this.table = table
    return this
  }

  select(...fields: string[]): QueryBuilder {
    this.fields = fields
    return this
  }

  where(condition: string): QueryBuilder {
    this.conditions.push(condition)
    return this
  }

  orderBy(field: string, direction: 'ASC' | 'DESC' = 'ASC'): QueryBuilder {
    this.orderFields.push(`${field} ${direction}`)
    return this
  }

  limit(count: number | undefined): QueryBuilder {
    this.limitCount = count
    return this
  }

  private executeForSQLServer(): string {
    const fields = this.fields.length ? this.fields.join(', ') : '*'
    const conditionsClause = this.conditions.length ? ` where ${this.conditions.join(' and ')}` : ''
    const orderClause = this.orderFields.length ? ` order by ${this.orderFields.join(', ')}` : ''
    const limitClause = this.limitCount ? ` top ${this.limitCount}` : ''

    const query = `Select${limitClause} ${fields} from ${this.table}${conditionsClause}${orderClause};`

    return query
  }

  private executeForSqlite(): string {
    const fields = this.fields.length ? this.fields.join(', ') : '*'
    const conditionsClause = this.conditions.length ? ` where ${this.conditions.join(' and ')}` : ''
    const orderClause = this.orderFields.length ? ` order by ${this.orderFields.join(', ')}` : ''
    const limitClause = this.limitCount ? ` limit ${this.limitCount}` : ''

    const query = `Select ${fields} from ${this.table}${conditionsClause}${orderClause}${limitClause};`

    return query
  }

  execute(): string {
    if (this.provider === 'sqlserver') {
      return this.executeForSQLServer()
    } else if (this.provider === 'sqlite') {
      return this.executeForSqlite()
    } else {
      throw new Error('Provider not supported')
    }
  }
}

function main() {
  const table: string = 'reasons'
  const fields: string[] = ['id', 'name', 'description']
  const conditions: string[] = ['business_unit = 1092', `type = 'sales_channel'`]
  const limit: number | undefined = 1

  const queryBuilder = new QueryBuilder('sqlserver').from(table).select(...fields)

  conditions.forEach((condition) => {
    queryBuilder.where(condition)
  })

  queryBuilder.limit(limit)
  queryBuilder.orderBy('name', 'ASC')

  const queryString = queryBuilder.execute()

  console.log('%cConsulta:', COLORS.red)
  console.log(queryString)
}

main()
