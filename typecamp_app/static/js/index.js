const WORDS_LEN = 20;



function valSwapper(el) {
    if (el.hasClass('disabled')) {
        return
    }
    if (el.hasClass('presets-btn')) {
        $('.nums-btn').children().removeClass('btn-active')
        $('.punctuation-btn').children().removeClass('btn-active')
        $('.nums-btn').attr('value', '0')
        $('.punctuation-btn').attr('value', '0')

    }
    if (el.attr('value') === '1') {
        if (el.hasClass('presets-btn')) {
            $('.nums-btn').removeClass('disabled')
            $('.punctuation-btn').removeClass('disabled')
        }
        el.attr('value', '0')
        el.children().removeClass('btn-active')
        return;

    }
    if (el.hasClass('presets-btn')) {
        $('.nums-btn').addClass('disabled')
        $('.punctuation-btn').addClass('disabled')
    }  
    el.attr('value', '1')
    el.children().addClass('btn-active')

}
var total_right_moving_flag = true;
function cursorMoving(cnt) {
    console.log('vis')
    if ($(`.letter[value=${cnt}]`).length) {
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
        let input = $('.invisible-input').val()
        
        if (letter_h + 4 > $(`.cursor`).position().top) {
            if (input === text.substring(0, input.length)) {
                console.log('move to next')
                $('.text-place').css({'top':`${parseInt($('.text-place').css('top')) - 56}px`})
                total_right_moving_flag = true;
                total_deleted += input.length
                test_correct = total_deleted + 1
                text = text.substring(input.length, text.length)
                $('.invisible-input').val('')
                console.log(text)
                console.log(input)
            }
            else {
                console.log('not move')
                total_right_moving_flag = false;
                return true
            }
        }
        
        $('.cursor').css({'left':`${letter_w}px`, 'top':`${letter_h + 4}px`})
        return flag;
        
    }

}


function inputChecker(task) {
    
    let input = $('.invisible-input').val()
    
    if (input.length > text.length) {
        console.log('full')
        $('.invisible-input').val(input.substring(0, text.length))
        return;
    }
    let flag = cursorMoving(input.length + total_deleted)
    input = $('.invisible-input').val()
    if (!flag) {
        
        if ($(`.incorrect-letter[value=${input.length + total_deleted}]`).length) {
            
            $(`.letter[value=${input.length + total_deleted}]`).removeClass('incorrect-letter')
        }
        else {
            test_correct--
            $(`.letter[value=${input.length + total_deleted}]`).removeClass('text-light')
        }
        
        
    }
    else if (text[input.length-1] === input[input.length - 1] && total_right_moving_flag) {
        
        $(`.letter[value=${input.length + total_deleted - 1}]`).addClass('text-light')
        test_correct++
        
    }
    // Допущена ошибка
    else {
        if (total_right_moving_flag) { // Если в строке есть неправильный символ, то строка переведена не будет
            test_mistakes++
            $(`.letter[value=${input.length + total_deleted-1}]`).addClass('incorrect-letter')
            test_keys[keys_var[$(`.letter[value=${input.length + total_deleted-1}]`).html().toLowerCase()]] += 1

        }
    }
    if (!total_right_moving_flag) {
        $('.invisible-input').val(input.substring(0, input.length - 1))
        total_right_moving_flag = true
        
    }
    if (input === text) {
        console.log('asdf')
        totalStatsUpdate()
        console.log(test_keys)
        test_correct = {'total_accuracy':Math.ceil((test_correct - test_mistakes) / test_correct * 100), 'total_wpm':Math.ceil(test_words / test_time * 60), 'total_lpm':Math.ceil(test_correct / test_time * 60), 'total_test_cnt':1,'total_time':test_time, 'total_mistakes':test_mistakes, 'total_words':test_words, 'total_keys':test_correct}
        winScreenOpener(task)
    }

    test_progress = input.length + total_deleted
    test_words = total_text.substring(0, input.length + total_deleted + 1).split(' ').length - 1
    
    statsUpdate()
}

function totalStatsUpdate() {
    $('#total-mistakes').html(test_mistakes)
    $('#accuracy').html(Math.ceil((test_correct - test_mistakes) / test_correct * 100))
    $('#wpm').html(Math.ceil(test_words / test_time * 60))
    $('#lpm').html(Math.ceil(test_correct / test_time * 60))
    $('#total-time').html(test_time)
}


function statsUpdate() {
    $('#mistakes').html(test_mistakes)
    $('#curr-time').html(test_time)
    $('#correct').html(test_correct)
    $('#words').html(test_words)
    $('#progress').html(test_progress)
}