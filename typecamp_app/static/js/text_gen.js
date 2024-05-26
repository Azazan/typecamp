let dict_punct = [', ', ' - ', '. ', '! ', '? ', ': ', '; ', '"'];


async function loadJson(dict_name) {
    const response = await fetch('/dict_load/', {
        method: 'POST', // 'GET' тоже подойдёт, но 'POST' позволит использовать куки
        headers: {'X-CSRFToken': csrf}, // CSRF-токен для Django, это важно помимо использования куки
        body: JSON.stringify({'dict_name': dict_name}) // Данные, которые отправляются в Django
    });
    return await response.json();
}


async function textCreator(task) {
    var text = '';
    if (task === 'test') {
        var punct = $('.punctuation-btn').attr('value')
        var nums = $('.nums-btn').attr('value')
        var presets = $('.presets-btn').attr('value')
        var dict_name = ''
        if (presets === '1') {
            dict_name += 'dict_presets'
        }

        else {
            dict_name += 'dict'
        }
        dict_name += `_${$('.lang-select').val()}.json`
        
    }

    else if (task === 'custom') {
        text = $('.custom-input').val()
        console.log('asdf')
        return text;
    }

    return await loadJson(dict_name).then((data) => {
        let dict = data.recieved.words

        if (presets === '1') {
            let text_choice = getRandomInt(0, dict.length)
            console.log(dict[text_choice])
            return dict[text_choice]
        }
        
        for (let i = 0; i < WORDS_LEN; i++) {
            if(nums === '1') {
                let nums_choice = getRandomInt(0, 3)
                if (nums_choice === 0) {
                    let num = getRandomInt(0, 1000)
                    text += `${num} `
                    continue
                }
            }
            let num = getRandomInt(0,dict.length)
            if (punct === '1') {
                let punct_choice = getRandomInt(0,4)
                if (punct_choice !== 0) {
                    let punct = getRandomInt(0, dict_punct.length)
                    if (dict_punct[punct] === '"') {
                        text += `${dict_punct[punct]}${dict[num]}${dict_punct[punct]} `
                        continue
                    }
                    text += `${dict[num]}${dict_punct[punct]}`
                    continue
                }
            }
            
            text+= `${dict[num]} `
            
        }
        console.log(text)
        return text.trimEnd()
    })

}