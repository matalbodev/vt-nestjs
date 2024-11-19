# VT nest JS

The goal of this application is to create a recipe builder.
We have Nest JS resource already created for the recipe, now we need to use some ingredients that can be added to the recipes.

## Minimal setup

- Docker desktop (or any other docker client)

## Technical details

Starting DB

`docker compose up -d`

Starting nest

`npm i` \
`npm run start:dev`

You'll have access to http://localhost:3000/api

Init DB with data

`npm run prisma:migrate` \
`npm run prisma:seed`

Checking data with prisma

`npm run prisma:studio`

### Notes Cedrick:
```
Au delà de la relation implicite, des endpoints et services ont été rajoutés à recipe pour demontrer l'utilisation de cette relation.
ce qui a été fait n'est pas exhaustif, je reste ouvert à toute demande d'ajout.

