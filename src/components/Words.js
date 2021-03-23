import axios from "axios";
import { useState, useEffect } from "react";
import { Row, Col, Divider, Button, Tooltip,Table } from 'antd';
import 'antd/dist/antd.css';
const styleButtons = {
  borderRadius: 5,

}

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Word',
    dataIndex: 'word',
    key: 'word',
  },
  {
    title: 'Morse',
    dataIndex: 'morse',
    key: 'morse',
  },
  {
    title: 'Frequency',
    dataIndex: 'frequency',
    key: 'frequency',
  },
]


export const WordsTable = (props) => {
  const { mode, clickLetter } = props;
  const [dataSource, setDataSource] = useState([])

  const fetch_codes = () => {
    axios.get('http://mauss-morse-decoder.herokuapp.com/api/get-words/')
      .then(res => {
        setDataSource(res.data.results)
      })
      .catch(err => console.error(err))
    
  }
  useEffect(() => {
    fetch_codes()
  }, [])


  return (
    <>
      <Divider>Morse Codes</Divider>
      <Table dataSource={dataSource} columns={columns} />;
    </>

  )
}