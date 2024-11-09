import Buyer from "../model/Buyer.js"
import Product from "../model/Product.js";
import Seller from "../model/Seller.js"
import generateTokenAndSetCookie from "../utils/helper/cookies.js"
import { v2 as cloudinary } from "cloudinary";


const Adduser = async (req, res) => {
    // const { name, email, password, address, phone } = req.body
    try {
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.status(400).json({ message: "All fields are required" })
        }
        const buyer = await Buyer.create({ name, email, password })
        const seller = await Seller.create({ name, email, password })
        if(buyer && seller){
            generateTokenAndSetCookie(buyer._id, res);
            generateTokenAndSetCookie(seller._id, res);
        }
        res.status(201).json({ buyer,seller })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

const buyerInfoFill = async(req,res) => {
    try {
        const { name, email, password, address, phone } = req.body
        const id = req.user._id;
        const SearchBuyer = await Buyer.findById(id);
        if(SearchBuyer){
            SearchBuyer.name = name
            SearchBuyer.email = email
            SearchBuyer.password = password
            SearchBuyer.address = address
            SearchBuyer.phone = phone
            const buyer = await SearchBuyer.save()
            res.status(201).json({ buyer })
        }
        else{
            res.status(404).json({ message: "Buyer not found" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}



const sellerInfoFill = async(req,res) => {
    const {name,email,address,phone,Pname,Pdesc,Pprice,Pimage,image} = req.body;
    const id  = req.user?._id; 
    const SearchSeller = await Seller.findById(id);
    if(SearchSeller){
        if (Array.isArray(Pimage)) {
            for (let i = 0; i < Pimage.length; i++) {
                if (typeof Pimage[i] === "string" && Pimage[i].trim() !== "") {
                    try {
                        const uploadedResponse = await cloudinary.uploader.upload(Pimage[i]);
                        Pimage[i] = uploadedResponse.secure_url;
                    } catch (error) {
                        console.error("Error uploading image:", error);
                    }
                }
            }
        }
        const product = await Product.create({
            name:Pname,
            description:Pdesc,
            price:Pprice,
            image:Pimage
        })
        if (image) {
			const uploadedResponse = await cloudinary.uploader.upload(image);
			image = uploadedResponse.secure_url;
		}
        SearchSeller.name = name
        SearchSeller.email = email
        SearchSeller.address = address
        SearchSeller.image = image
        SearchSeller.phone = phone
        SearchSeller.Product.push(product._id)
        const seller = await SearchSeller.save()

        // now get the suggestion herre fetch the suggestion and pass the image or location
        // Fetch suggestions for recycling using the classify-scrap endpoint
        try {
            const response = await fetch("http://127.0.0.1:8000/classify-scrap/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(Pimage), // Pass the array of product images
            });

            if (!response.ok) {
                console.error("Failed to fetch suggestions:", await response.text());
                return res.status(500).json({ message: "Failed to fetch recycling suggestions" });
            }

            const suggestions = await response.json();

            res.status(201).json({
                seller,
                suggestions,
            });
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            res.status(500).json({ message: "An error occurred while fetching suggestions" });
        }
    }
    else{
        res.status(404).json({ message: "Seller not found" })
    }
}

const fetchProduct = async(req,res) => {
    try {
        const getProduct = await Product.find().populate("seller")
        console.log(getProduct,"getProduct");
        res.status(200).json(getProduct)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

const ShowProduct = async(req,res)=>{
    try {
        const {Pid} = req.params;
        const getProduct = await Product.findById(Pid).populate("seller")
        console.log("getProduct",getProduct);
        res.status(200).json(getProduct)
    } catch (error) {
        console.log(error)
        res.status(404).json(error);
    }
}

const Logout = async(req,res) => {
    res.clearCookie("jwt");
    res.status(200).json({message:"Logout successfully"})
}

const searchProduct = async(req,res) => {
    try {
        const {name} = req.query;
        const searchProduct = await Product.find({
            $or: [
                { name: { $regex: name, $options: "i" } },
                { description: { $regex: name, $options: "i" } },
            ],
        }).populate("seller")
        //now we need to sort according to the rating of the product 
        const sortedProduct = searchProduct.sort((a, b) => b.rating - a.rating);
        console.log(searchProduct,"searchProduct","sortedProduct",sortedProduct);
        res.status(200).json(sortedProduct)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

const giveFeedback = async (req, res) => {
    try {
        const { Pid } = req.params;
        const { feedback } = req.body;

        const product = await Product.findById(Pid);

        // const sentimentResponse = await axios.post('http://127.0.0.1:8000/analyze-feedback/', {
        //     feedback: feedback,
        //     vendor_id: product.vendor_id
        // });
        const sendedFeedback = {
            text: feedback,
        }
        console.log("Found product",sendedFeedback);
        const sentimentResponse = await fetch('http://127.0.0.1:8000/analyze-feedback/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendedFeedback)
        });
    
        // Parse the JSON response
        const data = await sentimentResponse.json();
        console.log('Received sentiment from FastAPI:', data.sentiment);
        if(data.sentiment){
            product.rating += 1;
        }else{
            product.rating -= 1;
        }

        const updatedProduct = await product.save();

        console.log(`Updated product rating: ${updatedProduct.rating}`);

        res.status(200).json({ updatedProduct });
    } catch (error) {
        console.log("Error in giveFeedback:", error);
        res.status(404).json({ error: error.message });
    }
};

export { Adduser, ShowProduct, Logout, buyerInfoFill, giveFeedback, searchProduct, sellerInfoFill, fetchProduct }