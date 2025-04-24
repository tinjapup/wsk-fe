*** Settings ***
Library    RequestsLibrary
Library    Collections
Suite Setup    Authenticate as Admin
Variables         load_env.py

*** Keywords ***
Authenticate as Admin
    ${body}    Create Dictionary    username=${USERNAME}    password=${PASSWORD}
    ${response}    POST    url=http://localhost:3000/api/auth/login    json=${body}
    Log    ${response.json()}
    ${token}    Set Variable    ${response.json()}[token]
    Log    ${token}
    Set Suite Variable    ${token}

*** Test Cases ***
Get activities
    ${response}    GET    url=http://localhost:3000/api/activities
    Status Should Be    200    ${response}
    