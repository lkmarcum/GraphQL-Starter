const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = require("graphql");

const axios = require("axios");

// Launch Type
// const LaunchType = new GraphQLObjectType({
//   name: "Launch",
//   fields: () => ({
//     flight_number: { type: GraphQLInt },
//     mission_name: { type: GraphQLString },
//     launch_year: { type: GraphQLString },
//     launch_date_local: { type: GraphQLString },
//     launch_success: { type: GraphQLBoolean },
//     rocket: { type: RocketType }
//   })
// });

// // Rocket Type
// const RocketType = new GraphQLObjectType({
//   name: "Rocket",
//   fields: () => ({
//     rocket_id: { type: GraphQLString },
//     rocket_name: { type: GraphQLString },
//     rocket_type: { type: GraphQLString }
//   })
// });
const customers = [
  { id: "1", name: "John Doe", email: "jdoe@gmail.com", age: 35 },
  { id: "2", name: "Steve Smith", email: "steve@gmail.com", age: 25 },
  { id: "3", name: "Sarah Williams", email: "sarah@gmail.com", age: 32 }
];

// Customer Type
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        for (let i = 0; i < customers.length; i++) {
          if (customers[i].id === args.id) {
            return customers[i];
          }
        }
      }
    },
    customers: {
      type: GraphQLList(CustomerType),
      resolve(parent, args) {
        return customers;
      }
    }
    // launches: {
    //   type: new GraphQLList(LaunchType),
    //   resolve(parent, args) {
    //     return axios
    //       .get("https://api.spacexdata.com/v3/launches")
    //       .then(res => res.data);
    //   }
    // },
    // launch: {
    //   type: LaunchType,
    //   args: {
    //     flight_number: { type: GraphQLInt }
    //   },
    //   resolve(parent, args) {
    //     return axios
    //       .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
    //       .then(res => res.data);
    //   }
    // },
    // rockets: {
    //   type: new GraphQLList(RocketType),
    //   resolve(parent, args) {
    //     return axios
    //       .get("https://api.spacexdata.com/v3/rockets")
    //       .then(res => res.data);
    //   }
    // },
    // rocket: {
    //   type: RocketType,
    //   args: {
    //     id: { type: GraphQLInt }
    //   },
    //   resolve(parent, args) {
    //     return axios
    //       .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
    //       .then(res => res.data);
    //   }
    // }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
