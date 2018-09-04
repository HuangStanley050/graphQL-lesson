const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const schema = require("./schema/schema.js");

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.listen(process.env.PORT, () => console.log("server running"));
