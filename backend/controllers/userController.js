const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(
        req.body.avatar,
        {
            folder: 'avatars',
            width: 150,
            crop: 'scale'
        },
        // function (error, result) {
        //     console.log(result);
        // }
    );
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    });

    sendToken(user, 201, res);
})



// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given both email and password
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password"), 404);
    }

    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password"), 401);
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password"), 401);
    }

    sendToken(user, 200, res);

})



// Logout User
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out"
    });
})


// Forgot Password
exports.forgotUserPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("No User Found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });


    // const resetPasswordUrl = `http://localhost/api/v1/password/reset/${resetToken}`
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`

    const message = `Your Password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email please ignore it`;

    try {

        await sendEmail({
            email: user.email,
            subject: 'Ecommerce Password Recovery',
            message,

        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
})


// Reset Password
exports.resetUserPassword = catchAsyncErrors(async (req, res, next) => {
    // Creating Token Hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler("Reset Password Token is invalid or Timed out", 404));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords does not match", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

})


// Get user Details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});


// Update user Password
exports.updateUserPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const { oldPassword, newPassword, confirmPassword } = req.body;

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old Password is incorrect"), 401);
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("New Password does not match"), 401);
    }
    user.password = newPassword;
    await user.save();

    sendToken(user, 200, res);
});


// Update user Profile
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };
    // We will add cloudinary later

    if (req.body.avatar != "") {
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);
        const myCloud = await cloudinary.v2.uploader.upload(
            req.body.avatar,
            {
                folder: 'avatars',
                width: 150,
                crop: 'scale'
            });
            newUserData.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }

    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        message: `Profile updated successfully for User with id ${user._id}`,
    });
});


// Get All Users(admin)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// Get Single User(admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`No user Found with this ID: ${req.params.id}`, 400));
    }

    res.status(200).json({
        success: true,
        user,
    });
});


// Update user Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        email: req.body.email,
        name: req.body.name,
        role: req.body.role,
    };
    // We will add cloudinary later

    let user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`No user Found with this ID: ${req.params.id}`, 400));
    }

    user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        useFindAndModify: false,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        message: `User with id ${user._id} Role Updated successfully to ${user.role}`,
    });
});


// Delete User -- Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User Not Found For this ID: ${req.params.id}`, 400));
    }
    // Cloudinary
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});