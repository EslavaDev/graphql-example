
# CONSULTAS DE GRAPHQL

## Querys
```
query getSingleCourse($courseId: Int!) {
  course(id: $courseId) {
    title
    url
  }
}

query getCourses($topic: String) {
  courses(topic: $topic) {
    topic
    author
    title
  }
}
```
## Query con Fragments
```
query getCoursesFragment($id: Int!, $id2: Int!) {
  course1: course(id: $id) {
    ...fields
  }
  course2: course(id: $id2) {
    ...fields
  }
}
```

## Mutation (hacer updates o saves)
```
mutation updateCourseTopic($idT: Int!, $topicT: String!) {
  updateCourseTopic(id: $idT, topic: $topicT) {
    ...fields
  }
}
```

## Fragments
```
fragment fields on Course {
  title
  author
  topic
  url
}
```
