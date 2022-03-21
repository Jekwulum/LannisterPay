const payloadValidator = async(req, res, next) => {
    if (!(req.body.ID && req.body.Amount && req.body.Currency && req.body.CurrencyCountry && req.body.Customer && req.body.PaymentEntity)) {
        return res.status(400).json("All fields required");
    } else {
        next();
    };
};

module.exports = payloadValidator;