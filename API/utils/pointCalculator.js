var calculator = {

	calculatePoints: function (dollarAmount) {
		return Math.floor(dollarAmount/10);
	}
};

module.exports = calculator;