const express = require('express');
const router = express.Router();
const product = require('../controller/products');
const addProduct = require('../validations/addProducts')
const validator = require('../middlewares/validator')
const upload = require('../middlewares/multer');
const UploadToCloudinary = require('../middlewares/cloudinary');
const authMiddle = require('../middlewares/auth');
const restircTo = require('../middlewares/restircTo');
const catchAsync = require('../utils/catchAsync');


router.post('/', authMiddle, restircTo("admin"), validator(addProduct), product.addProduct);
router.put('/:id', authMiddle, restircTo("admin"), product.editProduct);
router.delete('/:id', authMiddle, restircTo("admin"), product.deleteProduct);
router.patch('/soft-delete/:id', authMiddle, restircTo("admin"), product.softDeleteProduct);

router.route('/upload').post(
    authMiddle,
    restircTo("admin"),
    upload.single('product'),
    catchAsync(async (req, res, next) => {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image provided' });
        }
        const result = await UploadToCloudinary(req.file.buffer);
        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            url: result.secure_url,
        });
    })
);

router.get('/', product.getAllProducts);
router.get('/status', product.getStatus);
router.get('/deleted', product.getDeletedProducts);
router.get('/:id', product.getOneProduct);

module.exports = router;