const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");
const { createTokenForUser } = require('../services/authentication');

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  profileImageURL: {
    type: String,
    default: "/images/default.svg",
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
}, { timestamps: true });

// Hash password before saving user
userSchema.pre("save", async function(next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    const salt = await generateSalt();
    const hashedPassword = await hashPassword(user.password, salt);

    user.salt = salt;
    user.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

// Generate salt
async function generateSalt() {
  return randomBytes(16).toString("hex");
}

// Hash password
async function hashPassword(password, salt) {
  return createHmac("sha256", salt)
    .update(password)
    .digest("hex");
}

// Match password and generate token
userSchema.statics.matchPasswordAndGenerateToken = async function(email, password) {
  try {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User Not Found");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = await hashPassword(password, salt);

    if (hashedPassword !== userProvidedHash) throw new Error("Incorrect password");

    const tokenPayload = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileImageURL: user.profileImageURL,
      role: user.role,
    };
    const token = await createTokenForUser(tokenPayload);
    return token;
  } catch (error) {
    throw error;
  }
};

const User = model("user", userSchema);
module.exports = User;