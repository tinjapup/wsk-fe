*** Settings ***
Documentation     Title
Library           Browser   auto_closing_level=SUITE
Library           CryptoLibrary     variable_decryption=True

*** Variables ***
${Username}    crypt:jVdpIIoyuobyMSdOll5rJRJpKrEYA16EoZnRUySg+Wivg91PercVj5vytsFQe9unzMko1sM=
${Password}    crypt:K89qfZRrH8BiXkZKDBYnghc28qf+qj0qr+pVzIP1lz25A9tyJtYB/dTN8YpdQ3nV9YX4T7eKILU=


*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No  
    New Page       http://localhost:5173/pages/login.html
    Get Title      ==    Tribe+ | Login
    Type Text      [id="username-login"]        ${Username}    delay=0.1 s 
    Type Secret    [id="password-login"]    $Password      delay=0.1 s
    Click With Options    button   