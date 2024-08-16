// import { Schema, Types, Document, model } from "mongoose";
// import bcrypt from "bcrypt";

// interface IUser extends Document {
//   username: string;
//   email: string;
//   password: string;
//   image: string;
//   verified: boolean;
//   createdAt: Date;
//   sendToken: () => string;
//   compare: (password: string) => Promise<boolean>;
//   sendVerification: () => void;
//   sendForget: () => void;
// }

// const userSchema = new Schema<IUser>({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     min: 6,
//     max: 30,
//     select: false,
//   },
//   image: {
//     type: String,
//   },
//   createdAt: {
//     type: Date,
//     immutable: true,
//     defautl: () => Date.now(),
//   },
//   verified: {
//     type: Boolean,
//     default: false,
//   },
// });

// userSchema.pre("save", async function (next) {
//   const user = this;
//   if (!user.isModified) return;

//   const salt = await bcrypt.genSalt(10);
//   const password = await bcrypt.hash(user.password, salt);

//   user.password = password;
//   return next();
// });

// userSchema.pre("save", async function (next) {
//   try {
//     const user = this;
//     if (!user.isNew) return;
//     const image = await createImage(500, 500);
//     const upload = await uploadImage(image);
//     user.image = upload.secure_url;

//     return next();
//   } catch (e) {
//     console.log(e);
//   }
// });

// userSchema.pre("findOneAndDelete", async function (next) {
//   const user = await this.model.findOne(this.getFilter());
//   const imageId = user.image.split("/").at(-1);
//   removeImage(imageId);
//   next();
// });

// userSchema.methods.sendToken = function () {
//   const user = this;

//   try {
//     const token = jwt.sign(user.email, process.env.JWT_SECRET || "");
//     return token;
//   } catch (e) {
//     console.log(e);
//   }
// };

// userSchema.methods.compare = async function (password: string) {
//   const user = this;

//   try {
//     const isPassword = await bcrypt.compare(password, user.password);
//     return isPassword;
//   } catch (e) {
//     console.log(e);
//   }
// };

// userSchema.methods.sendVerification = async function () {
//   const user = this;

//   const token = jwt.sign(String(user._id), process.env.JWT_SECRET || "");
//   const url = `${process.env.CLIENT_URI}/verify?token=${token}`;

//   sendMail(
//     user.email,
//     "Verify Email",
//     `hey ${user.username},`,
//     "Thanks For registering for an account on Discord clone! Before we get started,we just need to confirm that this is you. Click below to verify your email address:",
//     url,
//     "Verify Email"
//   );
// };

// userSchema.methods.sendForget = async function () {
//   const user = this;

//   const token = jwt.sign(String(user._id), process.env.JWT_SECRET || "");
//   const url = `${process.env.CLIENT_URI}/forget?token=${token}`;

//   sendMail(
//     user.email,
//     "Change Password",
//     `hey ${user.username},`,
//     "Your Discord password can be reset by clicking the button below. If you did not request a new password, please ignore this email.",
//     url,
//     "Reset Password"
//   );
// };

// const User = model<IUser>("User", userSchema);

// export default User;
// export type { IUser };
