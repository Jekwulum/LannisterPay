require('dotenv').config();
const fcsDB = require('../models/fcs');
const { handleFCS, handleFee } = require('../utils');


apiController = {
    fees: async(req, res) => {
        const payload = req.body;
        await handleFCS(req, res, payload, fcsDB);
    },
    compute_transaction_fee: async(req, res) => {
        const payload = req.body;
        if (payload.Currency !== 'NGN') return res.status(200).json({ Error: `No fee configuration for ${payload.Currency} transactions.` });
        const fee_locale = (payload.CurrencyCountry === payload.PaymentEntity.Country) ?
            'LOCL' : 'INTL';
        const entity_props = payload.PaymentEntity.Brand;
        const fee_entity = payload.PaymentEntity.Type;

        results = await fcsDB.find({
            fee_locale: { '$in': [fee_locale, '*'] },
            fee_entity: { '$in': [fee_entity, '*'] },
            entity_property: { '$in': [entity_props, '*'] }
        });
        const FCS = results[results.length - 1];

        const amount = payload.Amount;
        if (payload.Customer.BearsFee) {
            fee_charged = await handleFee(amount, FCS.fee_type, FCS.fee_value);
            fee_charged = Math.round(fee_charged);
            let chargeAmount = amount + fee_charged;
            let settlementAmount = chargeAmount - fee_charged;

            return res.status(200).json({
                AppliedFeeID: FCS.fee_id,
                AppliedFeeValue: fee_charged,
                ChargeAmount: chargeAmount,
                SettlementAmount: settlementAmount
            })
        } else {
            fee_charged = await handleFee(amount, FCS.fee_type, FCS.fee_value);
            fee_charged = Math.round(fee_charged);
            let chargeAmount = amount;
            let settlementAmount = chargeAmount - fee_charged;

            return res.status(200).json({
                AppliedFeeID: FCS.fee_id,
                AppliedFeeValue: fee_charged,
                ChargeAmount: chargeAmount,
                SettlementAmount: settlementAmount
            });
        };
    }
};

module.exports = apiController;