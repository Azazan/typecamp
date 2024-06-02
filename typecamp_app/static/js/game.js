var game_time = 0;
var score = 0;
var lives = 10;
let keys = ['backquote', 'digit1', 'digit2', 'digit3', 'digit4', 'digit5', 'digit6', 'digit7', 'digit8', 'digit9', 'digit0', 'minus', 'equal', 'backspace', 'keyq', 'keyw', 'keye', 'keyr', 'keyt', 'keyy', 'keyu', 'keyi', 'keyu', 'keyi', 'keyo', 'keyp', 'bracketleft', 'bracketright', 'backslash', 'capslock', 'keya', 'keys', 'keyd', 'keyf', 'keyg', 'keyh', 'keyj', 'keyk', 'keyl', 'semicolon', 'quote', 'enter', 'shiftleft', 'keyz', 'keyx', 'keyc', 'keyv', 'keyb', 'keyn', 'keym', 'comma', 'period', 'slash', 'shiftright', 'controlleft', 'space', 'controlright']
var target_interval = 4000;
var time = 0
var timer
var keys_interval
class key {
    constructor(keycode) {
        this.keycode = keycode;
        
        this.getActive()
    }

    getActive() {
        $(`div[value="${this.keycode}"]`).addClass('target-key')
        
        setTimeout(() => {
            
            if ($(`div[value="${this.keycode}"]`).hasClass('target-key')) {
                lives--
                $(`div[value="${this.keycode}"]`).removeClass('target-key')
                gameOverChecker()
                
            }
            scoreUpdate()

        }, 8000)
    }

}





function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function get_random_target() {
    num = getRandomInt(keys.length + 1)
    return keys[num]
}

function gameEventListener(){
    
    $(document).keydown(function(e) {
        
        if (e.ctrlKey && e.keyCode == 13) {
            $(document).off()
            gameStarter()
            
            
        }
    })
}


window.onload = function(){
    gameEventListener()
}

function gameStarter() {
    time = 0;
    score = 0;
    lives = 10;
    target_interval = 3000;
    $('.start-block').addClass('d-none')
    $(`.stats-block`).css({'opacity':'0'})
        time_interval = setTimeout(function(){
            $(`.stats-block`).addClass('d-none')
            $(`.game-block`).removeClass('d-none')
            $(`.game-block`).css({'opacity':'100'})
            $('.navbar').css({'opacity':'0'})
        }, 300)
    $(document).keydown(function(e){
        $(`div[value="${e.code.toLowerCase()}"]`).addClass('active-key')
        
        if ($(`div[value="${e.code.toLowerCase()}"]`).hasClass('target-key')) {
            score++
            $(`div[value="${e.code.toLowerCase()}"]`).removeClass('target-key')
        }
        else {
            lives--
            gameOverChecker()
        }
        scoreUpdate()
    })
    $(document).keyup(function(e) {
        $(`div[value="${e.code.toLowerCase()}"]`).removeClass('active-key')
        
    })
    
    addKey(target_interval)
    
    timer = setInterval(function() {
        time++
        scoreUpdate()
    }, 1000)
    
}

function scoreUpdate(){
    $('#score').text(score)
    $('#lives').text(lives)
    $('#time').text(time)
}

function addKey(target_interval) {
    let keyy = new key(get_random_target())
    console.log(target_interval)
    if (target_interval > 1000) {
        target_interval -= 100
    }
    else {
        if (target_interval > 500) {
            target_interval -= 20
        }
    }

    keys_interval = setTimeout(addKey, target_interval, target_interval)
}

function gameOverChecker() {
    if (lives === 0 ) {
        $(document).off()
        $('.navbar').css({'opacity':'100'})
        $('#final_score').text(score)
        
        clearTimeout(time_interval)
        clearInterval(timer)
        clearTimeout(keys_interval)
        $(`.game-block`).css({'opacity':'0'})
        setTimeout(function(){
            $(`.game-block`).addClass('d-none')
            $(`.stats-block`).removeClass('d-none')
        }, 300)
        $(`.game-block`).css({'opacity':'0'})
        $(`.stats-block`).css({'opacity':'100'})
        fetch('/game_stats_update/', {
            method: 'POST', 
            headers: {'X-CSRFToken': csrf}, // CSRF-токен для Django, это важно помимо использования куки
            body: JSON.stringify({'score':score}) // Данные, которые отправляются в Django
        }).then(gameEventListener())
        


    }
}