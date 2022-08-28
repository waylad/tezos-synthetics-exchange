import smartpy as sp

FA12 = sp.io.import_script_from_url('https://smartpy.io/templates/FA1.2.py')

class SynthETH(FA12.FA12):
    pass

# ################################ Test Scenarios #################################    
@sp.add_test(name="fa12_token_test_1")
def test():
    admin1 = sp.address("tz1fwuPsmbphKGNtbsDk8xY4UbsAnHeskxC3")
    game1 = sp.test_account("game1")
    mark = sp.test_account("mark")
    elon = sp.test_account("elon")
    
    token_metadata = {
        "name": "SynthETH",
        "symbol": "sETH",
        "decimals": "6"
    }
    
    sETH = SynthETH(
        admin1, # Update the admin address before deployement to the chain. 
        config = FA12.FA12_config(support_upgradable_metadata= True),
        token_metadata = token_metadata,
        contract_metadata = {
            '': "ipfs://bafkreicysfopd2fnmytjgsagdk555mh6d2npfqrbtlbxfj7srwzayd2maq"
        }
    )
    # IPFS Hash for contract_metadata: bafkreicysfopd2fnmytjgsagdk555mh6d2npfqrbtlbxfj7srwzayd2maq
    scenario = sp.test_scenario()   
    
    scenario += sETH
    
    sETH.mint(sp.record(address = elon.address,value = sp.nat(100))).run(sender = admin1)
    sETH.mint(sp.record(address = mark.address,value = sp.nat(10))).run(sender = admin1)
    sETH.burn(sp.record(address = elon.address,value = sp.nat(10))).run(sender = admin1)
    sETH.transfer(sp.record(from_ = elon.address,to_ = mark.address,value = sp.nat(10))).run(sender=elon)
