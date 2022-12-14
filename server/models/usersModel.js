import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  profile_picture: {
    type: Object,
    required: true
  },
  posted_recipes: [{ type: Schema.Types.ObjectId, ref: "cocktail" }],
  favourite_recipes: [{ type: Schema.Types.ObjectId, ref: "cocktail" }]
}, { timestamps: true })

const userModel = mongoose.model("user", userSchema);
export { userModel }