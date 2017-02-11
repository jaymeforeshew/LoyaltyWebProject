import Ember from 'ember';

export default Ember.Route.extend({
	queryParams: {
		customerid: {
			refreshModel: true
		}
	},
	model(params) {
		return this.get('store').query('purchase', params);
	}
});
