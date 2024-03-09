import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/resolvers/**/*.graphql',
  documents: 'src/app/**/*.gql',
  generates: {
    'src/gql-types.generated.ts': {
      plugins: ['typescript'],
    },
    'src/': {
      plugins: [
        'typescript-operations',
        'typescript-react-apollo',
        { add: { content: "import { ObjectId } from 'mongodb'" } },
      ],
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: 'gql-types.generated.ts',
      },
      config: {
        scalars: {
          ObjectId: 'ObjectId',
        },
      },
    },
    'src/resolvers/resolvers.generated.ts': {
      plugins: [
        'typescript',
        'typescript-resolvers',
        {
          add: {
            content: "import { ObjectId } from 'mongodb'",
          },
        },
      ],
      config: {
        useIndexSignature: true,
        contextType: '../graphql/context#GraphQLContext',
        maybeValue:
          'T extends PromiseLike<infer U> ? Promise<U | null> : T | null',
        scalars: {
          ObjectId: 'ObjectId',
        },
      },
    },
  },
}

export default config
