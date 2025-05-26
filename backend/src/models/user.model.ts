import crypto from "crypto";
import mongoose, { Document, Model, Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name?: string;
  username: string;
  email: string;
  password: string;
  refresh_token?: string | null;
  password_reset_token?: string | null;
  password_reset_expires?: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
  createPasswordResetToken(): string;
}

const userSchema = new Schema<IUser>({
  name: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refresh_token: { type: String },
  password_reset_token: { type: String },
  password_reset_expires: { type: Date },
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function (
  this: IUser,
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.createPasswordResetToken = function (this: IUser): string {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.password_reset_token = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.password_reset_expires = new Date(Date.now() + 10 * 60 * 1000);
  return resetToken;
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
