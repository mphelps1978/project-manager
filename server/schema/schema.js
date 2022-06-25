const { projects, clients } = require('../sampleData')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList } = require('graphql')

// Mongoose Models
const Project = require('../models/Project')
const Client = require('../models/Client')


//client type
const clientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  })
})

// Project type
const projectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: clientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId)
      }
    }
  })
})


const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    projects: {
      type: new GraphQLList(projectType),
      resolve(parent, args) {
        return Project.find()
      }
    },
    project: {
      type: projectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id)
      } 
    }, 
    clients: {
      type: new GraphQLList(clientType),
      resolve(parent, args) {
        return Client.find()
      }
    },
    client: {
      type: clientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id)
      }
    }
    
  }
})

module.exports = new GraphQLSchema({
  query: rootQuery
})