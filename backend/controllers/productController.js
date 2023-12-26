const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require('cloudinary');

// Create Product -- admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    // console.log("req.body");
    let images = [];
    if (typeof req.body.images === "string") images.push(req.body.images)
    else images = req.body.images;

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        })

        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    // console.log(req.body.iamges);

    req.body.images = imagesLink;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
});



// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();

    let apiFeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
    // .pagination(resultPerPage);

    let products = await apiFeatures.query;
    const filteredProductsCount = products.length;

    apiFeatures = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

    // const products = await Product.find();
    // let products = await apiFeatures.query;
    products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount,

    });
});



// Update Product -- admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    // handle images Delete Old Ones and Upload new ones
    console.log(req.body);
    let images = [];

    if (typeof req.body.images === "string") images.push(req.body.images)
    else images = req.body.images;

    if (req.body.images !== undefined) {
        for (let i = 0; i < product.images.length; i++) {

            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLink = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            })

            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLink;
    }


    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        product,
    });
});



// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    // Deleting Images from Cloudinary
    for (let i = 0; i < product.images.length; i++) {

        await cloudinary.v2.uploader.destroy(product.images[i].public_id);

    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product Successfully Deleted",
    });
});


// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        success: true,
        product,
        // productCount,
    });
});


// Create a new Review or Update a review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    } else {
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Review Created / Modified Successfully",
    });
});


// Get All reviews of a single product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(
            new ErrorHandler(`No such Product found with ID: ${req.query.id}`, 400)
        );
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(
            new ErrorHandler(
                `No such Product found with ID: ${req.query.productId}`,
                400
            )
        );
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    product.reviews = reviews;

    if (product.reviews.length === 0) {
        product.ratings = 0;
    } else {
        let avg = 0;
        product.reviews.forEach((rev) => {
            avg += rev.rating;
        });
        product.ratings = avg / product.reviews.length;
    }

    product.numberOfReviews = product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: `Review Deleted Successfully`,
    });
});



// Get All Products (admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});
