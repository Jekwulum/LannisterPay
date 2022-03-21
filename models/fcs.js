const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const fcsSchema = new Schema({
    fee_id: { type: String, required: true },
    fee_currency: { type: String, required: true },
    fee_locale: { type: String, required: true },
    fee_entity: { type: String, required: true },
    entity_property: { type: String, required: true },
    apply: { type: String, default: true, required: true },
    fee_type: { type: String, required: true },
    fee_value: { type: String, required: true }
});

const FCS = mongoose.model('FCS', fcsSchema);

module.exports = FCS;