import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr(),
	link: DS.attr(),
	tweetid: DS.attr(),
	pointsgranted: DS.attr()
});
