import { useEffect, useState } from "react";
import { fromFetch } from "rxjs/fetch";
import { Table, Row, Col, Input,Alert } from 'antd';
import { BehaviorSubject } from "rxjs";
import { debounceTime, distinctUntilChanged, filter, mergeMap } from "rxjs/operators";


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


const dataAssets$ = fromFetch(
  "https://api.coincap.io/v2/exchanges",
  requestOptions
);
//filterfunction. 

const Exchanges = (props) => {
  const [assets, setAssets] = useState([]); 
  const [search, setSearch] = useState('');  
 
  //filterfunction
  const filterExchanges = async term =>{      
     
     if(term){      
      let  exchangesResult = await assets.concat().filter(asset=> asset.exchangeId.includes(term));       
      setAssets(exchangesResult);       
     } else {
      dataAssets$.subscribe((res) =>
      res.json().then((data) => {
        setAssets(data.data);    
      })
    );   
     }
      
   
  }  
  //onchange function.
  const handleChange = (e)=>{
    const newValue = e.target.value;
    setSearch(newValue.toLowerCase());   
    filterExchanges(newValue.toLowerCase());
  
  }


  useEffect(async () => {
   await dataAssets$.subscribe((res) =>
      res.json().then((data) => {
        setAssets(data.data);    
      })
    );   
    return () => {
      dataAssets$.unsubscribe();
      websocketObservable$.unsubscribe();
    };
  }, [dataAssets$]);

 
  return (
    <div>
      <div>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={24} >
            <Search style={{ marginTop: "1em" }} placeholder="Search" value = {search} onChange = {handleChange} enterButton />
          </Col>
        </Row>
      </div>
      <div style={{ marginTop: "2em" }}>
       
       {  !assets.length ? ( <Alert message="No Data Available!" type="error" />):(
         <div></div>
       )        
       }       
      
      <Table
            rowKey="exchangeId"
            columns={columns}
            dataSource={assets}
            bordered={true}
            scroll={{ y: 400 }}
            pagination={false}
          />

      
      
      </div>
    </div>
  );
}
export default Exchanges;

