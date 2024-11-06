import express from 'express';
import {VendorRegister, vendorLogin, getAllVendor, getvendorById} from "../controllers/vendorController.js"

const router = express.Router();

// Route for vendor registration
router.post('/register', VendorRegister);
router.post('/login',vendorLogin)

router.get('/all-vendors',getAllVendor)
router.get('/single-vendor/:id',getvendorById)

// Export the router
export default router;
