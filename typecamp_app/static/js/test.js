var test_time = 0 // Время теста
var time_interval;
var timer;
var test_mistakes = 0; // Количество ошибок в тесте
var test_progress = 0; // Прогресс теста
var test_correct = 0; // Количество правильных нажатий
var test_words = 0; // Количество слов
var test_keys;
var test_results;
var keys_var = {'q':'keyq', 'w':'keyw', 'e':'keye', 'r':'keyr', 't':'keyt', 'y':'keyy', 'u':'keyu', 'i':'keyi', 'o':'keyo', 'p':'keyp', 'a':'keya', 's':'keys', 'd':'keyd', 'f':'keyf', 'g':'keyg', 'h':'keyh', 'j':'keyj', 'k':'keyk', 'l':'keyl', 'z':'keyz', 'x':'keyx', 'c':'keyc', 'v':'keyv', 'b':'keyb', 'n':'keyn', 'm':'keym', 'й':'keyq', 'ц':'keyw', 'у':'keye', 'к':'keyr', 'е':'keyt', 'н':'keyy', 'г':'keyu', 'ш':'keyi', 'щ':'keyo', 'з':'keyp', 'х':'bracketleft', 'ъ':'bracketright', 'ф':'keya', 'ы':'keys', 'в':'keyd', 'а':'keyf', 'п':'keyg', 'р':'keyh', 'о':'keyj', 'л':'keyk', 'д':'keyl', 'ж':'semicolon', 'э':'quote', 'я':'keyz', 'ч':'keyx', 'с':'keyc', 'м':'keyv', 'и':'keyb', 'т':'keyn', 'ь':'keym','б':'comma','ю':'period'}
var text = '';
function testStarter(task) {
    $('.main').on('click', function() {
        $('.invisible-input').focus();
    })
    test_keys = {'keyq':0, 'keyw':0, 'keye':0, 'keyr':0, 'keyt':0, 'keyy':0, 'keyu':0, 'keyi':0, 'keyo':0, 'keyp':0, 'bracketleft':0, 'bracketright':0, 'keya':0, 'keys':0, 'keyd':0, 'keyf':0, 'keyg':0, 'keyh':0, 'keyj':0, 'keyk':0, 'keyl':0, 'semicolon':0, 'quote':0, 'keyz':0, 'keyx':0, 'keyc':0, 'keyv':0, 'keyb':0, 'keyn':0, 'keym':0, 'comma':0, 'period':0, 'slash':0}
    test_mistakes = 0;
    test_progress = 0;
    test_correct = 0;
    test_time = 0;
    test_words = 0;
    $('.text-place').css({'top':'0px'})
    $('.start-block').addClass('d-none')
    $('.invisible-input').val('')
    $('.navbar').css({'opacity':'0'})
    setTimeout(function(){
        $('.navbar').addClass('d-none')
    },300)
    textCreator(task).then((data) => {
        text = data;
        let text_mas = text.split(" ")
        console.log(text_mas)
        let html = '<div class="cursor"></div>'
        let total_cnt = 0;
        $(`.stats-block`).css({'opacity':'0'})
        time_interval = setTimeout(function(){
            $(`.stats-block`).addClass('d-none')
            $(`.test-block`).removeClass('d-none')
            $(`.test-block`).css({'opacity':'100'})
        }, 300)
        
        for (let i = 0; i < text_mas.length; i++) {
            let shift_flag = false;
            if (text_mas[i].split('\n') > 1) {
                html += '<div class="word">'
            }
            else {

                html += '<div class="word">'
            }
            for (let j = 0; j < text_mas[i].length; j++) {
                if (text_mas[i][j] === '\n') {
                    html += `<span class="letter shift-style w-100" value="${total_cnt}"><i class="bi bi-arrow-return-left"></i></span><br>`
                    total_cnt += 1;
                    shift_flag = true;
                }
                else {
                    html += `<span class="letter" value="${total_cnt}">${text_mas[i][j]}</span>`
                    total_cnt += 1;
                }
            }
            
            if (!shift_flag) {
                html += `<span class="letter space-style" value="${total_cnt}"><i class="bi bi-x"></i></span>`
            }
            total_cnt += 1;
            html += '</div>'
        }
        $('.text-place').html(html)
        timer = setInterval(function(){
            test_time++
            statsUpdate()
        }, 1000)
        
    })
    
    
}

function testEventListener(){
    $('.main').on('click', function() {
        $('.invisible-input').focus();
    })
    $(document).keydown(function(e) {
        $('.invisible-input').focus();
        if (e.ctrlKey && e.keyCode == 13) {
            testStarter('test')
            $(document).off()
            
        }
    })
}

window.onload = function(){
    if ($('.btn-start').attr('value') === 'test') {
        introAnimation()
        testEventListener()
    }
    else {
        customEventListener()
    }
}

