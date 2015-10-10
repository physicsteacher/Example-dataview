Meteor.publish("cadets", function() {
	return Cadets.find({}, {});
});

Meteor.publish("cadets_empty", function() {
	return Cadets.find({_id:null}, {});
});

Meteor.publish("cadet", function(cadetId) {
	return Cadets.find({_id:cadetId}, {});
});

