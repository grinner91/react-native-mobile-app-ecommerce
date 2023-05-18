import { Schema, model } from "mongoose";

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
  role: String, //customer or admin,
  time: String,
  disable: Boolean, //A disable user cannot login to system
  // location: {
  //   type: {
  //     type: String, // Don't do `{ location: { type: String } }`
  //     enum: ["Point"], // 'location.type' must be 'Point'
  //     required: false,
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: false,
  //     sparse: true,
  //   },
  //},
});

//userSchema.index({ location: "2dsphere" });

const UsersModel = model("Users", userSchema);

export default UsersModel;

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
