import path from 'path'
import { loadFilesSync } from '@graphql-tools/load-files'

const typeDefs = loadFilesSync(path.join(process.cwd(), './**/*.graphql'))

export default typeDefs
