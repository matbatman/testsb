/**
 * sub page containing specific selectors and methods for a specific page
 */
class doctorPage {
    /**
     * define selectors using getter methods
     */
    get doctorCardCollection() { return $$('div[data-test-id="doctor-card-search-results"]') }
    get dropdownDataCollection() { return $$('.select-box__options-item') }
    get timeSlotCollection() { return $$('.clinic-slots__caption') }

    get scheduleButton() { return $('button[data-test-id="calendar-button"]') }
    get dataList() { return $('.select-box__options') }
    get allDaysActive() { return $('.select-all-days.--active') }
}

module.exports = new doctorPage();
