Feature: delete an event

    Scenario: i delete an event i have created
        Given i am logged in
        And i am on the page of an event i have created
        When i click on the delete button
        Then i am on the event list
        And my event is not in the event list