var test_time = 0 // Время теста
var time_interval;
var test_mistakes = 0; // Количество ошибок в тесте
var test_progress = 0; // Прогресс теста
var test_correct = 0; // Количество правильных нажатий
function testStarter() {
    test_mistakes = 0;
    test_progress = 0;
    test_correct = 0;
    test_time = 0;
    $('.start-block').addClass('d-none')
    $('.invisible-input').val('')
    let text = textCreator('test')
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
        html += '<div class="word">'
        for (let j = 0; j < text_mas[i].length; j++) {
            
            html += `<span class="letter" value="${total_cnt}">${text_mas[i][j]}</span>`
            total_cnt += 1;
        }
        html += `<span class="letter space-style" value="${total_cnt}"><i class="bi bi-x"></i></span>`
        total_cnt += 1;
        html += '</div>'
    }
    $('.text-place').html(html)
    setInterval(function(){
        test_time++
        statsUpdate()
    }, 1000)
}

function testEventListener(){
    $(document).keydown(function(e) {
        
        $('.invisible-input').focus();
        if (e.ctrlKey && e.keyCode == 13) {
            testStarter()
            $(document).off()
            
        }
    })
}

window.onload = function(){
    
    testEventListener()

}