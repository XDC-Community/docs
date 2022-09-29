---
description: >-
  Source:
  https://docs.xdc.org/xdc-tools/xdc-pay/xdcpay-changelist                                         
  Tracking XDCPay Version Numbers and Release Dates against what has changed
---

# XDCPay Changelist



## v6.2.5 Released on 2022.2.7



* Integrated Simplex in the 'Buy' page where users can click on the buy button and will be directed to the Simplex web page.
* Fixed XDCPay window to submit payment for the transaction that was appearing blank.
* In the wallet detail screen, under the Token tab fixed token list was getting cropped at the end.
* Unable to add custom RPC network as. 'Invalid RPC Endpoint' error message is getting displayed is fixed.
* While making the second transaction, a continuous loader appears. The user has to navigate out from the application to remove this loader is fixed.
* Password Strength Validation- Moderate password strength is not working as expected. After giving 2 characters, the 'Fair' label is displayed.&#x20;
* Give validation to URL so that user cannot enter invalid values.
* The user is able to add/update a network by giving only a URL and it appears as a blank section in the network list. Give validation for network URL and network name.
* Add Network - No error message is displayed if a user tries to add a network that already exists in the list.
* By default names for imported accounts become consistent if the user adds more than one account.
* Contact is getting added without giving name and wallet address.
* Users should not be able to add their own wallet addresses.
* Validation while adding an account is not working as expected. The user is able to add a contact by giving either name or wallet address only.
* Give validation to wallet address while adding a contact i.e. Address should have 43 characters and It should be hexadecimal.
* Send token UI is distorted if the user has an insufficient token amount.
* In add contact page, show an error message for the contact name below its input field.&#x20;
* Hide token balance toggle button, resets to off state as soon as the user navigates away from wallet.
* Advanced gas control toggle button resets to on state as soon as the user navigates away from the wallet.
* Currency is not reflected in the wallet detail screen if the user adds a custom network.
* Deploy contract transaction in Mainnet is showing warning message 'Taking too long? Retry with a higher gas price here'.
* Change type of scrollbar used in 'My Accounts' list.
* Users should not be able to create a wallet if the password strength is weak
* Users should not be able to restore accounts using seed phrases if the new password strength is weak.
* Confirm Recovery Phrase screen should not come if a user reveals the seed phrase from Security and Privacy Settings
* Avatar should be the same on the contacts list as assigned to a wallet address during its creation.
* Add Contact page, while adding/updating contact give character limit to name field as it is distorting UI.
* By clicking on 'Copy address to clipboard' in the token list, the account address is getting copied. It should copy the contract address associated with that token.
* XDCPay is showing 10 Quadrillion tokens when only 1 Million were created.
* Password strength which is displayed using the color bar is showing incorrect color. Use the same color as given in designs.
* Display Incorrect Password message if the user enters the incorrect password while revealing seed phrase from Security and Privacy settings
* Moved the Simplex option on the top of the list when a user clicks on Buy with Mainnet network selected to buy XDC.
* Remove the Mercatox option from the list when a user clicks on Buy with Mainnet network selected to buy XDC.
