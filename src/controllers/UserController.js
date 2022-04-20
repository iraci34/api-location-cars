import User from "../models/User";

class UserController {
  async show(req, res) {
    const { user_id } = req.headers;

    const users = await User.find({ user: user_id });

    return res.json({ users });
    } 

  async update(req, res) {
    const { name, email, age, birthday } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(401).json({ error: 'Não autorizado.' });
    }

    await User.updateOne({
      name,
      email,
      age,
      birthday,
    })

    return res.send();
  }  
}

export default new UserController();