const router = require("express").Router();
const Story = require("../models/Story");
const { uploadImage } = require("../imageUpload");

router.post("/", async (req, res) => {
  const photo = req.body.photo;
  try {
    const photoUrl = photo && (await uploadImage(photo));
    const StoryCreated = new Story({
      userId: req.body.userId,
      photo: photoUrl,
      name: req.body.name,
      profile: req.body.profile,
    });
    const story = await StoryCreated.save();
    res.status(200).json(story);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
