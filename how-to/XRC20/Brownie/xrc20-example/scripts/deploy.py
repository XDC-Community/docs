#!/usr/bin/python3

from brownie import XRC20Token, accounts


def main():
    acct = accounts.load('xrc20')
    return XRC20Token.deploy("MyToken", "MTK", 18, 1e21, {'from': acct})
