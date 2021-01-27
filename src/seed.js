const { Category } = require("./models/category");
const { Property } = require("./models/property");
const { User } = require("./models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const data = [
  {
    name: "Apartments",
    properties: [
      {
        title: "Los Angeles Empire",
        description: "Nice view and amazing garden",
        location: {
          coordinates: {
            lat: "-73.766493",
            lng: "41.8777632",
          },
        },
        price: 1000000,
        currency: "USD",
        images: [],
      },
      {
        title: "Las Vegas Empire",
        description: "Nice view and amazing garden from Las Vegas Empire",
        location: {
          coordinates: {
            lat: "-73.766493",
            lng: "41.8777632",
          },
        },
        price: 2000000,
        currency: "EUR",
        images: [],
      },
    ],
  },
  {
    name: "Villas",
    properties: [
      {
        title: "New York Empire",
        description: "Nice view and amazing garden from New York",
        location: {
          coordinates: {
            lat: "-73.766493",
            lng: "41.8777632",
          },
        },
        price: 3000000,
        currency: "EUR",
        images: [],
      },
      {
        title: "Chicago Empire",
        description: "Nice view and amazing garden from Chicago Empire",
        location: {
          coordinates: {
            lat: "-73.766493",
            lng: "41.8777632",
          },
        },
        price: 4000000,
        currency: "USD",
        images: [],
      },
    ],
  },
  {
    name: "Offices",
    properties: [
      {
        title: "Illinois Empire",
        description: "Nice view and amazing garden from Illinois",
        location: {
          coordinates: {
            lat: "-73.766493",
            lng: "41.8777632",
          },
        },
        price: 5000000,
        currency: "USD",
        images: [],
      },
      {
        title: "Washington DC Empire",
        description: "Nice view and amazing garden from Washington DC Empire",
        location: {
          coordinates: {
            lat: "-73.766493",
            lng: "41.8777632",
          },
        },
        price: 6000000,
        currency: "EUR",
        images: [],
      },
    ],
  },
];

async function seed() {
  const db = "mongodb://localhost:27017/realestate";

  await mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  await Property.deleteMany({});
  await Category.deleteMany({});
  await User.deleteMany({});

  for (let category of data) {
    const { _id: categoryId } = await new Category({
      name: category.name,
    }).save();
    const properties = category.properties.map(property => ({
      ...property,
      category: { _id: categoryId, name: category.name },
    }));

    await Property.insertMany(properties);
  }

  const user = await new User({
    name: "appname",
    email: "admin@appname.com",
    password: "12345",
    isAdmin: true,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  mongoose.disconnect();
  console.info("Done!");
}

seed();
