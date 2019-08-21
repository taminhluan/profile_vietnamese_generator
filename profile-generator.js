const fs = require('fs');
const weightedRandom = require('weighted-random');
var dwGen = require('diceware-password-generator');
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

function normalize_vn_character(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

function getSuggestUsernames(firstname, lastname) {
    firstname = normalize_vn_character(firstname)
    lastname = normalize_vn_character(lastname)

    firstname = firstname.split(' ')
    middlename =  firstname[0]
    firstname =  firstname[1]

    return (lastname + middlename + firstname).toLowerCase()
}

function getProfile() {
    var gender = getGender()
    var lastname = getLastName()
    var firstname = getFirstNameByGender(gender)
    var username = getSuggestUsernames(firstname, lastname)
    var password = dwGen()
    return {
        gender: gender ? 'Nam' : 'Nữ',
        lastname: lastname,
        firstname: firstname,
        username: username,
        password: password
    }
}

console.log(getProfile())

global.getFullNameByGender = getFullNameByGender
global.getFullName = getFullName
global.getLastName = getLastName
global.getFirstNameByGender = getFirstNameByGender
global.getFirstName = getFirstName
global.getGender = getGender
global.getProfile = getProfile
