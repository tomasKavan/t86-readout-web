import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client/core'
import { buildClientSchema } from 'graphql'
import introspection from './graphql/schema-introspection.json'
import Big from 'big.js'
import { withScalars } from 'apollo-link-scalars'

const schema = buildClientSchema(introspection as any)

const typesMap = {
  // adapt names to your server scalar names
  Big: {
    parseValue: (value: string) => new Big(value), // incoming -> Big
    serialize: (value: Big) => value.toString(),   // outgoing -> string
  },
  BigDecimal: {
    parseValue: (v: string) => new Big(v),
    serialize: (v: Big) => v.toString(),
  },
  Decimal: {
    parseValue: (v: string) => new Big(v),
    serialize: (v: Big) => v.toString(),
  }
}

const anyTypeMap = typesMap as any
const scalarLink = withScalars({ schema, typesMap: anyTypeMap })
const httpLink = new HttpLink({ uri: '/graphql' })

export const apolloClient = new ApolloClient({
  link: from([scalarLink, httpLink]),
  cache: new InMemoryCache()
})