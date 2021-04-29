import { useEffect, useState,useRef} from "react";
import { BehaviorSubject} from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { webSocket } from "rxjs/webSocket";
import { Table, Input, Row, Col,Alert } from 'antd';
import { filter,debounceTime,mergeMap,distinctUntilChanged } from "rxjs/operators";

let requestOptions = { method: "GET", redirect: "follow" };
const { Search } = Input;
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
    title: "Market Cap",
    dataIndex: "marketCapUsd",
    key: "marketCapUsd",
    render: (value, row, index) => {
      let marketCapFloat = parseFloat(value) / 1.0e9;
      let marketCapFloatTrillion = marketCapFloat.toFixed(2);

      return <span>{marketCapFloatTrillion}t</span>;
    },

  },

  {
    title: "VWAP 24hrs",
    dataIndex: "vwap24Hr",
    key: "vwap24Hr",
    render: (value) => {
      let renderValue = new Intl.NumberFormat('en-IN',
        {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(value);

      return <span>{renderValue}</span>
    }
  },
  {
    title: "Supply",
    dataIndex: "supply",
    key: "supply",
    render: (value) => {

      let marketCapFloat = parseFloat(value) / 1.0e6;
      let marketCapFloatTrillion = marketCapFloat.toFixed(2);
      let renderValue = new Intl.NumberFormat('en-IN',
        {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(marketCapFloatTrillion);     
      return <span>{renderValue}m</span>;

    }
  },
  {
    title: "Volume 24hrs",
    dataIndex: "volumeUsd24Hr",
    key: "volumeUsd24Hr",
    render: (value) => {
      let volumeUsdFloat = parseFloat(value) / 1.0e9;
      let renderValue = volumeUsdFloat.toFixed(2);
      return <span>{renderValue}t</span>;
    }
  },
  {
    title: "Change",
    dataIndex: "changePercent24Hr",
    key: "changePercent24Hr",
    render: (value) => {
      let changeFloat = parseFloat(value);
      let renderValue = changeFloat.toFixed(2);
      let color = renderValue > 0 ? 'green' : 'red';

      return <span style={{ color: color }}>{renderValue}%</span>;
    }
  },
];
const dataAssets$ = fromFetch(
  "https://api.coincap.io/v2/assets",
  requestOptions
);
const websocketObservable$ = webSocket(
  "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin"
);

const Coins = () => {  
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [search, setSearch] = useState(''); 
  let searchSubject$ = new BehaviorSubject(''); 

  const handleChange = (e)=>{
    const newValue = e.target.value;
    setSearch(newValue.toLowerCase());
    searchSubject$.next(newValue.toLowerCase()); 
  }  
  const filterAssets = async term =>{    
    const searchResult = await assets.filter(asset=>asset.id.includes(term));  
    return searchResult;
  }

  let searchObservable = searchSubject$.pipe(
    filter(val=>val.length>1),
    debounceTime(750),
    distinctUntilChanged(),
    mergeMap(val=>filterAssets(val))
  );


  useEffect(async () => {
    dataAssets$.subscribe((res) =>
      res.json().then((data) => {
        setAssets(data.data),
        setFilteredAssets(data.data)
      }
          
      )
    );   
    
    // websocketObservable$.subscribe((res) =>
    //   console.log("message received", res)
    // );

    return () => {
      //websocket not unsubscribing!
      dataAssets$.unsubscribe();
      websocketObservable$.unsubscribe();

    };
  }, []);
   
  useEffect(() => {
    if(!search){
      setFilteredAssets(assets);
    }else{
      searchObservable.subscribe((result)=>{
        setFilteredAssets(result);
       })
    }
    return () => {
      searchObservable.unsubscribe();
    }
  }, [searchObservable,setFilteredAssets])
  
 return (
    
    <div>
      <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={24} >
            <Search style={{ marginTop: "1em" }}  onChange = {handleChange} value = {search} placeholder="Search" enterButton />
          </Col>
        </Row>
      </div>
      <div style = {{marginTop:"2em"}}>
        {
          !filteredAssets.length ?(<Alert message="No Data Available!" type="error" />):(
            <Table
          rowKey="id"
          columns={columns}
          dataSource={filteredAssets}
          bordered={true}
          scroll={{ y: 400 }}
          pagination={false}
        />
          )
        }
        
      </div>
    </div>
  );

}

export default Coins;