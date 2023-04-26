import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import {mergeTypeDefs} from '@graphql-tools/merge'
import { userTypeDefs } from 'src/graphql/models/User';
import { roleTypeDefs } from 'src/graphql/models/Role';
import { userRoleTypeDefs } from 'src/graphql/models/UserRole';
import { rolePermissionTypeDefs } from 'src/graphql/models/RolePermission';
import { permissionTypeDefs } from 'src/graphql/models/Permission';
import { applicationTypeDefs } from 'src/graphql/models/Application';
import { tableDefinitionTypeDefs } from 'src/graphql/models/TableDefinition';
import { tableMigrationTypeDefs } from 'src/graphql/models/TableMigration';
import { fieldDefinitionTypeDefs } from 'src/graphql/models/FieldDefinition';
import { accessKeyTypeDefs } from 'src/graphql/models/AccessKey';
import { productTypeDefs } from 'src/graphql/models/Product';
import { relTableDefinitionApplicationTypeDefs } from 'src/graphql/models/RelTableDefinitionApplication';
import { userResolver } from 'src/graphql/resolvers/userResolver';
import { roleResolver } from 'src/graphql/resolvers/roleResolver';
import { userRoleResolver } from 'src/graphql/resolvers/userRoleResolver';
import { rolePermissionResolver } from 'src/graphql/resolvers/rolePermissionResolver';
import { permissionResolver } from 'src/graphql/resolvers/permissionResolver';
import { applicationResolver } from 'src/graphql/resolvers/applicationResolver';
import { tableMigrationResolver } from 'src/graphql/resolvers/tableMigrationResolver';
import { fieldDefinitionResolver } from 'src/graphql/resolvers/fieldDefinitionResolver';
import { accessKeyResolver } from 'src/graphql/resolvers/accessKeyResolver';
import { productResolver } from 'src/graphql/resolvers/productResolver';
import { scalarTypeResolver } from 'src/graphql/resolvers/scalarTypeResolver';
import { customGraphqlTypeDefs } from 'src/graphql/models/customGraphqlTypeDefs';
import { graphqlRelationFilterTypeDefs } from 'src/graphql/models/graphqlRelationFilterTypeDefs';
const types = [userTypeDefs,roleTypeDefs,userRoleTypeDefs,rolePermissionTypeDefs,permissionTypeDefs,applicationTypeDefs,tableDefinitionTypeDefs,tableMigrationTypeDefs,fieldDefinitionTypeDefs,accessKeyTypeDefs,productTypeDefs,relTableDefinitionApplicationTypeDefs,customGraphqlTypeDefs,graphqlRelationFilterTypeDefs]
const typeDefs = mergeTypeDefs(types)
const server = new ApolloServer({
  resolvers :[userResolver,roleResolver,userRoleResolver,rolePermissionResolver,permissionResolver,applicationResolver,tableMigrationResolver,fieldDefinitionResolver,accessKeyResolver,productResolver,scalarTypeResolver],
  typeDefs,
});

export default startServerAndCreateNextHandler(server);