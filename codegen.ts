import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/graphql/schema/schema.graphql',
  documents: 'src/graphql/**/*.gql',
  generates: {
    'src/graphql/generated/hooks.ts': {
      plugins: [
        'typescript-operations',
        'typescript-react-apollo',
        'typescript',
      ],
    },
    'src/graphql/generated/resolvers.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
        contextType: '../context#GraphQLContext',
      },
    },
  },
}

export default config
