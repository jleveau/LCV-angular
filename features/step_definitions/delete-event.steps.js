const Nightmare = require("nightmare")
const nightmare = Nightmare({ show: false })
const chai = require("chai")
const expect = chai.expect
const { Given, When, Then, AfterAll } = require("cucumber")

const pageUrl = "http://localhost:3000"

AfterAll(() => nightmare.end())

Given('i am on the page of an event i have created', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('i click on the delete button', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('i am on the event list', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('my event is not in the event list', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

