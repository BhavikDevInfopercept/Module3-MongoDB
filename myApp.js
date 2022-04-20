require('dotenv').config();
var mongoose = require("mongoose");

const mySecret = process.env['MONGO_URI']
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;
const personSchema = new Schema({
  name:  {type:String,required:true},
  age: Number,
  favoriteFoods: [String]
});

const Person  = mongoose.model('Person', personSchema);

const createAndSavePerson = function(done){
  var bhavik = new Person({name:"Bhavik Prajapati",age:23,favoriteFoods:["Pizza","Panipuri","Pulau"]});
  bhavik.save(function(err,data){
    if(err)
    {
      return console.error(err);
    }
    else
    {
      done(null , data);
    }
  });
};

const arrayOfPeople = [
    {name:"Jaydeep Kotak",age:23,favoriteFoods:["roti","sabji","gathiya"]},
    {name:"Jigar Sutariya",age:22,favoriteFoods:["paneer","sabji","gathiya"]},
    {name:"Vivek Vamja",age:23,favoriteFoods:["papad","chavana","puri"]}
  ];

const createManyPeople = function(arrayOfPeople, done){
  Person.create(arrayOfPeople, function (err, people) {
    if(err)
    {
      return console.log(err);
    }
    else
    {
      done(null, people);
    }
  });
};


const findPeopleByName = (personName, done) => {
  Person.find({name:personName},function(err,data){
    if(err)
    {
      return console.error(err);
    }
    else
    {
      done(null , data);
    }
  });
};

const findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods:food},function(err,data){
    if(err)
    {
      return console.error(err);
    }
    else
    {
      done(null , data);
    }
  });
};

const findPersonById = function(personId, done) {
  Person.findById(personId,function(err,data){
    if(err)
    {
      return console.error(err);
    }
    else
    {
      done(null , data);
    }
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,function(err,Person){
    if(err)
      return console.error(err);
    Person.favoriteFoods.push(foodToAdd);
    Person.save((err,updatePeson) => {
      if(err) 
      {
        return console.error(err);
      }
      else
      {
        done(null , updatePeson);
      }
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},function(err,updatedDoc){
      if(err)
      {
        return console.error(err);
      }
      else
      {
        done(null , updatedDoc);
      }
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,function(err,deletedData){
    if(err)
    {
      return console.error(err);
    }
    else
    {
      done(null,deletedData);
    }
  });  
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},function(err,data){
    if(err)
    {
      return console.error(err);
    }
    else
    {
      done(null , data);
    }
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch})
  .sort({name:1})
  .limit(2)
  .select({age:0})
  .exec(function(err,data){
      if(err)
        return console.error(err);
      done(null , data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
