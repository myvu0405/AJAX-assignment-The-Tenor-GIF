const button= document.getElementById('searchBtn');
const subject= document.getElementById('subject');
const num = document.getElementById('number');
const display=document.getElementById('tenorDisplay');
const my_key='PHV1INB3YF7E';

button.addEventListener('click', tenorSearch);

function tenorSearch()
{
    
    let my_subject = subject.value;
    let my_number = parseInt(num.value);
    
    //error handling for user input
    if (my_subject=='') {
        display.innerHTML="<p class='error'>Please enter a subject!</p>";
        return;
    } else if (isNaN(my_number) || my_number<1 || my_number>50){
        display.innerHTML="<p class='error'>Please enter a valid number between 1-50!</p>";
        return;
    }
    /*
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.tenor.com/v1/search?q=${my_subject}&key=${my_key}&limit=${my_number}`, true);

    xhr.onload = function (){
        if(xhr.status === 200){
            
            let responseResult= JSON.parse(xhr.responseText);
            let responseTenors=responseResult.results;       
            
            //if no data/gif returns
            if(responseTenors.length===0) {

                display.innerHTML="<p class='error'>No data returns. Please try your search again!</p>";
                return;
            }
            
            display.innerHTML='';
            responseTenors.forEach ((tenor)  => {
                
                display.innerHTML+=`<img src='${tenor.media[0].gif.url}' class='gif img-thumbnail'>`;
                
            });
            //erase/reset the search form
            subject.value='';
            num.value='';
        } else if (xhr.status === 404){
            display.innerHTML="<p class='error'>Error occurs. Please try your search again!</p>";
            
            //console.log('Content not found');
        }
    };

    xhr.send();
    */
     
    fetch(`https://api.tenor.com/v1/search?q=${my_subject}&key=${my_key}&limit=${my_number}`)
    .then(res=>res.json())
    .then(data => {
        let responseTenors=data.results;
        //if no data/gif returns
        if(responseTenors.length===0) {

            display.innerHTML="<p class='error'>No data returns. Please try your search again!</p>";
            return;
        }
        //if any data returns ==> show data
        display.innerHTML='';
        responseTenors.forEach ((tenor)  => {
                
                display.innerHTML+=`<img src='${tenor.media[0].gif.url}' class='gif img-thumbnail'>`;
                
        });
        //erase the search form
        subject.value='';
        num.value='';
    })
    .catch((error) => {
        display.innerHTML=`<p class='error'>Error occurs: ${error}. Please try your search again!</p>`;
        //console.error('Error:', error);
    })
}

