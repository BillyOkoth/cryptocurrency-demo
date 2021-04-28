import { useEffect, useState } from "react";
import { fromFetch } from "rxjs/fetch";
import {Table} from 'antd';

let requestOptions = { method: "GET", redirect: "follow" };
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
      render:value=>{
        let volumeUsdFloat= parseFloat(value)/1.0e8;
        let renderValue = volumeUsdFloat.toFixed(2);
      return<span>{renderValue}B</span>

      }
    },
    {
      title: "Total(%)",
      dataIndex: "percentTotalVolume",
      key: "percentTotalVolume",
      render:(value)=>{
        let totalFloat = parseFloat(value);
        let renderValue = totalFloat.toFixed(2);
        return <span>{renderValue}%</span>
      }
    },
    {
        title: "Status",
        dataIndex: "socket",
        key: "socket",
      },
    
  ];

const dataAssets$ = fromFetch(
    "https://api.coincap.io/v2/exchanges",
    requestOptions
  );
const Exchanges = () =>{
    const [assets, setAssets] = useState([]);
    useEffect(async () => {
      dataAssets$.subscribe((res) =>
        res.json().then((data) => setAssets(data.data))
      );
  
      websocketObservable$.subscribe((res) =>
        console.log("message received", res)
      );
  
      return () => {
        dataAssets$.unsubscribe();
        websocketObservable$.unsubscribe();
       
      };
    }, []);

    return(
        <div>
            <Table
             rowKey="id"
             columns={columns}
             dataSource={assets}
             bordered={true}
             scroll={{ y: 400 }}
             pagination={false}
           />
            
        </div>
    );
}
export default Exchanges;

