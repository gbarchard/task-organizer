import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/graphql/schema/schema.graphql',
  documents: 'src/graphql/**/*.gql',
  generates: {
    'src/graphql/generated/': {
      preset: 'client',
      plugins: [
        'typescript',
        'typescript-resolvers',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
}

export default config
