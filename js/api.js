document.addEventListener("DOMContentLoaded", function(){
    console.log('carregou');  
  let cepMasked = IMask(document.getElementById('inputCEP'), {mask: '00000-000'});
  
  cepMasked.on("complete", function(){
   
  let cepPuro = cepMasked.unmaskedValue;
  console.log(cepPuro);
    
    let urlBuscaCep = `https://viacep.com.br/ws/${cepPuro}/json/`;
    //console.log(urlBuscaCep);
    
    fetch(urlBuscaCep)
      .then(res => res.json())
      .then(dadosCep => {
          document.getElementById('inputState').value = dadosCep.uf;
          document.getElementById('inputCity').value = dadosCep.localidade;
          document.getElementById('inputDistrict').value = dadosCep.bairro;
          document.getElementById('inputStreet').value = dadosCep.logradouro;
          document.getElementById('inputNumber').focus();
      });
    
    
  })
  
});

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