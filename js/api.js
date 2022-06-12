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