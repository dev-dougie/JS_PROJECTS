window.onload = function(){

class App{
    constructor(){

        this.repositories = [];

        this.formEl =  document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById('repo-list')

        this.registrarRepo();
    }


    registrarRepo(){
        this.formEl.onsubmit = event => this.addRepo(event)
    }

    setLoading(loading = true){

        if(loading === true){
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando...'));
            loadingEl.setAttribute('id', 'loading');

            this.formEl.appendChild(loadingEl);

        }else{
            document.getElementById('loading').remove();
        };

    }

    addRepo(event){

        
        event.preventDefault(); //does not let the "submit action" reload the page by default.

        const repoInput = this.inputEl.value;

        if(repoInput.length === 0)
            return alert('Usuário não informado!');

        this. setLoading();

         axios.get(`https://api.github.com/users/${repoInput}`)
        .then(resolve =>{ const {avatar_url, bio, html_url, name} = resolve.data
        
            this.repositories.push({

                avatar_url,
                bio,
                html_url,
                name})

                this.renderRepo()

                this.inputEl.value = '';
        
        }).catch(resolve => alert('O usuário informado não existe!'))
        
        this.setLoading(false)
        
    }

    renderRepo(){

         this.listEl.innerHTML = "";

         this.repositories.forEach(repo => {

            let listItemEl = document.createElement('li');

            let imgEl = document.createElement('img')
            imgEl.setAttribute('src', repo.avatar_url);

            let nameEl = document.createElement('strong');
            nameEl.appendChild(document.createTextNode(repo.name));

            let bioEl = document.createElement('p');
            bioEl.appendChild(document.createTextNode(repo.bio));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank')
            linkEl.setAttribute('href', repo.html_url)
            linkEl.appendChild(document.createTextNode(' 👉🏽 Acessar repositório no Github'))

            listItemEl.appendChild(imgEl)
            listItemEl.appendChild(nameEl)
            listItemEl.appendChild(bioEl)
            listItemEl.appendChild(linkEl)

            this.listEl.appendChild(listItemEl)

         })




    }
}   

new App()


}