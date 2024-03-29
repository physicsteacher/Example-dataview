var pageSession = new ReactiveDict();

Template.CadetsDetails.rendered = function() {
	
};

Template.CadetsDetails.events({
	
});

Template.CadetsDetails.helpers({
	
});

Template.CadetsDetailsDetailsForm.rendered = function() {
	

	pageSession.set("cadetsDetailsDetailsFormInfoMessage", "");
	pageSession.set("cadetsDetailsDetailsFormErrorMessage", "");

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

Template.CadetsDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("cadetsDetailsDetailsFormInfoMessage", "");
		pageSession.set("cadetsDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var cadetsDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(cadetsDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("cadetsDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("cadetsDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("cadets", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("cadets", {});
	}

	
});

Template.CadetsDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("cadetsDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("cadetsDetailsDetailsFormErrorMessage");
	}
	
});
