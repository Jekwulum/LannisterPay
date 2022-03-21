const handleFCS = async(req, res, x, db) => {
    y = x.FeeConfigurationSpec.split('\n');

    for (let i = 0; i < y.length; i++) {
        temp = y[i].split(" ");

        new_data = {
            fee_id: temp[0],
            fee_currency: temp[1],
            fee_locale: temp[2],
            fee_entity: temp[3].split("(")[0],
            entity_property: temp[3].split("(")[1].split(")")[0],
            apply: temp[5],
            fee_type: temp[6],
            fee_value: temp[7]
        };

        let recordExists = await db.findOne({ fee_id: new_data.fee_id });
        if (recordExists) {
            return res.status(400).json(`${new_data.fee_id} already exists`);
        }
        let new_fcs = await new db(new_data);
        await new_fcs.save(async(err, responseObj) => {
            if (err) {
                console.log("error whilst saving to db", err);
            } else {
                console.log("success");
            }
        });;
    };
    return res.status(200).json({ status: "ok" });
};

const handleFee = async(amount, fee_type, fee_value) => {
    if (fee_type === 'FLAT') {
        return amount + fee_value;
    } else if (fee_type === 'PERC') {
        let applied_fee_val = (parseFloat(fee_value) / 100) * amount;
        return applied_fee_val;
    } else if (fee_type === 'FLAT_PERC') {
        let flat = parseInt(fee_value.split(':')[0])
        let perc = parseFloat(fee_value.split(':')[1]);
        let applied_fee_val = flat + ((perc / 100) * amount);
        return applied_fee_val;
    }
};

module.exports = { handleFCS, handleFee };