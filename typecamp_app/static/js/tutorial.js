tutorial_flag = 'start'
$('.tutorial').on('click', function() {

    if ($('.tutorial-block').hasClass('d-none')) {
        $('.tutorial-block').removeClass('d-none')
        if (!$('.start-block').hasClass('d-none')) {
            tutorial_flag = 'start'
            $('.start-block').addClass('d-none')

        }
        if (!$('.stats-block').hasClass('d-none')) {
            tutorial_flag = 'stats'
            $('.stats-block').addClass('d-none')
        }
        if (!$('.settings-custom-block').hasClass('d-none')) {
            tutorial_flag = 'start'
            $('.settings-custom-block').addClass('d-none')
        }
        $(document).keydown(function(e) {
            if(!e.code.startsWith('F')) {
                e.preventDefault()
                let key = $(`div[value="${e.code.toLowerCase()}"]`)
                key.addClass('active-key')
            }
        })
        $(document).keyup(function(e){
            if (!e.code.startsWith('F')) {
                e.preventDefault()
                let key = $(`div[value="${e.code.toLowerCase()}"]`)
                key.removeClass('active-key')
            }
        })
    }
    else {
        if (tutorial_flag === 'start') {
            $('.tutorial-block').addClass('d-none')
            $('.start-block').removeClass('d-none')
        }
        else {
            $('.tutorial-block').addClass('d-none')
            $('.stats-block').removeClass('d-none')
            
        }

    }

})

