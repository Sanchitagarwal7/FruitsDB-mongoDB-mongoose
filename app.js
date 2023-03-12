//jshint esversion:6

// const { MongoClient } = require("mongodb");
// // Connection URI
// const url ="mongodb://localhost:27017";

// Create a new MongoClient
// const client = new MongoClient(url);
// async function run() {
//   try {
//     // Connect the client to the server (optional starting in v4.7)
//     await client.connect();
//     // Establish and verify connection
//     await client.db("fruitsDB").command({ ping: 1 });
//     console.log("Connected successfully to server");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir); 


// async function run() {
//   try {
//     const database = client.db("fruitsDB");
//     const foods = database.collection("fruits");
//     // create an array of documents to insert
//     const docs = [
//       { name: "Apple", score: 8, review: "Great fruit" },
//       { name: "Orange", score: 6, review: "Kinda sour" },
//       { name: "Banana", score: 9, review: "Great stuff" }
//     ];
//     // this option prevents additional documents from being inserted if one fails
//     const options = { ordered: true };
//     const result = await foods.insertMany(docs, options);
//     console.log(`${result.insertedCount} documents were inserted`);
//   } finally {
//     await client.close();
//   }
// }

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser: true});

const Schema = mongoose.Schema;

const fruitSchema  = new Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  rating: 10,
  review: "Peaches are yummy"
});

// const kiwi = new Fruit ({
//   name: "Kiwi",
//   rating: 6,
//   review: "Eh Its Okay"
// });

// const orange =  new Fruit({
//   name: "Orange",
//   rating: 9,
//   review: "Sour but good..."
// });

// const banana = new Fruit ({
//   name: "Banana",
//   rating: 4,
//   review: "Taste weird"
// });

//OUTDATED CODE
// Fruit.insertMany([apple, kiwi, orange, banana], function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Success");
//   }
// });

//UPDATED CODE TO INSERT MANY FRUITS IN A SINGLE TIME

// Fruit.insertMany([fruit, kiwi, orange, banana])
//       .then(function () {
//         console.log("Successfully saved fruits to DB");
//       })
//       .catch(function (err) {
//         console.log(err);
//       });

const pomegranate = new Fruit ({
  name: "Pomegranate",
  rating: 8,
  review: "Difficult to spell!"
});

const pineapple = new Fruit ({
  name: "Pineapple",
  rating: 9,
  review: "Great Stuff!"
});

// pomegranate.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const people = new Person ({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple
});

// people.save();

Fruit.find({})
  .then((fruits)=>{
    setTimeout(function() { mongoose.connection.close();}, 500);
    console.log(
      fruits.forEach(function(fruit){
        console.log(fruit.name);
      }));
  })
  .catch((err)=>{
    console.log(err);
  });


//UPDATING AND NAMING THE FRUIT WITH MISSING NAME: PEACH 

// Fruit.updateOne({_id:"640dad3c31fbafafe7c85581"}, {name: "Peach"})
//   .then((fruits)=>{
//     console.log("Success");
//   })
//   .catch((err)=>{
//     console.log(err);
//   });
// ;

Person.updateOne({_id:"640ddf409c3534c9590c46d3"}, {favouriteFruit: pomegranate})
  .then((fruits)=>{
    console.log("Success");
  })
  .catch((err)=>{
    console.log(err);
  });
;



Fruit.deleteOne({_id:"640dad3c31fbafafe7c85581"})
  .then((fruits)=>{
    console.log("Deleted");
  })
  .catch((err)=>{
    console.log(err);
  });
;
