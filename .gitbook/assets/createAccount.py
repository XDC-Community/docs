from bitcoin import random_key



# Gets private key of wallet to create new account.

def createAccount():
    privateKey = random_key()
    return privateKey