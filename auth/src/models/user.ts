import mongoose from "mongoose";

// interface describe props required to create new user
interface UserAttrs {
  email: string
  password: string
}

// interface describe props user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// interface describe props that User document has
interface UserDoc extends mongoose.Document {
  email: string,
  password: string
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs)
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export {
  User
} 