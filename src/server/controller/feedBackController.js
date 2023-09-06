const FeedBack = require('../model/feedBackModel');

module.exports.addfeedback = async (req, res) => {
  const { feedback, rating } = req.body;
  const author = req.session.userId;
  try {
      const newfeedback = new FeedBack({ feedback, rating, author });
      await newfeedback.save();
      res.status(200).json(newfeedback);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
  }
};

module.exports.allfeedback = async (req, res) => {
    try {
        const newfeedback = await FeedBack.find();
        res.status(200).json(newfeedback);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
