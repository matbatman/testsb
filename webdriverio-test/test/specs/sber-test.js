const chai = require('chai')
const { expect } = chai;

const { checkUrl, open, clickOnElement, clickOnElementByText } = require('../pageobjects/page')
const doctorPage = require('../pageobjects/doctor-page');

describe('Врачи › Страница выдачи врачей: Фильтр "Расписание" на выдаче врачей', () => {
    before(() => {
        open('doctor')
    });

    it('Открыта страница сайта "doctor"', () => {
        checkUrl('doctor')
    })

    it('Отображаются 10 карточек врачей на странице', () => {
        expect(doctorPage.doctorCardCollection.length).to.be.equal(10);
    })

    it('Отображается кнопка "Расписание (фильтр)"', () => {
        expect(doctorPage.scheduleButton.isDisplayed()).to.be.true;
    })

    it('Заголовок кнопки "Расписание (фильтр)" содержит текст', () => {
        expect(doctorPage.scheduleButton.getText()).to.be.equal('Расписание на все дни');
    })

    it('Нажимаем на кнопку "Расписание (фильтр)"', () => {
        clickOnElement(doctorPage.scheduleButton)
    })

    it('Отображается элемент "Список значений для выбора даты"', () => {
        doctorPage.dataList.waitForDisplayed()
    })

    it('Помечен галочкой пункт "Все дни" в выпадающем списке "Список значений для выбора даты"', () => {
        expect(doctorPage.allDaysActive.isDisplayed()).to.be.true;
    })

    it('Нажимаем на пункт "Завтра" в выпадающем списке "Список значений для выбора даты"', () => {
        clickOnElementByText(doctorPage.dropdownDataCollection, 'Завтра')
    })

    it('Заголовок кнопки "Расписание (фильтр)" содержит текст', () => {
        browser.waitUntil(() => {
            return doctorPage.scheduleButton.getText() === 'Расписание на завтра';
        });
    })

    it('Отображаются 10 карточек врачей на странице', () => {
        browser.waitUntil(() => {
            return doctorPage.timeSlotCollection[0].getText().includes('Онлайн-расписание на')
        });
        expect(doctorPage.doctorCardCollection.length).to.be.equal(10);
    })

    it('Отображаются врачи, работающие в выбранный день', () => {
        let cardsQuantity = doctorPage.timeSlotCollection.length;
        let flag = false;
        for (let i = 0; i < cardsQuantity; i++) {
            flag = true && doctorPage.timeSlotCollection[i].getText().includes('Онлайн-расписание на')
        }
        expect(flag).to.be.true;
    })
})