import mongoose from "mongoose";

const cruiseSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    startLocation:{
        type: String,
        required: true
    },
    endLocation:{
        type: String,
        required: true
    },
    BannerLink:{
        type: String,
        required: true
    },
    SomeMoreImages:[{
        type: String,
        required: true
    }]
});

const Cruise = mongoose.models.Cruise || mongoose.model('Cruise', cruiseSchema);
export default Cruise;