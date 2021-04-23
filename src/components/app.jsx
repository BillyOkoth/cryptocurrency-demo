import { useEffect, useState } from "react";
import { fromFetch } from "rxjs/fetch";
import { webSocket } from "rxjs/webSocket";
import { Table, Tag, Input, Layout, Row, Col, Divider, Card, Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import "./app.css";

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;
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

    websocketObservable$.subscribe((res) =>
      console.log("message received", res)
    );

    return () => {
      dataAssets$.unsubscribe();
      websocketObservable$.unsubscribe();
    };
  }, []);

  return (
    <div style={{ height: "100vh", overflowY: "hidden" }}>
      <Layout>
        <Header style={{ backgroundColor: "#ffffff" }}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={12}>
              <Menu mode="horizontal" style={{ marginLeft: "-2.5em" }}>
                <Menu.Item key="mail" icon={<DollarOutlined />}>
                  Coins
                </Menu.Item>
                <Menu.Item key="app" icon={<AppstoreOutlined />}>
                  Exchanges
                </Menu.Item>
                <Menu.Item key="alipay" icon={<BarChartOutlined />}>
                  Charts
                </Menu.Item>
              </Menu>
            </Col>
            <Col className="gutter-row" span={12} >
              <Search style = {{marginTop:"1em"}} placeholder="input search text" enterButton />
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: "2em" }}>
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            style={{ marginBottom: "1em" }}
          >
            <Col className="gutter-row" span={4}>
              <div>
                <Card title="Card title" bordered={false}>
                  Card content
                </Card>
              </div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div>
                <Card title="Card title" bordered={false}>
                  Card content
                </Card>
              </div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div>
                <Card title="Card title" bordered={false}>
                  Card content
                </Card>
              </div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div>
                <Card title="Card title" bordered={false}>
                  Card content
                </Card>
              </div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div>
                <Card title="Card title" bordered={false}>
                  Card content
                </Card>
              </div>
            </Col>
            <Col className="gutter-row" span={4}>
              <div>
                <Card title="Card title" bordered={false}>
                  Card content
                </Card>
              </div>
            </Col>
          </Row>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={assets}
            bordered={true}
            scroll={{ y: 400 }}
            pagination={false}
          />
        </Content>
        {/* <Footer>Footer</Footer> */}
      </Layout>
    </div>
  );
};
export default App;
