const express = require("express");
const app = express();
const Joi = require("joi");

app.use(express.json());

const courses = [
  { id: 1, name: "c1" },
  { id: 2, name: "c2" },
  { id: 3, name: "c3" }
];

app.get("/", (req, res) => {
  //to get excess to all the props expressjs.com
  res.send("hello world");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The course with given id was not found!");
  }
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

//update course
app.put("/api/courses/:id", (req, res) => {
  //look up the course
  // if not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The course with given id was not found!");
  }

  //validate
  //if invalid - return bad request
  const { error } = validateCourse(req.body);
  if (error) {
   return res.status(400).send(result.error.details[0].message);
  }

  //update the course
  course.name = req.body.name;

  //return updated course
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  //look up the course
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send("The course with given id was not found!");
  }

  //delete
    const index =  courses.indexOf(course)
    courses.splice(index, 1);
    res.send(course);

  //return the same course
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(course, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
//app.post();
//app.put();
//app.delete();
