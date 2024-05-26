var test_time = 0 // Время теста
var time_interval;
var timer;
var test_mistakes = 0; // Количество ошибок в тесте
var test_progress = 0; // Прогресс теста
var test_correct = 0; // Количество правильных нажатий
var test_words = 0; // Количество слов
var text = '';
function testStarter(task) {
    test_mistakes = 0;
    test_progress = 0;
    test_correct = 0;
    test_time = 0;
    test_words = 0;
    $('.text-place').css({'top':'0px'})
    $('.start-block').addClass('d-none')
    $('.invisible-input').val('')

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
            if (text_mas[i].split('\n') > 1) {
                html += '<div class="word w-100">'
            }
            else {

                html += '<div class="word">'
            }
            for (let j = 0; j < text_mas[i].length; j++) {
                if (text_mas[i][j] === '\n') {
                    html += `<span class="letter shift-style w-100" value="${total_cnt}"><i class="bi bi-arrow-return-left"></i></span><br>`
                    total_cnt += 1;
                }
                else {
                    html += `<span class="letter" value="${total_cnt}">${text_mas[i][j]}</span>`
                    total_cnt += 1;
                }
            }
            
            if (text[total_cnt] === ' ') {
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



