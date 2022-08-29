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
                sUSD_contract = sp.address('KT1RLQTVsdCP2f4gz9hfi88yuEEcx4ohRmxX'),
                sBTC_contract = sp.address('KT1H2Ai3Y9LCZcRa64kAJLGrxR2jDrPNoi1g'),
                sETH_contract = sp.address('KT1H2Ai3Y9LCZcRa64kAJLGrxR2jDrPNoi1g'),
                harbinger_contract = sp.address('KT1ENe4jbDE1QVG1euryp23GsAeWuEwJutQX')
            )

    def _isAdmin(self):
        sp.verify(self.data.administrator == sp.sender, message = self.error.notAdmin())

    @sp.entry_point
    def buySynthUsd(self, amount):

        # TODO: Get XTZ/USD price from Harbinger https://better-call.dev/ghostnet/KT1ENe4jbDE1QVG1euryp23GsAeWuEwJutQX/storage/big_map/25877/keys
        
        contractParams = sp.contract(sp.TRecord(address = sp.TAddress, amount = sp.TNat), self.data.sUSD_contract ,entry_point="mint").open_some()
        dataToBeSent = sp.record(address = sp.sender, amount = amount)
        sp.transfer(dataToBeSent, sp.mutez(0), contractParams)
 
    
    @sp.entry_point
    def sellSynthUsd(self, amount, withdraw_amount):
        contractParams = sp.contract(sp.TRecord(address = sp.TAddress, amount = sp.TNat), self.data.sUSD_contract ,entry_point="burn").open_some()
        dataToBeSent = sp.record(address = sp.sender, amount = amount)
        sp.transfer(dataToBeSent, sp.mutez(0), contractParams)
        # sp.send(sp.sender, withdraw_amount)


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
    sc += controller.buySynthUsd(1).run(sender = elon.address, amount = sp.mutez(7000000))
    sc += controller.sellSynthUsd(amount = 1).run(sender = elon.address)    