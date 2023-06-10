const { request } = require("express");
const { Schema, Types } = require("mongoose");
const {
  CountryModel,
  StateModel,
  CityModel,
} = require("../models/geopgraphical");

// country?term=sdfsdfd

// state?term=dsfsdf&id_country=ObjectId()

// city?term=dsfsdf&id_state=ObjectId()

const ALLOWED_COLLECTIONS = {
  country: "country",
  state: "state",
  city: "city",
};

// TODO: Refactor this code later on

const getDocs = async (req = request, resp) => {
  const { collection = "" } = req.params;
  const { term } = req.query;
  const regex = new RegExp(term, "i");

  if (!Object.values(ALLOWED_COLLECTIONS).includes(collection))
    return resp.status(400).json({
      error: `Invalid collection, try: ${Object.values(
        ALLOWED_COLLECTIONS
      ).join("/ , ")}`,
    });

  if (!term) {
    return resp.status(400).json({ error: "Insert a seachParam" });
  }

  switch (collection) {
    case ALLOWED_COLLECTIONS.country:
      const [countries, totalDocs] = await Promise.all([
        CountryModel.find({ name: regex }),
        CountryModel.count(),
      ]);

      return resp.json({
        success: true,
        data: {
          totalDocs,
          results: countries || [],
        },
      });

    case ALLOWED_COLLECTIONS.state:
      const { id_country } = req.query;

      if (!id_country) return resp.json({ error: "id_country is required" });
      if (!Types.ObjectId.isValid(id_country))
        return resp.json({ error: "Invalid country id" });

      const states = await StateModel.find({
        $and: [{ id_country: new Types.ObjectId(id_country) }, { name: regex }],
      });

      return resp.json({
        success: true,
        data: {
          results: states || [],
        },
      });

    case ALLOWED_COLLECTIONS.city:
      const { id_state } = req.query;

      if (!Types.ObjectId.isValid(id_state))
        return resp.json({ error: "Invalid city id" });
      if (!id_state) return resp.json({ error: "id_city is required" });

      const cities = await CityModel.find({
        $and: [{ id_state: new Types.ObjectId(id_state) }, { name: regex }],
      });

      return resp.json({
        success: true,
        data: {
          results: cities || [],
        },
      });

    default:
      return resp.json({
        error: "We  haven't implement this feature yet !",
      });
      break;
  }
};

const ControllerSearch = Object.freeze({
  getDocs,
});

module.exports = ControllerSearch;
