var pageSession = new ReactiveDict();

Template.Cadets.rendered = function() {
	
};

Template.Cadets.events({
	
});

Template.Cadets.helpers({
	
});

var CadetsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("CadetsViewSearchString");
	var sortBy = pageSession.get("CadetsViewSortBy");
	var sortAscending = pageSession.get("CadetsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["rank", "name", "phone", "email", "Address", "tos", "dob"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var CadetsViewExport = function(cursor, fileType) {
	var data = CadetsViewItems(cursor);
	var exportFields = ["rank", "name", "phone", "email", "Address", "tos", "dob"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.CadetsView.rendered = function() {
	pageSession.set("CadetsViewStyle", "table");
	
};

Template.CadetsView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("CadetsViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("CadetsViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("CadetsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("cadets.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		CadetsViewExport(this.cadets, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CadetsViewExport(this.cadets, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CadetsViewExport(this.cadets, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CadetsViewExport(this.cadets, "json");
	}

	
});

Template.CadetsView.helpers({

	

	"isEmpty": function() {
		return !this.cadets || this.cadets.count() == 0;
	},
	"isNotEmpty": function() {
		return this.cadets && this.cadets.count() > 0;
	},
	"isNotFound": function() {
		return this.cadets && pageSession.get("CadetsViewSearchString") && CadetsViewItems(this.cadets).length == 0;
	},
	"searchString": function() {
		return pageSession.get("CadetsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("CadetsViewStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("CadetsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("CadetsViewStyle") == "gallery";
	}

	
});


Template.CadetsViewTable.rendered = function() {
	
};

Template.CadetsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("CadetsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("CadetsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("CadetsViewSortAscending") || false;
			pageSession.set("CadetsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("CadetsViewSortAscending", true);
		}
	}
});

Template.CadetsViewTable.helpers({
	"tableItems": function() {
		return CadetsViewItems(this.cadets);
	}
});


Template.CadetsViewTableItems.rendered = function() {
	
};

Template.CadetsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		Router.go("cadets.details", {cadetId: this._id});
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Cadets.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Cadets.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("cadets.edit", {cadetId: this._id});
		return false;
	}
});

Template.CadetsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }
	

	
});
