import mongoose, { Schema, model } from "mongoose";

const userSchema = Schema({
  _id: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true,
  },
  password: String,
  fullname: String,
  //customer or admin,
  role: { type: String, default: "customer" },
  //A disable user cannot login to system
  disable: { type: Boolean, default: false },
  time: { type: Date, default: Date.now },
});

//userSchema.index({ location: "2dsphere" });

const UserModel = model("User", userSchema);

export default UserModel;

export async function insertAdminUser() {
  try {
    const admin = {
      _id: new mongoose.Types.ObjectId(),
      email: "admin@miu.edu",
      password: "123",
      fullname: "Rafsan Zaman",
      role: "admin", //customer or admin,
    };
    await UserModel.create(admin);
  } catch (error) {
    console.log(error);
  }
}

/*
User 
{
    _id: ObjectId,
    email: String,
    password: String,
    role: String, //customer or admin,
    time: String,
    disable: Boolean, //A disable user cannot login to system
}

*/
