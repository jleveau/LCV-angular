Feature: Participate to an event

    Scenario: i subscribe as participating to an event
        Given i am logged in
        And i am on an event page
        When i click on the participate button
        Then i can see name in the participants list

     Scenario: i have already subscribe to an event and i want to change my participating status
        Given i am logged in
        And i am on an event page and i am in the participants list
        When i click on the not participating button
        Then i can see name in the not participating list