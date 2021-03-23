import axios from "axios";
import { useState, useEffect } from "react";
import { Row, Col, Divider, Button, Tooltip } from 'antd';
import 'antd/dist/antd.css';
const styleButtons = {
  borderRadius: 5,

}

export const MorseTable = (props) => {
  const { mode, clickLetter } = props;
  const [codes, setCodes] = useState([])

  const fetch_codes = () => {
    axios.get('http://mauss-morse-decoder.herokuapp.com/api/get-codes/')
      .then(res => {
        setCodes(res.data)
      })
      .catch(err => console.error(err))
  }
  useEffect(() => {
    fetch_codes()
  }, [])


  return (
    <>
      <Divider>Morse Codes</Divider>
      <Row >
        {codes.map((value) =>
          <Col flex="1 1 20px " key={value.id}>
            <Tooltip title={value.code}>
              <Button shape="round" style={styleButtons}onClick={() => { clickLetter(value.character, value.code) }}>
                {value.character}
              </Button>
            </Tooltip>
          </Col>)
        }
      </Row>
    </>

  )
}