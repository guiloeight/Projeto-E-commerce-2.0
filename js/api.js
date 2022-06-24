
// Login api change address data using ViaCep oficial site of zip code in Brazil

document.addEventListener("DOMContentLoaded", function(){
  // atribute variable data from front end input from Zipcode    
  let cepMasked = IMask(document.getElementById('inputZipcode'), {mask: '00000-000'});
  //After mask field start function
  cepMasked.on("complete", function(){
    // clean data from cepMasked variable
  let cepPure = cepMasked.unmaskedValue;
    //let variable urlBuscaCep access ViaCep oficial site of ZipCode in Brazil  
    let urlSearchZipCode = `https://viacep.com.br/ws/${cepPure}/json/`;
    //fetch in variable urlSearchZipCode
    fetch(urlSearchZipCode)
    //Json response
      .then(res => res.json())
      //Response fill field forms 
      .then(dataZipCode => {
        //Fill field State
          document.getElementById('inputState').value = dataZipCode.uf;
          //Fill field City
          document.getElementById('inputCity').value = dataZipCode.localidade;
          //Fill field District
          document.getElementById('inputDistrict').value = dataZipCode.bairro;
          //Fill field Street
          document.getElementById('inputStreet').value = dataZipCode.logradouro;
          //Focus in the field where is necessary fill data from user
          document.getElementById('inputNumber').focus();
      });    
  })
});

// End of api anddress

$(function () {

    window.verifyRecaptchaCallback = function (response) {
        $('input[data-recaptcha]').val(response).trigger('change')
    }

    window.expiredRecaptchaCallback = function () {
        $('input[data-recaptcha]').val("").trigger('change')
    }

    $('#contact-form').validator();

    $('#contact-form').on('submit', function (e) {
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data) {
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                    if (messageAlert && messageText) {
                        $('#contact-form').find('.messages').html(alertBox);
                        $('#contact-form')[0].reset();
                        grecaptcha.reset();
                    }
                }
            });
            return false;
        }
    })
});