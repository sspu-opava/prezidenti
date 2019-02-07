/* Funkce shuffle náhodně zamíchá prvky v poli */
function shuffle(array) {
    var ctr = array.length, temp, index;

// Dokud v poli zbývají nějaké prvky
    while (ctr > 0) {
// Vytvoří náhodný index z rozsahu pole
        index = Math.floor(Math.random() * ctr);
// Sníží ukazatel o jedničku
        ctr--;
// Prohodí prvky mezi ukazatelem a náhodně zvoleným indexem
        temp = array[ctr];
        array[ctr] = array[index];
        array[index] = temp;
    }
    return array;
}

$(function(){   
    /* Skryje blok result */
    $('#result').hide();
    /* Skryje všechny odstavce mezi nadpisy h4 v sekci ustava */
    $('#ustava h4').nextAll('p').hide();

    /* Při kliknutí na nadpis h4 v sekci ustava provede: */
    $('#ustava h4').on('click',function(){
        /* Jestliže jsou odstavce pod nadpise h4 skryté, zvýrazní nadpis h4 barevně (modře), v opačném případě budou zabarveny šedě */
        if ($(this).nextUntil('h4').is(':hidden')) {
            $(this).css({'background-color':'rgb(43, 69, 126)'});
        } else {
            $(this).css({'background-color':'#444'});
        }
        /* Střídavě zobrazuje / skrývá odstavce pod nadpisem h4, na který uživatel kliknul. Akce trvá 500 ms.*/
        $(this).nextUntil('h4').toggle(500);
    });

    /* Prochází všechny objekty v poli prezidenti a vytváří seznam odkazů na stránky o prezidentech */
    prezidenti.forEach(function(obj) {
        $('#odkazy ul').append('<li><a href="'+obj.link+'">'+obj.name+'</a></li>');
    });    

    function initQuiz() {
        /* Vyprázdní obsah oddílu pro zobrazení kvízu */
        $('#kviz div.row').html('');
        /* Prochází všechny objekty v poli prezidenti a vytváří blok s obrázkem a popiskem */
        prezidenti.forEach(function(obj, index) {
            /* Metoda append přidává do elementu další obsah -  tj. novou figuru s fotkou a popiskem */
            $('#kviz div.row').append('<div class="col-md-4"><figure id="'+index+'"><img src="img/prezident0.jpg" alt="Foto prezidenta" class="img-fluid"><figcaption>'+obj.name+'</figcaption></figure></div>');
            //$('#kviz div.row').append('<div class="col-md-4"><figure id="'+index+'"><img src="img/'+obj.photo+'" alt="'+obj.name+'"><figcaption>'+obj.name+'</figcaption></figure></div>');
        });    
    
        /* Událost při kliknutí na obrázek v sekci kviz */
        $('#kviz figure img').on('click', function(event){
            /* Vygeneruje náhodný index podle délky pole prezidenti */
            index = Math.floor(Math.random() * prezidenti.length);
            /* Změní atributy obrázku podle objektu, na který zrovna ukazuje proměnná index */
            $(this).attr('src','img/' + prezidenti[index].photo).attr('alt',prezidenti[index].name);

            /* Jestliže byla při vyvolání události stisknuta klávesa ALT */
            if (event.altKey) {
                /* Změna titulku modálního okna - jméno prezidenta*/
                $('.modal').find('.modal-title').text(prezidenti[index].name);
                /* Změna těla modálního okna - data narození a úmrtí, popis */
                var modalBody = '<p>Narození: <b>' + prezidenti[index].borned + (prezidenti[index].died ? '</b>, úmrtí: <b>' + prezidenti[index].died : '') + '</b></p>';
                modalBody +=  '<hr><p>' + prezidenti[index].description + '</p>';
                $('.modal').find('.modal-body').html(modalBody);
                /* Zobrazení modálního okna, je možné jej také ovládat pomocí klávesnice */
                $('.modal').modal({
                    keyboard: true
                });
            }
        });
    
        /* Při vstupu myši na fotku prezidenta se objeví žlutý rámeček */
        $('#kviz figure img').on('mouseenter', function(){
            $(this).css({'border':'3px solid yellow'});
        });
    
        /* Když myš opustí fotku prezidenta, rámeček zmizí */
        $('#kviz figure img').on('mouseleave', function(){
            $(this).css({'border':'none'});
        });
    }

    /* Vyvolání funkce pro inicializaci kvízu */
    initQuiz();

    /* Po kliknutí na tlačítko Ověření dojde k prověření správnosti odpovědí */
    $('button#overeni').on('click', function(){
        /* Do proměnné se ukládá počet správných odpovědí */
        var correct = 0;
        /* Prochází se všechny objekty v poli prezidenti, v proměnné obj je uložen aktuální objekt, index označuje aktuální prvek pole */
        prezidenti.forEach(function(obj, index) {
            /* Jestliže prvek pod uvedeným indexem obsahuje stejný název obrázku jaký je v proměnné obj  */
            if ($('figure[id='+index+']').children('img').attr('src') == 'img/'+ obj.photo) {
                /* znamená to, že uživatel uhádl a obrázek je ohraničen zeleně */
                $('figure[id='+index+']').children('img').css({'border':'3px solid green'});
                /* přičte se správná odpověď */
                correct++;
            } else {
                /* nesprávná odpověď, obrázek se ohraničí červeně */
                $('figure[id='+index+']').children('img').css({'border':'3px solid red'});
            }            
        });  
        /* Výpočet procentuální úspěšnosti zaokrouhlený na celá čísla */
        var result = Math.round((correct / prezidenti.length) * 100);
        /* Výpis výsledku do elementu s id result */
        $('#result').html('Naše prezidenty znáte na <b>' + result + ' %</b>').show(); 
    });    


    /* Při kliknutí na tlačítko Zamíchat dojde k náhodnému umístění prvků v poli prezidenti a znovu se zobrazí kvíz */
    $('button#zamichat').on('click', function(){
        prezidenti = shuffle(prezidenti);
        initQuiz();
    });   
    
    var perlickaIndex = -1;

    /* Zajistí zobrazení jedné "Perličky" v sekci Víte, že */
    function doYouKnow() {
        /* Když by perlickaIndex přesáhl rozsah pole, je nastaven na začátek - 0 */
        perlickaIndex = perlickaIndex < perlicky.length-1 ? perlickaIndex + 1 : 0;
        /* Zajistí změnu zobrazení titulku a obsahu článku */
        $('#perlicky article h4').text(perlicky[perlickaIndex].title);
        $('#perlicky article p').text(perlicky[perlickaIndex].text);
    }

    doYouKnow();

    /* Tlačítko Další mění obsah článku */
    $('button#dalsi').on('click', function(){
        doYouKnow();
    });   
    
    /* Automatická změna fotek a popisků prezidentských sídel každých 5000 ms */
    var sidloIndex = 0;
    window.setInterval(function(){
        sidloIndex = sidloIndex < sidla.length-1 ? sidloIndex + 1 : 0;
        $('#sidlo img').attr('src', 'img/' + sidla[sidloIndex].photo).attr('alt', sidla[sidloIndex].place);
        $('#sidlo figcaption').text(sidla[sidloIndex].place);
    }, 5000);

})