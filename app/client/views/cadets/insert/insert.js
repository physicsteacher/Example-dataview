var pageSession = new ReactiveDict();

Template.CadetsInsert.rendered = function() {
	
};

Template.CadetsInsert.events({
	
});

Template.CadetsInsert.helpers({
	
});

Template.CadetsInsertInsertForm.rendered = function() {
	

	pageSession.set("cadetsInsertInsertFormInfoMessage", "");
	pageSession.set("cadetsInsertInsertFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.CadetsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("cadetsInsertInsertFormInfoMessage", "");
		pageSession.set("cadetsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var cadetsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(cadetsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("cadetsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("cadets", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("cadetsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Cadets.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("cadets", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.CadetsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("cadetsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("cadetsInsertInsertFormErrorMessage");
	}
	
});
