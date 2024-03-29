var pageSession = new ReactiveDict();

Template.CadetsEdit.rendered = function() {
	
};

Template.CadetsEdit.events({
	
});

Template.CadetsEdit.helpers({
	
});

Template.CadetsEditEditForm.rendered = function() {
	

	pageSession.set("cadetsEditEditFormInfoMessage", "");
	pageSession.set("cadetsEditEditFormErrorMessage", "");

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

Template.CadetsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("cadetsEditEditFormInfoMessage", "");
		pageSession.set("cadetsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var cadetsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(cadetsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("cadetsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("cadets", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("cadetsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Cadets.update({ _id: t.data.cadet._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.CadetsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("cadetsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("cadetsEditEditFormErrorMessage");
	}
	
});
