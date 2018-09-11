const express = require("express");
const graphqlHTTP = require("express-graphql");

const schema = require("./schema/schema.js");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors()); //allow CORS
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
app.listen(8081, () => console.log("server running"));
