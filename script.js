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

const updateProbability = () => {
    let odds = normalOdds

    if (lureInput.checked && !charmInput.checked) odds = lureOdds
    else if (!lureInput.checked && charmInput.checked) odds = charmOdds
    else if (lureInput.checked && charmInput.checked) odds = lureAndCharmOdds

    let combo = comboInput.value
    let title = document.querySelector('.title span')

    if (combo > 0) title.innerHTML = 'Shiny Chances'
    else title.innerHTML = 'Shiny Calculator'

    let probability = 0

    if (combo < 11)
        probability = computeProbability(odds.tier1, combo)
    else if (combo < 21)
        probability = computeProbability(odds.tier1, 10) * computeProbability(odds.tier2, combo - 10)
    else if (combo < 31)
        probability = computeProbability(odds.tier1, 10) * computeProbability(odds.tier2, 10) * computeProbability(odds.tier3, combo - 20)
    else
        probability = computeProbability(odds.tier1, 10) * computeProbability(odds.tier2, 10) * computeProbability(odds.tier3, 10) * computeProbability(odds.tier4, combo - 30)

    probability = (1 - probability) * 100
    probability = Math.floor(probability * 100) / 100

    let probContainer = document.querySelector('#prob')

    if (probability == 0) probContainer.innerHTML = ''
    else probContainer.innerHTML = `${probability}%`
}

const computeProbability = (tier, combo) => {
    return Math.pow((1 - tier), combo)
}

lureInput.addEventListener('change', updateProbability, false)
charmInput.addEventListener('change', updateProbability, false)
comboInput.addEventListener('keyup', updateProbability, false)
comboInput.addEventListener('change', () => {
    if (!comboInput.value) comboInput.value = 0
    updateProbability()
}, false)
