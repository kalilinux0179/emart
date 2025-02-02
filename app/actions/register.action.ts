"use server"
import connectDB from "@/lib/db";
import {AuthModel} from "../models/auth.model";
import bcrypt from "bcryptjs";

export async function RegisterAction(previousState: unknown, formdata: FormData) {
    try {
        const fullname = formdata.get("fullname") as string;
        const email = formdata.get("email") as string;
        const password = formdata.get("password") as string;
        if (!fullname || !email || !password) {
            return {
                success: false,
                error: "All fields are required",
            }
        }
        console.log(fullname, email, password);
        await connectDB();
        console.log("db connected")
        const user = await AuthModel.findOne({ email });
        if (user) {
            return {
                success: false,
                error: "User already exists",
            }
        }
        console.log("user is ", user)
        const hashedPassword = await bcrypt.hash(password, 10);
        await AuthModel.create({
            fullname,
            email,
            password: hashedPassword,
        });
        console.log("Registration successful");
        return {
            success: true,
            message: "Registration successful"
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: "Registration failed",
        }
    }

}

