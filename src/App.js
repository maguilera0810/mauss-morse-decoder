import { Layout, Menu, Breadcrumb, Tabs } from 'antd';
import { TransalatorComponent } from "./components/Translator";
import { BinaryTransalatorComponent } from './components/BinaryTranslator';
import { WordsTable } from './components/Words';
import logo from './logo.svg';
import './App.css';
const { Header, Content, Footer } = Layout;

const { TabPane } = Tabs;
function App() {
  return (
    <Layout>
      <Content style={{ padding: '0 50px', height: '100vh' }}>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Morse/Human" key="1">
            <TransalatorComponent />
          </TabPane>
          <TabPane tab="Binary" key="2">
            <BinaryTransalatorComponent />
          </TabPane>
          <TabPane tab="Frequency Words Table" key="3">
            <WordsTable />
          </TabPane>
        </Tabs>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Mauss ©2021 Created by Mauricio Aguilera
      </Footer>
    </Layout>
  );
}

export default App;