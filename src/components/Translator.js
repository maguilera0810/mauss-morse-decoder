import { Input, Divider, Row, Col, Tooltip, Button } from 'antd';
import axios from 'axios';
import { useState, useEffect } from "react";
import { SwapOutlined } from '@ant-design/icons'
import { MorseTable } from "./MorseCodeTable";
const { TextArea } = Input;
const BASE_URL_API = 'http://mauss-morse-decoder.herokuapp.com/api/'

export const TransalatorComponent = (props) => {

  const [message, setMessage] = useState('')
  const [result, setResult] = useState('')
  const [mode, setMode] = useState(true)

  const handleChange = ({ target: { value, name } }) => {
    if (!name.localeCompare('message')) {
      if ((mode & /^[.-\s]*$/.test(value)) || (!mode & /^[0-9\sA-Za-z]*$/.test(value))) {
        setMessage(value.toUpperCase())
      }
    }
  }

  const translate = () => {
    let url = BASE_URL_API;
    url += mode ? 'translate/2human' : 'translate/2morse';
    axios.post(url, { text: message })
      .then(({ data: { code, response } }) => {
        if (code === 200) {
          setResult(response)
        }
      }).catch(console.error)
  }
  const addFromTable = (human, morse) => {
    if (mode) {
      let res = message + ' ' + morse
      res += !morse.localeCompare(' ') ? ' ' : ''
      setMessage(res)
    } else {
      setMessage(message + human)
    }
  }

  const swapMode = () => {
    setMode(!mode)
    const aux = message
    setMessage(result)
    setResult(aux)
  }

  useEffect(() => {
    translate()
  }, [message])

  return (
    <>
      <Row >
        <Col flex="0 0 10px" />
        <Col flex="1 1 100px">
          <Divider>{mode ? 'From: Morse' : 'From: Human'}</Divider>
          <TextArea autoSize
            value={message}
            onChange={handleChange}
            key='1'
            name='message'
          ></TextArea>
        </Col>
        <Col flex="0 0 10px">
          <Tooltip title="Swap">
            <Button shape="circle" icon={<SwapOutlined />}
              onClick={swapMode} />
          </Tooltip>
        </Col>

        <Col flex="1 1 100px">
          <Divider>{!mode ? 'To: Morse' : 'To: Human'}</Divider>
          <TextArea autoSize
            name='result'
            key='2'
            value={result}
          ></TextArea>
        </Col>
        <Col flex="0 0 10px" />
      </Row>
      <MorseTable mode={mode} clickLetter={addFromTable} />
    </>
  )
}