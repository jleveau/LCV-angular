Feature: Create an Event
    Scenario: Create a valid event
        Given i am logged in
        And i am on the event form and there is no other events
        When i set title to Mon Evenement 
        And i set description to My description
        And i set the date to the date of tomorow
        And i set the date end to the date of the day after tomorow
        And i click the create button
        Then i can see my event in the event list