require('./profile-generator')
const {Builder, By, Key, until} = require('selenium-webdriver');
 
(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('https://accounts.google.com/SignUp');
    profile = getProfile();
    await driver.findElement(By.id('firstName')).sendKeys(profile.firstname)
    await driver.findElement(By.id('lastName')).sendKeys(profile.lastname)
    await driver.findElement(By.id('username')).sendKeys(profile.username)
    await driver.findElement(By.name('Passwd')).sendKeys(profile.username)
    await driver.findElement(By.name('ConfirmPasswd')).sendKeys(profile.username)
    await driver.findElement(By.id('accountDetailsNext')).sendKeys(Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  } finally {
    // await driver.quit();
  }
})();