


$('button').on('click', function() {   

    $('#search').text('In Progress'); 
    $('#search').text(' '); 
            
    //get the url and the whole address name
    $.getJSON('https://api.github.com/users/' + document.querySelector('#h-search').value + '/repos').then(function(results){
        
        //clear the result
        $('#result').text('');
        //loop every element and print it out
         i = 0;
        while(i < results.length) {
            
            $('#result').append((i + 1) + '. ' + results[i].name + '<br />');
            i++;
        } 
        //if the user search something that is not in the repository,output error message
    }, function(error) {
    $('#result').text(''); 
    $('#result').append('Error!' + '<br />');
    console.log('Error!');
    });
});


let searchesTemplate = $('#searches-template').html();
let rendersearches = Handlebars.compile(searchesTemplate);
let searches = [];

//when the user click button, post the searches and output the time
$('button').on('click', function() {
    let searchBody = $('#h-search').val();
    $.ajax({
      type: 'POST', 
        url: 'http://localhost:3000/api/searches',
        data: { 
        term: searchBody,
        createdAt: new Date()
        }
    }).then(function(response) {
        console.log(response); 
        searches.push(response);
        //go over the result and put the value to searches
        $('#saveResults').html(rendersearches({
            searches: searches
        })); 
    });
});

