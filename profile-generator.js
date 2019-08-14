const fs = require('fs');
const weightedRandom = require('weighted-random');

var lastnames = []
var lastnameWeight = []
var lastnamesAsString = fs.readFileSync('data/lastname.txt', 'utf8')
var femaleFirstNamesAsString = fs.readFileSync('data/female_firstname.txt', 'utf8')
var maleFirstNamesAsString = fs.readFileSync('data/male_firstname.txt', 'utf8')

lastnamesAsString.split('\n').forEach(line => {
    lineSplitByComma = line.split(',')
    var lineSplitByCommaLength = lineSplitByComma.length
    if (lineSplitByCommaLength > 0) {
        lastnames.push(lineSplitByComma[0])
        
        if (lineSplitByCommaLength > 1) {
            lastnameWeight.push(parseFloat(lineSplitByComma[1]))
        } else {
            lastnameWeight.push(0.1)
        }
    }
})

var femaleFirstNames = femaleFirstNamesAsString.split('\n')
var maleFirstNames = maleFirstNamesAsString.split('\n')
var firstnames = femaleFirstNames.concat(maleFirstNames)

/**
 * get gender
 * true: male
 * false: female
 */
function getGender() {
    if (Math.random() > 0.5) {
        return true
    } else {
        return false
    }
}

function getFirstName() {
    randomIndex = parseInt(Math.random() * firstnames.length)
    return firstnames[randomIndex]

}

function getFirstNameByGender(isMale) {
    if (isMale) {
        firstnamesRandom = maleFirstNames
        
    } else {
        firstnamesRandom = femaleFirstNames
    }

    randomIndex = parseInt(Math.random() * firstnamesRandom.length)
    return firstnamesRandom[randomIndex]
}

function getLastName() {
    return lastnames[weightedRandom(lastnameWeight)]
}

function getFullName() {
    var firstName = getFirstName()
    var lastName = getLastName()
    return lastName + ' ' + firstName
}

function getFullNameByGender(isMale) {
    var firstName = getFirstNameByGender(isMale)
    var lastName = getLastName()
    return lastName + ' ' + firstName
}

function getProfile() {
    var gender = getGender()
    return {
        gender: gender ? 'Nam' : 'Nữ',
        lastname: getLastName(),
        firstname: getFirstNameByGender(gender)
    }
}

global.getFullNameByGender = getFullNameByGender
global.getFullName = getFullName
global.getLastName = getLastName
global.getFirstNameByGender = getFirstNameByGender
global.getFirstName = getFirstName
global.getGender = getGender
global.getProfile = getProfile
