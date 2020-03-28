//criando a table incidents
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        table.string('ong_id').notNullable();
        table.foreign('ong_id').references('id').inTable('ongs');

  });
};
//se fizer algo errado basta fazer um npx knex migrate:rollback para desfazer ultima migration:latest
exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
}