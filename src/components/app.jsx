import { useEffect, useState } from "react";
import { fromFetch } from "rxjs/fetch";
import { webSocket } from "rxjs/webSocket";
import { Table, Tag, Space } from "antd";
import "./app.css";

let requestOptions = { method: "GET", redirect: "follow" };

const dataAssets$ = fromFetch(
  "https://api.coincap.io/v2/assets",
  requestOptions
);
const websocketObservable$ = webSocket(
  "wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin"
);
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
  },
  {
    title: "Market Cap",
    dataIndex: "marketCapUsd",
    key: "marketCapUsd",
  },

  {
    title: "VWAP 24hrs",
    dataIndex: "vwap24Hr",
    key: "vwap24Hr",
  },
  {
    title: "Supply",
    dataIndex: "supply",
    key: "supply",
  },
  {
    title: "Volume 24hrs",
    dataIndex: "volumeUsd24Hr",
    key: "volumeUsd24Hr",
  },
  {
    title: "Change",
    dataIndex: "changePercent24Hr",
    key: "changePercent24Hr",
  },
];


const App = () => {
  const [assets, setAssets] = useState([]);
  useEffect(async () => {
    dataAssets$.subscribe((res) =>
      res.json().then((data) => setAssets(data.data))
    );

    websocketObservable$.subscribe(
      (res)=>console.log('message received',res)
    )

    return () => {
      dataAssets$.unsubscribe();
      websocketObservable$.unsubscribe();
    };
  }, []);
  
  return (
    <div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={assets}
        bordered={true}
        scroll={{ y: 500 }}
        pagination={false}
      />
    </div>
  );
};
export default App;
