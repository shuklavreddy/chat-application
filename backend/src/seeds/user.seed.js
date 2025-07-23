import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  // Male Users Only
  {
    email: "james.anderson@example.com",
    fullName: "James Anderson",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "william.clark@example.com",
    fullName: "William Clark",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "benjamin.taylor@example.com",
    fullName: "Benjamin Taylor",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "lucas.moore@example.com",
    fullName: "Lucas Moore",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "henry.jackson@example.com",
    fullName: "Henry Jackson",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "alexander.martin@example.com",
    fullName: "Alexander Martin",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    email: "daniel.rodriguez@example.com",
    fullName: "Daniel Rodriguez",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
  },
];

const femaleEmails = [
  "emma.thompson@example.com",
  "olivia.miller@example.com",
  "sophia.davis@example.com",
  "ava.wilson@example.com",
  "isabella.brown@example.com",
  "mia.johnson@example.com",
  "charlotte.williams@example.com",
  "amelia.garcia@example.com",
];

const maleEmails = seedUsers.map(user => user.email); // Extract emails of male users

const seedDatabase = async () => {
  try {
    await connectDB();

    // 1️⃣ Delete female users
    await User.deleteMany({ email: { $in: femaleEmails } });
    console.log("Deleted all female users.");

    // 2️⃣ Delete male users (to avoid duplicates)
    await User.deleteMany({ email: { $in: maleEmails } });
    console.log("Deleted existing male users to prevent duplication.");

    // 3️⃣ Insert only the male users
    await User.insertMany(seedUsers);
    console.log("Database seeded successfully with male users.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Call the function
seedDatabase();

