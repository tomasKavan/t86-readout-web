
import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:4000/graphql',
  documents: ['src/graphql/**/*.gql'],
  ignoreNoDocuments: true,
  generates: {
    'src/graphql/types/': {
      preset: 'client',
      config: {
        useTypeImports: true
      }
    }
  },
  config: {
    dedupeFragments: true
  },
  watch: true
}

export default config;
