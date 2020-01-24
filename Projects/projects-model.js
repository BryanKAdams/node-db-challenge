const db = require("../db-config");

module.exports = {
  getProjects,
  getProjectTasks,
  insert
};

function getProjects(id) {
  let query = db("projects");
  if (id) {
    query.where("projects.id", id).first();

    const promises = [query, this.getProjectTasks(id)];
    return Promise.all(promises).then(function(results) {
      let [projects, tasks] = results;

      if (projects) {
        projects.tasks = tasks;
        return projects;
      } else {
        return null;
      }
    });
  } else {
    return db("projects");
  }
}

function insert(project) {
  return db("projects")
    .insert(project, "id")
    .then(([id]) => this.getProjects(id));
}

function getProjectTasks(id) {
  return db("tasks").where("tasks.projectId", id);
}
