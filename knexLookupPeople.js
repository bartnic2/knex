var knex = require('knex')(require('./knexfile').development)
let name = process.argv[2];

// Can also write connection in the following way:
// connection: 'postgres://stoshfabricius:@localhost:5432/oscars'
// or
// connection: {
//   user: 'stoshfabricius',
//   pass: '',
//   database: 'oscars',
//   host: 'localhost',
//   port: 5432
// }

function findName(name){
  knex.select().from('famous_people').where("last_name", "=", name).orWhere("first_name", "=", name).asCallback(function(err, rows){
    if(err) {
      return console.error(err);
    }
    console.log("Searching...")
    console.log(`Found ${rows.length} person(s) by the name '${name}':`)
    for(row of rows){
      console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born ${row.birthdate.toDateString()}`)
    }
  });
}

findName(name);

// insert([{},{},...])

// Insert will take single object or array