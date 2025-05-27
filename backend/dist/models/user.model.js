import crypto from "crypto";
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema({
    name: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refresh_token: { type: String },
    password_reset_token: { type: String },
    password_reset_expires: { type: Date },
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.password_reset_token = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.password_reset_expires = new Date(Date.now() + 10 * 60 * 1000);
    return resetToken;
};
export const User = mongoose.model("User", userSchema);
