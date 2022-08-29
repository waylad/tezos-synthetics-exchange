import smartpy as sp

class Error:
    def notAdmin(self):
        return "NOT_AN_ADMIN"

class SynthDex(sp.Contract):
    def __init__(self, params):
        self.error = Error()
        self.init(administrator = params.administrator,
                matadata = params.metadata,
                ledger = sp.big_map(l = {}, tkey = sp.TAddress, tvalue = sp.TRecord(token_address = sp.TMutez, token_amount = sp.TNat)),
                sUSD_contract = sp.address('KT1BbKvF35VRn9WaQNdAjC98ENSEcX1HSdwz'),
                sBTC_contract = sp.address('KT1Sxot6LZJsm2fTG3N82SPXfQxbuNr1NRr6'),
                sETH_contract = sp.address('KT1GH8gbE7XVp2bmM4k97KmiTQidddT1MgsQ'),
                harbinger_contract = sp.address('KT1ENe4jbDE1QVG1euryp23GsAeWuEwJutQX')
            )

    def _isAdmin(self):
        sp.verify(self.data.administrator == sp.sender, message = self.error.notAdmin())

    @sp.entry_point
    def buySynthUsd(self):
        # TODO: Get XTZ/USD price from Harbinger https://better-call.dev/ghostnet/KT1ENe4jbDE1QVG1euryp23GsAeWuEwJutQX/storage/big_map/25877/keys
        # Assuming 2 USD
        token_amount = sp.local( 'token_amount', sp.utils.mutez_to_nat(sp.amount) / 2)
        sp.trace('buySynthUsd token_amount')
        sp.trace(token_amount.value)

        contractParams = sp.contract(sp.TRecord(address = sp.TAddress, amount = sp.TNat), self.data.sUSD_contract, entry_point="mint").open_some()
        dataToBeSent = sp.record(address = sp.sender, amount = token_amount.value)
        sp.transfer(dataToBeSent, sp.mutez(0), contractParams)
 
    
    @sp.entry_point
    def sellSynthUsd(self, amount):
        contractParams = sp.contract(sp.TRecord(address = sp.TAddress, amount = sp.TNat), self.data.sUSD_contract, entry_point="burn").open_some()
        dataToBeSent = sp.record(address = sp.sender, amount = amount)
        sp.transfer(dataToBeSent, sp.mutez(0), contractParams)

        xtz_amount = sp.local( 'xtz_amount', amount * 2)
        sp.trace('sellSynthUsd xtz_amount')
        sp.trace(xtz_amount.value)
        sp.send(sp.sender, sp.utils.nat_to_mutez(xtz_amount.value))

    @sp.entry_point
    def buySynthEth(self):
        # TODO: Get XTZ/USD and ETH/USD price from Harbinger https://better-call.dev/ghostnet/KT1ENe4jbDE1QVG1euryp23GsAeWuEwJutQX/storage/big_map/25877/keys
        # Assuming 1500 USD
        token_amount = sp.local( 'token_amount', sp.utils.mutez_to_nat(sp.amount) / 1500)
        sp.trace('buySynthEth token_amount')
        sp.trace(token_amount.value)

        contractParams = sp.contract(sp.TRecord(address = sp.TAddress, amount = sp.TNat), self.data.sETH_contract, entry_point="mint").open_some()
        dataToBeSent = sp.record(address = sp.sender, amount = token_amount.value)
        sp.transfer(dataToBeSent, sp.mutez(0), contractParams)
 
    
    @sp.entry_point
    def sellSynthEth(self, amount):
        contractParams = sp.contract(sp.TRecord(address = sp.TAddress, amount = sp.TNat), self.data.sETH_contract, entry_point="burn").open_some()
        dataToBeSent = sp.record(address = sp.sender, amount = amount)
        sp.transfer(dataToBeSent, sp.mutez(0), contractParams)

        xtz_amount = sp.local( 'xtz_amount', amount * 1400)
        sp.trace('sellSynthEth xtz_amount')
        sp.trace(xtz_amount.value)
        sp.send(sp.sender, sp.utils.nat_to_mutez(xtz_amount.value))

    @sp.entry_point
    def buySynthBtc(self):
        # TODO: Get XTZ/USD and BTC/USD price from Harbinger https://better-call.dev/ghostnet/KT1ENe4jbDE1QVG1euryp23GsAeWuEwJutQX/storage/big_map/25877/keys
        # Assuming 20000 USD
        token_amount = sp.local( 'token_amount', sp.utils.mutez_to_nat(sp.amount) / 20000)
        sp.trace('buySynthBtc token_amount')
        sp.trace(token_amount.value)

        contractParams = sp.contract(sp.TRecord(address = sp.TAddress, amount = sp.TNat), self.data.sBTC_contract, entry_point="mint").open_some()
        dataToBeSent = sp.record(address = sp.sender, amount = token_amount.value)
        sp.transfer(dataToBeSent, sp.mutez(0), contractParams)
 
    
    @sp.entry_point
    def sellSynthBtc(self, amount):
        contractParams = sp.contract(sp.TRecord(address = sp.TAddress, amount = sp.TNat), self.data.sBTC_contract, entry_point="burn").open_some()
        dataToBeSent = sp.record(address = sp.sender, amount = amount)
        sp.transfer(dataToBeSent, sp.mutez(0), contractParams)

        xtz_amount = sp.local( 'xtz_amount', amount * 19000)
        sp.trace('sellSynthBtc xtz_amount')
        sp.trace(xtz_amount.value)
        sp.send(sp.sender, sp.utils.nat_to_mutez(xtz_amount.value))


# #############################################################
# ########################### Testing #########################
# #############################################################

@sp.add_test(name = "SynthDex")
def test():
    sc = sp.test_scenario()
    sc.h1("SynthDex")
    sc.table_of_contents()
    admin = sp.address("tz1fwuPsmbphKGNtbsDk8xY4UbsAnHeskxC3")
    mark = sp.test_account("mark")
    elon = sp.test_account("elon")
    sc.h1("Accounts")
    sc.show([mark, elon])

    controller = SynthDex(sp.record(administrator = admin, 
            metadata = sp.utils.metadata_of_url("ipfs://QmW8jPMdBmFvsSEoLWPPhaozN6jGQFxxkwuMLtVFqEy6Fb")))
    sc.h1("Code")   
    sc += controller

    sc.h1("Buy/Sell sUSD")
    sc += controller.buySynthUsd().run(sender = elon.address, amount = sp.mutez(7000000))
    sc += controller.sellSynthUsd(1).run(sender = elon.address)    

    # sc.h1("Buy/Sell sETH")
    # sc += controller.buySynthEth().run(sender = elon.address, amount = sp.mutez(7000000))
    # sc += controller.sellSynthEth(1).run(sender = elon.address)    

    # sc.h1("Buy/Sell sBtc")
    # sc += controller.buySynthBtc().run(sender = elon.address, amount = sp.mutez(7000000))
    # sc += controller.sellSynthBtc(1).run(sender = elon.address)    