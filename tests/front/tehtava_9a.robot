*** Settings ***
Library    DatabaseLibrary
Suite Setup    Authenticate as Admin
Variables         load_env.py

*** Keywords ***
Authenticate as Admin
    Connect To Database    pymysql    ${DB_NAME}    ${DB_USER}    ${DB_PASSWORD}    ${DB_HOST}

*** Test Cases ***
Test Users table in database
    ${res}=    Query    SELECT username, email FROM Users WHERE user_id=1;
    Should Be Equal    ${res[0][0]}    admin
    Should Be Equal    ${res[0][1]}    admin@email.com

Test Entries table in database
    ${res}=    Query    SELECT * FROM Entries WHERE user_id=1;
    Log   ${res}
    Disconnect From Database