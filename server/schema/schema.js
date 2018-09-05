const graphql = require("graphql");
const _ = require("lodash");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

//dummy data
let books = [
    { name: "Name of the wind", genre: "Fantasy", id: "1", authorId: "1" },
    { name: "The Final fantasy", genre: "Fantasy", id: "2", authorId: "2" },
    { name: "The long home", genre: "Sci-Fi", id: "3", authorId: "3" },
    { name: "The hero of ages", genre: "Fantasy", id: "4", authorId: "2" },
    { name: "The magic color", genre: "Fantasy", id: "5", authorId: "3" },
    { name: "The light fantastic", genre: "Fantasy", id: "5", authorId: "3" }
];

let authors = [
    { name: "Patrick", age: 22, id: "1" },
    { name: "Tom", age: 54, id: "2" },
    { name: "Peter", age: 14, id: "3" }
];

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id });
            }

        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code to get data from db
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }
        }
    }

});

module.exports = new GraphQLSchema({
    query: RootQuery
});
