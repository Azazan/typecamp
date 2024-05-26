const WORDS_LEN = 20;
var text = ''


function textCreator(task) {
    if (task === 'test') {
        text = 'god bless i went to ships game'
        return text
    }
}

function cursorMoving(cnt) {
    if ($(`.letter[value=${cnt}]`)) {
        let letter = $(`.letter[value=${cnt}]`)
        let letter_w = letter.position().left 
        let letter_h = letter.position().top
        let flag = true; // направлдение движения курсора, false - назад, true - вперед


        if (letter_w > $(`.cursor`).position().left) {
            flag = true;
        }
        else {
            flag = false;
        }

        if (letter_h + 4 > $(`.cursor`).position().top) {
            $('.text-place').css({'top':`${parseInt($('.text-place').css('top')) - 56}px`})
        }
        else if (letter_h + 4 < $(`.cursor`).position().top) {
            $('.text-place').css({'top':`${parseInt($('.text-place').css('top')) + 56}px`})
        }
        $('.cursor').css({'left':`${letter_w}px`, 'top':`${letter_h + 4}px`})
        return flag;
        
    }

}

function inputChecker() {
    let input = $('.invisible-input').val()
    if (input.length > text.length) {
        return;
    }
    let flag = cursorMoving(input.length)
    if (!flag) {
        if (text[input.length] === ' ' || text[input.length+1] === ' ') {
            test_words--
        }
        if ($(`.incorrect-letter[value=${input.length}]`).length) {
            
            $(`.letter[value=${input.length}]`).removeClass('incorrect-letter')
        }
        else {
            test_correct--
            $(`.letter[value=${input.length}]`).removeClass('text-light')
        }
        test_progress--
        
    }
    else if (text[input.length-1] === input[input.length - 1]) {
        if (text[input.length] === ' ') {
            test_words++
        }
        $(`.letter[value=${input.length-1}]`).addClass('text-light')
        test_correct++
        test_progress++
    }
    // Допущена ошибка
    else {
        if (text[input.length] === ' ') {
            test_words++
        }
        test_mistakes++
        test_progress++
        $(`.letter[value=${input.length-1}]`).addClass('incorrect-letter')
        
    }
    if (input === text) {
        totalStatsUpdate()
        winScreenOpener('test')
    }
    statsUpdate()
}

function totalStatsUpdate() {
    $('#total-mistakes').html(test_mistakes)
    $('#accuracy').html(Math.ceil((test_correct - test_mistakes) / test_correct * 100))
    $('#wpm').html(Math.ceil(test_words / Math.ceil(test_time / 60)))
    $('#lpm').html(Math.ceil(test_correct / Math.ceil(test_time / 60)))
    $('#total-time').html(test_time)
}


function statsUpdate() {
    $('#mistakes').html(test_mistakes)
    $('#curr-time').html(test_time)
    $('#correct').html(test_correct)
    $('#words').html(test_words)
    $('#progress').html(test_progress)
}