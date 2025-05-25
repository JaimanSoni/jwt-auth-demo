import crypto from "crypto";
import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name?: string;
  username: string;
  password: string;
  refresh_token?: string;
  password_reset_token?: string;
  password_reset_expires?: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
  createPasswordResetToken(): string;
}

const userSchema = new Schema<IUser>({
  name: { type: String },
  username: { type: String, required: true, unique: true },
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
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.createPasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.password_reset_token = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.password_reset_expires = new Date(Date.now() + 10 * 60 * 1000);
  return resetToken;
};

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
