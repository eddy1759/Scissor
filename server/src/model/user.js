import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: 'Passwords do not match',
      },
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  const user = this;
  if (this.isModified('password') || this.isNew) {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  }
  return next();
});

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(this.password, password);
};

module.exports = mongoose.model('User', UserSchema);
