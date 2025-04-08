*** Settings ***
Documentation     Title
Library           Browser
Library           Collections
Variables         load_env.py


*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No  
    New Page       http://localhost:5173/pages/login.html
    Get Title      ==    Tribe+ | Login
    Type Text      [id="username-login"]        ${USERNAME}    delay=0.1 s 
    Type Secret    [id="password-login"]    $PASSWORD      delay=0.1 s
    Click With Options    button   