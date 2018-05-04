const Nightmare = require("nightmare")
const nightmare = Nightmare({ show: false })
const chai = require("chai")
const expect = chai.expect
const { Given, When, Then, AfterAll } = require("cucumber")

const pageUrl = "http://localhost:3000"

AfterAll(() => nightmare.end())

When('i click on the participate button', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('i can see name in the participants list', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Given('i am on an event page and i am in the participants list', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('i click on the not participating button', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('i can see name in the not participating list', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
