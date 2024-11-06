import Firm from "../model/Firm.js";
import Vendor from "../model/Vendor.js";
import multer from "multer";

  // Configure Multer to store the uploaded files
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'E:\\Dctproject\\food\\backend\\uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+ Path2D.extname(file.originalname))
    }
  });
  
  const upload = multer({ storage: storage });

const addFirm = async(req,res)=>{
   try{
    const {firmName, area, category, region, offer} = req.body

    const image = req.file?req.file.filename:undefined

    const vendor = await Vendor.findById(req.vendorId)
    if(!vendor){
       return  res.status(404).json({message:"vendor not found"})
    }
    const firm = new Firm({
        firmName, area, category, region, offer,image, vendor:vendor._id
    })
    const savedFirm = await firm.save()
    vendor.firm.push(savedFirm)
    await vendor.save()
//used to push the firm to vendor firm
    return res.status(200).json({message:"Firm Added successfully"})
   }
   catch(error){
    return res.status(500).json("internal server error")
   }
}


const deleteFirmById = async (req, res) => {
  try {
      const firmId = req.params.firmId
      const deleteFirm = await Firm.findByIdAndDelete(firmId)
      if(!deleteFirm){
          return res.status(404).json({error:"No firm found"})
      }
  }
  catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
}

export default {addFirm:[upload.single('image'),addFirm],deleteFirmById}