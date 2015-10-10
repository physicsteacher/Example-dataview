this.CadetsEditController = RouteController.extend({
	template: "CadetsEdit",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("cadet", this.params.cadetId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		return {
			params: this.params || {},
			cadet: Cadets.findOne({_id:this.params.cadetId}, {})
		};
		/*DATA_FUNCTION*/
	},

	onAfterAction: function() {
	}
});