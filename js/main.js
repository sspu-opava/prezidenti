function shuffle(array) {
    var ctr = array.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = array[ctr];
        array[ctr] = array[index];
        array[index] = temp;
    }
    return array;
}

$(function(){   
    $('#result').hide();
    $('#ustava h4').nextAll('p').hide();

    $('#ustava h4').on('click',function(){
        //$('#ustava h4').nextUntil('h4').toggle(500);
        if ($(this).nextUntil('h4').is(':hidden')) {
            $(this).css({'background-color':'rgb(43, 69, 126)'});
        } else {
            $(this).css({'background-color':'#444'});
        }
        $(this).nextUntil('h4').toggle(500);
    });

    prezidenti.forEach(function(obj) {
        $('#odkazy ul').append('<li><a href="'+obj.link+'">'+obj.name+'</a></li>');
    });    

    function initQuiz() {
        $('#kviz div.row').html('');
        prezidenti.forEach(function(obj, index) {
            $('#kviz div.row').append('<div class="col-md-4"><figure id="'+index+'"><img src="img/prezident0.jpg" alt="Foto prezidenta"><figcaption>'+obj.name+'</figcaption></figure></div>');
            /*$('#kviz div.row').append('<div class="col-md-4"><figure id="'+index+'"><img src="img/'+obj.photo+'" alt="'+obj.name+'"><figcaption>'+obj.name+'</figcaption></figure></div>');*/
        });    
    
        $('#kviz figure img').on('click', function(){
            //$(this).children('img').attr('src','img/' + prezidenti[$(this).attr('id')].photo).attr('alt',prezidenti[$(this).attr('id')].name);
            //$(this).children('figcaption').text(prezidenti[$(this).attr('id')].name);
            index = Math.floor(Math.random() * prezidenti.length);
            $(this).attr('src','img/' + prezidenti[index].photo).attr('alt',prezidenti[index].name);
        });
    
        $('#kviz figure img').on('mouseenter', function(){
            $(this).css({'border':'3px solid yellow'});
        });
    
        $('#kviz figure img').on('mouseleave', function(){
            $(this).css({'border':'none'});
        });
    }

    initQuiz();


    $('button#overeni').on('click', function(){
        var correct = 0;
        prezidenti.forEach(function(obj, index) {
            if ($('figure[id='+index+']').children('img').attr('src') == 'img/'+ obj.photo) {
                $('figure[id='+index+']').children('img').css({'border':'3px solid green'});
                correct++;
            } else {
                $('figure[id='+index+']').children('img').css({'border':'3px solid red'});
            }            
        });  
        var result = Math.round((correct / prezidenti.length) * 100);
        $('#result').html('Naše prezidenty znáte na <b>' + result + ' %</b>').show(); 
    });    

    $('button#zamichat').on('click', function(){
        prezidenti = shuffle(prezidenti);
        initQuiz();
    });   
    
    var perlickaIndex = -1;

    function doYouKnow() {
        perlickaIndex = perlickaIndex < perlicky.length-1 ? perlickaIndex + 1 : 0;
        $('#perlicky article h4').text(perlicky[perlickaIndex].title);
        $('#perlicky article p').text(perlicky[perlickaIndex].text);
    }

    doYouKnow();

    $('button#dalsi').on('click', function(){
        doYouKnow();
    });   
    
    var sidloIndex = 0;
    window.setInterval(function(){
        sidloIndex = sidloIndex < sidla.length-1 ? sidloIndex + 1 : 0;
        $('#sidlo img').attr('src', 'img/' + sidla[sidloIndex].photo).attr('alt', sidla[sidloIndex].place);
        $('#sidlo figcaption').text(sidla[sidloIndex].place);
    }, 5000);

})