const { _ } = require('lodash');
/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open(path) {
        return browser.url(`https://docdoc.ru/${path}`)
    }

    checkUrl(path) {
        browser.waitUntil(() => { return browser.getUrl() === `https://docdoc.ru/${path}` })
    }

    clickOnElement(element) {
        element.scrollIntoView()
        element.waitForClickable()
        element.click()
    }

    clickOnElementByText(elementCollection, text) {
        const element = browser.waitUntil(() => _.find(elementCollection, (elem) => elem.isClickable() && elem.getText().includes(text)), {
            timeoutMsg: `Element with text ${text} not found in collection`,
        });
        element.click();
    }
}

module.exports = new Page();