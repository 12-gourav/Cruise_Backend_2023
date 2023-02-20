import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }

},{timestamps:true});

const Login = mongoose.model("Login",loginSchema);
export default Login;