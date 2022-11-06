# Fixes Dato CMS problems with generation

# If not using npx
# graphql-codegen --config graphql-codegen.yml

npx graphql-codegen --config graphql-codegen.yml
sed -i .orig "s/CreatedAtAsc = 'createdAt_ASC',//g" lib/graphqlTypings.ts
sed -i .orig "s/CreatedAtDesc = 'createdAt_DESC',//g" lib/graphqlTypings.ts
sed -i .orig "s/UpdatedAtAsc = 'updatedAt_ASC',//g" lib/graphqlTypings.ts
sed -i .orig "s/UpdatedAtDesc = 'updatedAt_DESC',//g" lib/graphqlTypings.ts