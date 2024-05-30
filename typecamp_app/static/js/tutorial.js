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


function settingsChecker(task) {
    let text = $('.custom-input').val()

    if (text.length < 10) {
        const alertToast = $('.toast')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(alertToast)
        toastBootstrap.show()
        if (task === 1) {
            bootstrap.Modal.getOrCreateInstance("#settings").show()
  
        }
        
    }
    else {
        bootstrap.Modal.getOrCreateInstance("#settings").hide()
    }
    
    return !(text.length < 10)
    
}

function winScreenOpener(task) {
    $('.main').off()
    text = ''
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
        console.log('sss')
        fetch('/stats_update/', {
            method: 'POST', 
            headers: {'X-CSRFToken': csrf}, // CSRF-токен для Django, это важно помимо использования куки
            body: JSON.stringify(test_keys) // Данные, которые отправляются в Django
        }).then(

            fetch('/total_stats_update/', {
                method: 'POST',
                headers: {'X-CSRFToken': csrf}, // CSRF-токен для Django, это важно помимо использования куки
                body: JSON.stringify(test_correct) // Данные, которые отправляются в Django
            }).then(response => testEventListener())
        )
        
    }
    else if (task === 'custom') {
        customEventListener()
    }
    
}


