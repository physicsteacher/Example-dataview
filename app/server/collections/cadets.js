Cadets.allow({
	insert: function (userId, doc) {
		return Cadets.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Cadets.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Cadets.userCanRemove(userId, doc);
	}
});

Cadets.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Cadets.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Cadets.before.remove(function(userId, doc) {
	
});

Cadets.after.insert(function(userId, doc) {
	
});

Cadets.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Cadets.after.remove(function(userId, doc) {
	
});
