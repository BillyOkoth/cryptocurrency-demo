import {Input, Layout, Row, Col, Menu } from "antd";
import {AppstoreOutlined, BarChartOutlined, DollarOutlined,} from "@ant-design/icons";
import { Link, Route, Switch,BrowserRouter as Router,} from "react-router-dom";
import Coins from './coins/coins';
import Exchanges from './exchanges/exchanges';
import Charts from './charts/charts';
import Markets from './markets/markets'
import "./app.css";

const { Header, Content } = Layout;
const { Search } = Input;
const App = () => {
    return (
    <div style={{ height: "100vh", overflowY: "hidden" }}>
      <Layout>
            <Router>
              <Header style={{ backgroundColor: "#ffffff" }}>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col className="gutter-row" span={12}>
                    <Menu mode="horizontal" style={{ marginLeft: "-2.5em" }}>
                      <Menu.Item key="mail" icon={<DollarOutlined />} >
                        Coins    
                        <Link to = "/"></Link>              
                      </Menu.Item>
                      <Menu.Item key="app" icon={<AppstoreOutlined />}>
                        Exchanges
                        <Link to = "/exchanges"></Link>  
                      </Menu.Item>
                      <Menu.Item key="alipay" icon={<BarChartOutlined />}>
                        Charts
                        <Link to = "/charts"></Link>  
                      </Menu.Item>
                      <Menu.Item  icon={<BarChartOutlined />}>
                        Markets
                        <Link to = "/markets"></Link>  
                      </Menu.Item>
                    </Menu>
                  </Col>
                  <Col className="gutter-row" span={12} >
                    <Search style = {{marginTop:"1em"}} placeholder="Search" enterButton />
                  </Col>
                </Row>
              </Header>
              <Content style={{ margin: "2em" }}>      
                  <Switch>
                    <Route exact path = '/'component = {Coins} ></Route>
                    <Route exact path = '/exchanges' component = {Exchanges}></Route>
                    <Route exact path = '/charts' component = {Charts}></Route>
                    <Route exact path = '/markets' component = {Markets}></Route>
                  </Switch>               
              </Content>
            
            </Router>
        </Layout>
      
    </div>
  );
};
export default App;
