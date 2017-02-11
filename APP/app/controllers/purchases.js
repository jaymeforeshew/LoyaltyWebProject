import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['customerID', 'minimum'],
	customerID: 11,
	minimum: 40
});
