$(document).ready(function(){
  
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  
	$("form#email-form input[type=email]").focus(function(){
		
		if(regex.test($("form#email-form input[type=email]").val()) == false && $("form#email-form input[type=email]").val() !== ""){
			$("form#email-form input[type=email]").addClass("invalid");
		}else{
  		$(this).removeClass("invalid");
  }
		
	});
	$('form#email-form input[type=email]').keypress(function (e) {
    $(this).removeClass("invalid");
		if (e.which == 13) {
			$('form#email-form').submit();
			return false;
		}
	});
	$("form#email-form").submit(function(e) {
		e.preventDefault();
		
		if(regex.test($("form#email-form input[type=email]").val()) == false || $("form#email-form select[name=TYPE]").val() == ""){
  		if($("form#email-form select[name=TYPE]").val() == ""){
    		$("form#email-form select[name=TYPE]").addClass("invalid");
  		}else{
    		$("form#email-form select[name=TYPE]").removeClass("invalid");
  		}
  		
  		if(regex.test($("form#email-form input[type=email]").val()) == false){
  			$("form#email-form input[type=email]").addClass("invalid");
  		}else{
  			$("form#email-form input[type=email]").removeClass("invalid");
  		}
		
		}else{
			$.ajax({
				type: $("form#email-form").attr('method'),
				url: $("form#email-form").attr("action"),
				data: $("form#email-form").serialize(), // serializes the form's elements.
				cache: false,
				dataType: 'json',
				contentType: "application/json; charset=utf-8",
				beforeSend: function(){
					//Change Button Image
					$("form#email-form input[type=email], form#email-form select[name=TYPE]").removeClass("invalid");
					$("form#email-form input[type=submit]").attr("disabled","disabled").val("Subscribing");
				},
				success: function(data)
				{
					if (data.result != "success") {
						$(".response-message").addClass("error").removeClass("success hide");
            gtag('event', 'sign_up', {
              'event_category': 'engagement',
              'event_label': 'error',
              'value': data.result
            });
					}else{
						$(".response-message").addClass("success").removeClass("error hide");
						$("form#email-form input[type=email]").val("");
						$("form#email-form select[name=TYPE]").get(0).selectedIndex = 0;
            gtag('event', 'sign_up', {
              'event_category': 'engagement',
              'event_label': 'success',
              'value': data.result
            });
					}
					
					$("form#email-form input[type=submit]").removeAttr("disabled","disabled").val("SUBSCRIBE");
					
					setTimeout(function() {
						$(".response-message").fadeOut("fast", function() {
							$(".response-message").addClass("hide").removeClass("error success").removeAttr("style");
						});
					}, 5000);
				}
			});
		}
	});

});