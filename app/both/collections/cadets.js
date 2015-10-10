this.Cadets = new Mongo.Collection("cadets");

this.Cadets.userCanInsert = function(userId, doc) {
	return true;
}

this.Cadets.userCanUpdate = function(userId, doc) {
	return true;
}

this.Cadets.userCanRemove = function(userId, doc) {
	return true;
}
