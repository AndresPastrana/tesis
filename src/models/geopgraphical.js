const { model, Schema } = require("mongoose");
const CountrySchema = new Schema({
    name: {
        type: "String",
        required: true,
        unique: true,
      },
})


const StateSchema = new Schema({
    name: {
        type: "String",
        required: true,
        unique: true
    },
    id_country: {
        type: Schema.Types.ObjectId,
        ref: 'Country',
        required : true,
    },

})
const CitySchema = new Schema({
    name: {
        type: "String",
        required: true,
        unique: true
    },
    id_state: {
        type: Schema.Types.ObjectId,
        ref: 'State',
        required: true,
    },
    
})



const CountryModel = model('Country',CountrySchema);
const StateModel = model('State',StateSchema);
const CityModel = model('City',CitySchema);

module.exports ={
    CountryModel,StateModel,CityModel
}