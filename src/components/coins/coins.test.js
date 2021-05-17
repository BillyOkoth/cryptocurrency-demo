import { shallow } from "enzyme";
import Coins from "./coins";


const wrapper = shallow(<Coins/>);    
const fakeAssets =  [
    {
        "id": "bitcoin",
        "rank": "1",
        "symbol": "BTC",
        "name": "Bitcoin",
        "supply": "17193925.0000000000000000",
        "maxSupply": "21000000.0000000000000000",
        "marketCapUsd": "119150835874.4699281625807300",
        "volumeUsd24Hr": "2927959461.1750323310959460",
        "priceUsd": "6929.8217756835584756",
        "changePercent24Hr": "-0.8101417214350335",
        "vwap24Hr": "7175.0663247679233209"
      },
      {
        "id": "ethereum",
        "rank": "2",
        "symbol": "ETH",
        "name": "Ethereum",
        "supply": "101160540.0000000000000000",
        "maxSupply": null,
        "marketCapUsd": "40967739219.6612727047843840",
        "volumeUsd24Hr": "1026669440.6451482672850841",
        "priceUsd": "404.9774667045200896",
        "changePercent24Hr": "-0.0999626159535347",
        "vwap24Hr": "415.3288028454417241"
      },
]
describe('search functionality test',()=>{
    test('renders with Search!',()=>{    
        expect(wrapper.find('Search').length).toBe(1);
        expect(wrapper.find('Search').props().value).toBe('');
        expect(wrapper.find('Search').props().placeholder).toBe('Search');  
    });
    
    test ('the correct value is captured in search!', ()=>{  
     
        const event = {target:{value:"bitcoin"} }
        wrapper.find('Search').simulate('change',event);        
        expect(wrapper.find('Search').props().value).toBe('bitcoin')          
        
        const results =  fakeAssets.filter(asset=>asset.id.includes(event.target.value));        
        expect(results).toEqual([fakeAssets[0]]);  
        
    });
})


