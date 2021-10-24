const router = require("express").Router();
const Story = require("../models/Story");
router.post("/", async (req, res) => {
  const photo = req.body.photo;
  try {
    const photoUrl = photo && (await uploadImage(photo));
    const StoryCreated = new Story({
      userId: req.user.id,
      photoUrl: photoUrl,
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
