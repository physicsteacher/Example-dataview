Template.Home.rendered = function() {
	
};

Template.Home.events({
	
});

Template.Home.helpers({
	
});

Template.HomeHomeJumbotron.rendered = function() {
	
};

Template.HomeHomeJumbotron.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("cadets", {});
	}
	
});

Template.HomeHomeJumbotron.helpers({
	
});
