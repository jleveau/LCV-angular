const Nightmare = require("nightmare")
const nightmare = Nightmare({ show: false })
const chai = require("chai")
const expect = chai.expect
const { Given, When, Then, AfterAll } = require("cucumber")

const pageUrl = "http://localhost:3000"

AfterAll(() => nightmare.end())

Given('i am on the event form and there is no other events', function () {
});

When('i set title to Mon Evenement', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


When('i set description to My description', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


When('i set the date to the date of tomorow', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('i set the date end to the date of the day after tomorow', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('i click the create button', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});


Then('i can see my event in the event list', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('i am logged in', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
