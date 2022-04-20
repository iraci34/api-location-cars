import User from "../models/User";

class SessionController {
  async store(req, res) {
    const { name, email, age, birthday } = req.body;

    let user = await User.findOne({ name, email });

    if (!user) {
      user = await User.create({
        name,
        email,
        age,
        birthday,
      });
    }

    return res.json(user);
  }
}

export default new SessionController();
