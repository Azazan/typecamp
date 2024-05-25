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
        if ($(`.incorrect-letter[value=${input.length}]`).length) {
            
            $(`.letter[value=${input.length}]`).removeClass('incorrect-letter')
        }
        else {
            test_correct--
            $(`.letter[value=${input.length}]`).removeClass('text-light')
        }
    }
    if (text[input.length-1] === input[input.length - 1]) {
        $(`.letter[value=${input.length-1}]`).addClass('text-light')
    }
    // Допущена ошибка
    else {
        test_mistakes++
        $(`.letter[value=${input.length-1}]`).addClass('incorrect-letter')
    }
    if (input === text) {
        
        winScreenOpener('test')
    }
}

function statsUpdate() {
    $('#mistakes').html(0)
    $('#curr-time').html(test_time)
    $('#correct').html(0)
    $('#words').html(0)
    $('#progress').html(0)
}