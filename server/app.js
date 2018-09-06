const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const schema = require("./schema/schema.js");
const mongoose = require("mongoose");

//database string
//mongodb://<dbuser>:<dbpassword>@ds123181.mlab.com:23181/gql-lesson
mongoose.connect("mongodb://dbadmin:test1234@ds123181.mlab.com:23181/gql-lesson", { useNewUrlParser: true });
mongoose.connection.once("open", () => {
    console.log("connected to database");
});

app.use("/graphql", graphqlHTTP({
    schema: schema,
    graphiql: true
}));
app.listen(process.env.PORT, () => console.log("server running"));
