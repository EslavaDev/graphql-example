const express = require('express')
const app = express();

const express_graphql = require('express-graphql')
const { buildSchema } = require('graphql')

//data
const {cursos} = require('./data.json');

const schema = buildSchema(`
    type Query {
        message: String
        course(id: Int!): Course
        courses(topic: String): [Course]
    }

    type Mutation{
        updateCourseTopic(id: Int!, topic: String!): Course
    }

    type Course{
        id: Int
        title: String
        description: String
        author: String
        topic: String
        url: String
    }
`);

let updateCourseTopic = (args) =>{
    let ids = args.id
    console.log(ids)
    cursos.map( curso => {
        if(curso.id === args.id){
            curso.topic = args.topic
            return curso
        }
    })
    return cursos.filter(curso => curso.id == args.id)[0]
}

let getCourse = (args) =>{
    let id = args.id;
    return cursos.filter(curso => curso.id == id)[0]
}

let getCourses = (args) => {
    if(args.topic){
        let topic = args.topic
        return cursos.filter(curso => curso.topic == topic)
    }else{
        return courses
    }
}

const root = {
    message: () => "hello world!",
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic
}

app.use("/graphql", express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(3000, () => console.log('server en el puerto 3000'))