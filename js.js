const button= document.getElementById('searchBtn');
const subject= document.getElementById('subject');
const num = document.getElementById('number');
const display=document.getElementById('tenorDisplay');
const my_key='PHV1INB3YF7E';

button.addEventListener('click', tenorSearch);

function tenorSearch()
{
    
    let my_subject = subject.value;
    let my_number = num.value;
    /*
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.tenor.com/v1/search?q=${my_subject}&key=${my_key}&limit=${my_number}`, true);

    xhr.onload = function (){
        if(xhr.status === 200){
            
            let responseResult= JSON.parse(xhr.responseText);
            let responseTenors=responseResult.results;           
           
            display.innerHTML='';
            responseTenors.forEach ((tenor)  => {
                
                display.innerHTML+=`<img src=${tenor.media[0].gif.url} class='gif'>`;
                
            });
        } else if (xhr.status === 404){
            console.log('Content not found');
        }
    };

    xhr.send();
    */
   fetch(`https://api.tenor.com/v1/search?q=${my_subject}&key=${my_key}&limit=${my_number}`)
   .then(res=>res.json())
   .then(data => {
       let responseTenors=data.results
       display.innerHTML='';
            responseTenors.forEach ((tenor)  => {
                
                display.innerHTML+=`<img src=${tenor.media[0].gif.url} class='gif img-thumbnail'>`;
                
            });
    })
   .catch((error) => {
    console.error('Error:', error);
  })
}

