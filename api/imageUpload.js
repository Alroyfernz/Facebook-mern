const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dsolobwu0",
  api_key: "277311334619679",
  api_secret: "sy3iqAl-ItR1c6U3Fh86CNiLs7c",
});

module.exports = {
  uploadImage: async (photo) => {
    try {
      const res = await cloudinary.uploader.upload(photo, {
        allowed_formats: ["jpg", "png"],
        public_id: "",
        folder: "facebookImages",
      });

      return res.secure_url;
    } catch (e) {
      console.log("error in cloud");
    }
  },
};
