// Функция открытия вкладки туториал
function tutorialOpener() {
    let tutorial = $('.tutorial')
    // Если функция открыта
    if (tutorial.attr('value') === '0') {

        tutorial.attr('value', '1') 
        $('.tutorial-block').removeClass('d-none')
        setTimeout(function(){
            $('.tutorial-block').css({'opacity':'100'})
        })
        $(document).keydown(function(e) {
            if(!e.code.startsWith('F')) {
                e.preventDefault()
                let key = $(`div[value="${e.code.toLowerCase()}"]`)
                key.addClass('active-key')
                
                $(document).keyup(function(){
                    key.removeClass('active-key')
                })
            }
        })
        // При нажатии в любом месте экрана туториал скрывается
        setTimeout(function(){
            $('body').on('click', function() {
                tutorial.attr('value', '0') 
                $('body').off() // Очистка слушателя ивента на body
                $('.tutorial-block').css({'opacity':'0'})
                setTimeout(function(){
                    $('.tutorial-block').addClass('d-none')
                },300)
                
            })
        },100)
        
    }
    
}

function winScreenOpener(task) {
    clearTimeout(time_interval)
    clearInterval(timer)
    $(`.${task}-block`).css({'opacity':'0'})
    setTimeout(function(){
        $(`.${task}-block`).addClass('d-none')
        $(`.stats-block`).removeClass('d-none')
    }, 300)
    $(`.${task}-block`).css({'opacity':'0'})
    $(`.stats-block`).css({'opacity':'100'})
    if (task === 'test') {
        testEventListener()
    }
    
}


