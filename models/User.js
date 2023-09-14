import { Schema, Types, model } from "mongoose";

let collection = "users";

let schema = new Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, default: "Argentina" },
    image: { type: String, required: true },
    online: { type: Boolean, default: false },
    google: { type: Boolean, default: false },
    verified: { type: Boolean, default: true },
    verified_code: { type: String },
    itineraries: [{ type: Types.ObjectId, ref: "itineraries" }],
  },
  {
    timestamps: true,
  }
);

let User = model(collection, schema);

export default User;
