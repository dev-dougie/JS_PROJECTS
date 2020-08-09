window.onload = function(){
    

    
    
    const inputEl = document.querySelector('#cep');
    const btnEl = document.querySelector('button')
    const inputBairro = document.querySelector('#bairro');
    const inputCidade = document.querySelector('#cidade');
    const inputLog = document.querySelector('#logradouro')
    

    ceps = JSON.parse(localStorage.getItem('local_storage')) || []




    addCep = () =>{


                let typedCep = inputEl.value;

                return (typedCep === '') ? alert('Informe um CEP válido!') : 
                
                
                axios.get(`https://viacep.com.br/ws/${typedCep}/json/`)
                .then(resolve => {

                    const {bairro, localidade, logradouro} = resolve.data;
                
                
                        inputBairro.setAttribute('value', bairro);
                        inputCidade.setAttribute('value', localidade)
                        inputLog.setAttribute('value', logradouro)

                        ceps.push(resolve);
                        console.log(ceps)

                }

                )
                .catch(err => console.log(err))  

                
    }


    
    btnEl.onclick = function(){
         addCep()
         saveToStorage();

    }

    saveToStorage = () => {
        localStorage.setItem('local_storage', JSON.stringify(ceps))
    }




}
