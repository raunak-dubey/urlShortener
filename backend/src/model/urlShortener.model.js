import mongoose from "mongoose";

const urlShortenerSchema = new mongoose.Schema({
    originalUrl: {  
        type: String, 
        required: true 
    },
    shortUrl: { 
        type: String, 
        required: true, 
        index: true,
        unique: true,
    },
    clicks: { 
        type: Number, 
        default: 0, 
        required: true 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
    }
  }
);
const urlShortener = mongoose.model("urlShortener", urlShortenerSchema);
export default urlShortener;