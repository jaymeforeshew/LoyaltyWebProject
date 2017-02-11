import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr(),
	transactionid: DS.attr(),
	dollaramount: DS.attr(),
	pointsgranted: DS.attr()
});