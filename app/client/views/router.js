Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

var freeRoutes = [
	"home",
	"cadets",
	"cadets.insert",
	"cadets.details",
	"cadets.edit"
];

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.map(function () {

	this.route("home", {path: "/", controller: "HomeController"});
	this.route("cadets", {path: "/cadets", controller: "CadetsController"});
	this.route("cadets.insert", {path: "/cadets/insert", controller: "CadetsInsertController"});
	this.route("cadets.details", {path: "/cadets/details/:cadetId", controller: "CadetsDetailsController"});
	this.route("cadets.edit", {path: "/cadets/edit/:cadetId", controller: "CadetsEditController"});
});
