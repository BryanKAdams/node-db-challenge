exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();
      tbl.string("projectName");
      tbl.string("projectDescription");
      tbl.boolean("Completed");
    })
    .createTable("tasks", tbl => {
      tbl.increments();
      tbl.string("taskDescription");
      tbl.string("taskNotes");
      tbl.boolean("Completed");
      tbl
        .integer("projectId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")

        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("resources", tbl => {
      tbl.increments();
      tbl.string("resourceName");
      tbl.string("resourceDescription");
    })
    .createTable("project_resource", tbl => {
      tbl.increments();
      tbl
        .integer("projectId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("resourceId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resources")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("project_resource")
    .dropTableIfExists("resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("projects");
};
