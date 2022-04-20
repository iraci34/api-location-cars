import Location from "../models/Location";
import User from "../models/User";
import Car from "../models/Car";


class LocationController {
  async index(req, res) {
    const { user_id } = req.headers;

    const locations = await Location.find({ user: user_id }).populate("car");
    return res.json(locations);
  }

  async store(req, res) {
    const { user_id } = req.headers;
    const { car_id } = req.params;
    const { date_in, date_out } = req.body;

    const car = await Car.findById(car_id);
    if (!car) {
      return res.status(400).json({ error: "Carro inexistente." });
    }

    const user = await User.findById(user_id);
    if (String(user._id) === String(car.user)) {
      return res.status(401).json({ error: "Locação não permitida." });
    }

    const location = await Location.create({
      user: user_id,
      car: car_id,
      date_in,
      date_out,
    });

    const populateLocation = await Location.findOne({ _id: location._id })
      .populate("user")
      .populate("car")
      .exec();

    return res.json(populateLocation);
  }

  async destroy(req, res) {
    const { location_id } = req.body;

    await Location.findByIdAndDelete({ _id: location_id });

    return res.json({ message: "Locação Excluída" });
  }
}

export default new LocationController();
