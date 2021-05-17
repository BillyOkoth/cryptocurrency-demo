import React,{useEffect} from 'react'
import {shallow,mount} from "enzyme";
import Exchanges from "./exchanges";
import { Table, Row, Col, Input,Alert } from 'antd';
import { debug } from 'webpack';

const wrapper = shallow(<Exchanges/>);
const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Trading Pairs",
      dataIndex: "tradingPairs",
      key: "tradingPairs",
    },
    {
      title: "Volume 24hrs",
      dataIndex: "volumeUsd",
      key: "volumeUsd",
      render: value => {
        let volumeUsdFloat = parseFloat(value) / 1.0e8;
        let renderValue = volumeUsdFloat.toFixed(2);
        return <span>{renderValue}B</span>
  
      }
    },
    {
      title: "Total(%)",
      dataIndex: "percentTotalVolume",
      key: "percentTotalVolume",
      render: (value) => {
        let totalFloat = parseFloat(value);
        let renderValue = totalFloat.toFixed(2);
        return <span>{renderValue}%</span>
      }
    },
    // {
    //   title: "Status",
    //   dataIndex: "socket",
    //   key: "socket",
    // },
  ];
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
    let props;

    beforeEach(()=>{
          jest.spyOn(React,'useEffect').mockImplementation(f =>f());
        props = {
            fetchExchanges:jest.fn().mockReturnValue(fakeAssets)
        }
        wrapper2 = shallow(<Exchanges {...props}/>);
        
    })
    describe('Exchange component',()=>{
    it('it loads exchanges',()=>{
        // expect(props.fetchExchanges).toHaveBeenCalled();      
         console.log((wrapper.find('Table')).debug());
         expect(wrapper.find('Table').props().dataSource).toBe(fakeAssets);
    });
                //1.What the component renders on mount.
                //2.test search with an exsisitng search term and what it returns.
                //3.test when the search term is empty or null.
                //4.test when the search term doesnot exsist.
                //5.test with [exsisiting ,empty, non-exsisting] term.

    });