/**
 * 
 * @param {number} f 
 * @returns {Array<number, number, number>}
 */
function getRatioColor(f) {
    let color;
    let max = 255
    let ratio
    if(
        ((1 / 6) * 0 <= f) &&
        ((1 / 6) * 1 >= f)
    ) {
        ratio = ((f - ((1 / 6) * 0)) * 6) * max;
        color = [max, 0, ratio]
    }
    else if(
        ((1 / 6) * 1 < f) &&
        ((1 / 6) * 2 >= f)
    ) {
        ratio = ((f - ((1 / 6) * 1)) * 6) * max;
        color = [max - ratio, 0, max]
    }
    else if(
        ((1 / 6) * 2 < f) &&
        ((1 / 6) * 3 >= f)
    ) {
        ratio = ((f - ((1 / 6) * 2)) * 6) * max;
        color = [0, ratio, max]
    }
    else if(
        ((1 / 6) * 3 < f) &&
        ((1 / 6) * 4 >= f)
    ) {
        ratio = ((f - ((1 / 6) * 3)) * 6) * max;
        color = [0, max, max - ratio]
    }
    else if(
        ((1 / 6) * 4 < f) &&
        ((1 / 6) * 5 >= f)
    ) {
        ratio = ((f - ((1 / 6) * 4)) * 6) * max;
        color = [ratio, max, 0]
    }
    else {
        ratio = ((f - ((1 / 6) * 5)) * 6) * max;
        color = [max, max - ratio, 0]
    }
    
    return color
}
/**
 * 
 * @param {Array<number, number, number>} color
 * @returns {Array<number, number, number>}
 */
function reversalColor(color) {
    let outColor = [];
    outColor[0] = 255 - color[0]
    outColor[1] = 255 - color[1]
    outColor[2] = 255 - color[2]
    return outColor
}
/**
 * 
 * @param {Array<number, number, number>} color
 * @returns {string}
 */
function colorToString(color) {
    let outStr = '#'
    let temp = ''
    for (let i = 0; i < color.length; i++) {
        color[i] = Math.round(color[i])
        temp = color[i].toString(16);
        if(temp.length > 1 ) {
            outStr += temp
        }
        else {
            outStr += `0${temp}`
        }
    }
    return outStr;
}

const strSet = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const strNumberTemp = [];
const statusDiv = document.getElementsByClassName('status')[0]
/**
 * @type {Array<HTMLDivElement>}
 */
const statusItems = []
for (let i = 0; i < strSet.length; i++) {
    const div = document.createElement('div')
    div.classList.add('status-item')
    let label = document.createElement('div')
    label.classList.add('label')
    label.innerText = strSet[i]
    
    
    let color = getRatioColor(i / strSet.length);

    label.style.color = colorToString(reversalColor(color))
    label.style.backgroundColor = colorToString(color)


    let statusItem = document.createElement('div')
    statusItem.classList.add('statusItem')
    statusItem.innerText = 0

    statusItems.push(statusItem)

    div.appendChild(label)
    div.appendChild(statusItem)

    statusDiv.appendChild(div)
}




const textZoneDiv = document.getElementsByClassName('text-zone')[0]
/**
 * @type {HTMLElement}
 */
let displayEl
/**
 * 
 * @param {string} text 
 */
function updateTextDisplay(text) {
    for (let i = 0; i < strSet.length; i++) {
        strNumberTemp[i] = 0;
    }

    displayEl.innerHTML = null
    for (let i = 0; i < text.length; i++) {
        if(text[i] === '\n') {
            let br = document.createElement('br')
            // elements.push(br)
            displayEl.appendChild(br)
            continue
        }
        let idx = strSet.indexOf(text[i])
        if(idx === -1) {
            let span = document.createElement('span')
            span.innerText = text[i]
            span.style.color = 'white'
            span.style.backgroundColor = 'black'
            displayEl.appendChild(span)
            continue
        }

        strNumberTemp[idx] += 1
        
        let span = document.createElement('span')
        span.innerText = text[i]
        let color = getRatioColor(idx / strSet.length);
        span.style.color = colorToString(reversalColor(color))
        span.style.backgroundColor = colorToString(color)
        // elements.push(span)
        displayEl.appendChild(span)
    }

    for (let i = 0; i < strNumberTemp.length; i++) {
        statusItems[i].innerText = strNumberTemp[i]
    }
}
textZoneDiv.appendChild((() => {
    let div = document.createElement('div');
    div.classList.add('inner');
    let innerText;
    div.appendChild((() => {
        let div = document.createElement('div');
        displayEl = div
        div.classList.add('text');

        innerText = div;

        return div
    })())
    div.appendChild((() => {
        let input = document.createElement('textarea');

        input.addEventListener('change', () => {
            updateTextDisplay(input.value)
        })
        input.addEventListener('input', (e) => {
            updateTextDisplay(e.target.value)
        })

        updateTextDisplay('input text')

        return input
    })())

    return div
})())