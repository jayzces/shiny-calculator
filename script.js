const normalOdds = {
    tier1: 1 / 4096,
    tier2: 1 / 1024,
    tier3: 1 / 512,
    tier4: 1 / 341.3
}

const lureOdds = {
    tier1: 1 / 2048,
    tier2: 1 / 819.2,
    tier3: 1 / 455.1,
    tier4: 1 / 315.08
}

const charmOdds = {
    tier1: 1 / 1365.3,
    tier2: 1 / 682.6,
    tier3: 1 / 409.6,
    tier4: 1 / 292.57
}

const lureAndCharmOdds = {
    tier1: 1 / 1024,
    tier2: 1 / 585.14,
    tier3: 1 / 372.36,
    tier4: 1 / 273.07
}

const comboInput = document.querySelector('#combo')
const lureInput = document.querySelector('#lure')
const charmInput = document.querySelector('#charm')

const updatePossibility = () => {
    let odds = normalOdds

    if (lureInput.checked && !charmInput.checked) odds = lureOdds
    else if (!lureInput.checked && charmInput.checked) odds = charmOdds
    else if (lureInput.checked && charmInput.checked) odds = lureAndCharmOdds

    let tier = odds.tier1
    let combo = comboInput.value
    let title = document.querySelector('.title span')

    if (combo > 0) title.innerHTML = 'Shiny Chances'
    else title.innerHTML = 'Shiny Calculator'

    if (combo >= 31) tier = odds.tier4
    else if (combo > 20) tier = odds.tier3
    else if (combo > 10) tier = odds.tier2

    let possibility = (1 - (Math.pow((1 - tier), combo))) * 100
    possibility = Math.floor(possibility * 100) / 100

    let possContainer = document.querySelector('#poss')

    if (possibility == 0) possContainer.innerHTML = ''
    else possContainer.innerHTML = `${possibility}%`
}

lureInput.addEventListener('change', updatePossibility, false)
charmInput.addEventListener('change', updatePossibility, false)
comboInput.addEventListener('keyup', updatePossibility, false)
comboInput.addEventListener('change', () => {
    if (!comboInput.value) comboInput.value = 0
    updatePossibility()
}, false)
