import { useEffect, useState } from "react";
import { fromFetch } from "rxjs/fetch";
import { webSocket } from "rxjs/webSocket";
import { Table } from 'antd';

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

      console.log(typeof (renderValue))
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
  return (
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

export default Coins;