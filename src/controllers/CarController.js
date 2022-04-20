import Car from "../models/Car";
import * as Yup from 'yup';
import User from "../models/User";

class CarController {
  async index(req, res) {
    const { user_id } = req.headers;

    const cars = await Car.find({ user_id });
    
    return res.json(cars);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
    });

    const { filename } = req.file;
    const { description, price, location } = req.body;
    const { user_id } = req.headers;

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Não foi possível validar os dados' });
    }

    const car = await Car.create({
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
    });

    return res.json(car);
  }

  async update(req, res) {
    const { filename } = req.file;
    const { car_id } = req.params;
    const { description, price, location } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const cars = await Car.findById(car_id);

    if (String(user._id) !== String(cars.user)) {
      return res.status(401).json({ error: 'Não autorizado.' });
    }

    await Car.updateOne({ _id: car_id }, {
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
    })

    return res.send();
  }

  async destroy(req, res) {
    const { car_id } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const cars = await Car.findById(car_id);

    if (String(user._id) !== String(cars.user)) {
      return res.status(401).json({ error: 'Não autorizado.' });
    }

    await Car.findByIdAndDelete({ _id: car_id });

    return res.json({message: "Excluída com sucesso!" });
  }

}

export default new CarController();