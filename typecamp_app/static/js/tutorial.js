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
            $('.closable, .navbar').on('click', function() {
                tutorial.attr('value', '0') 
                $('.closable, .navbar').off() // Очистка слушателя ивента на body
                $('.tutorial-block').css({'opacity':'0'})
                setTimeout(function(){
                    $('.tutorial-block').addClass('d-none')
                },300)
                
            })
        },100)
        
    }
    
}

function settingsOpener() {
    
    let settings = $('.settings')
    // Если функция открыта
    if (settings.attr('value') === '0') {
        $(document).off()
        
        settings.attr('value', '1') 
        $('.custom-settings-block').removeClass('d-none')
        setTimeout(function(){
            $('.custom-settings-block').css({'opacity':'100'})
        })
        $(document).keydown(function(e) {
            $('.custom-input').focus()
        })
        // При нажатии в любом месте экрана туториал скрывается
        setTimeout(function(){
            $('.closable, .navbar').on('click', function() {
                $(document).off()
                customEventListener()
                settings.attr('value', '0') 
                $('.closable, .navbar').off() // Очистка слушателя ивента на body
                $('.custom-settings-block').css({'opacity':'0'})
                setTimeout(function(){
                    $('.custom-settings-block').addClass('d-none')
                },300)
                
            })
        },100)
        
    }

    else {
        $(document).off()
        customEventListener()
        settings.attr('value', '0') 
        $('.closable, .navbar').off() // Очистка слушателя ивента на body
        $('.custom-settings-block').css({'opacity':'0'})
        setTimeout(function(){
            $('.custom-settings-block').addClass('d-none')
        },300)
    }
    
}

function settingsChecker() {
    let text = $('.custom-input').val()

    if (text.length < 10) {
        const alertToast = $('.toast')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(alertToast)
        toastBootstrap.show()
        $('.settings').attr('value', '0')
        settingsOpener()    
    }
    else {
        $('.settings').attr('value', '1')
        settingsOpener()
    }
    
    return !(text.length < 10)
    
}

function winScreenOpener(task) {
    $('.navbar').removeClass('d-none')
    setTimeout(function(){
        $('.navbar').css({'opacity':'100'})
    })
    clearTimeout(time_interval)
    clearInterval(timer)
    $(`.test-block`).css({'opacity':'0'})
    setTimeout(function(){
        $(`.test-block`).addClass('d-none')
        $(`.stats-block`).removeClass('d-none')
    }, 300)
    $(`.test-block`).css({'opacity':'0'})
    $(`.stats-block`).css({'opacity':'100'})
    if (task === 'test') {
        testEventListener()
    }
    else if (task === 'custom') {
        customEventListener()
    }
    
}


