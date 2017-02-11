import DS from 'ember-data';

export default DS.Model.extend({
	userid: DS.attr(),
	emailaddress: DS.attr(),
	password: DS.attr(),
	usertype: DS.attr()
});
