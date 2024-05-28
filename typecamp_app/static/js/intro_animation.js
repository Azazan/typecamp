

function introAnimation(){
    let quote_in = 'Welcome to typecamp!'
    let quote = document.getElementById('welcome')
    console.log('asdf')
    let i = 0
    let flag = true
    let welcome_anim = setInterval(function () {
        if (!flag) {
            quote.querySelector('.incorrect-letter').remove()
            flag = true
        }
        else {
            let choice = getRandomInt(0,7)
            if (choice > 0) {
                quote.innerHTML += `<span class="text-light">${quote_in[i]}</span>`
                i++
            }
            else {
                quote.innerHTML += `<span class="incorrect-letter">${String.fromCharCode(getRandomInt(41, 79))}</span>`
                flag = false
            }
        }
        if (i === quote_in.length) {
            clearInterval(welcome_anim)
        }

    }, 200)

}