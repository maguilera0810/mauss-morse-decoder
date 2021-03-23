import { Input, Divider, Row, Col, Tooltip, Button } from 'antd';
import axios from 'axios';
import { useState, useEffect } from "react";
import { AimOutlined, CaretRightFilled, CloudUploadOutlined, PauseOutlined, PlayCircleFilled, SwapOutlined } from '@ant-design/icons'
import { MorseTable } from "./MorseCodeTable";
const { TextArea } = Input;
const BASE_URL_API = 'http://mauss-morse-decoder.herokuapp.com/api/'

export const BinaryTransalatorComponent = (props) => {

  let [message, setMessage] = useState('')
  const [result1, setResult1] = useState('')
  const [result2, setResult2] = useState('')
  const [mode, setMode] = useState(true)
  const [state, setstate] = useState(0)

  const handleChange = ({ target: { value, name } }) => {
    if (/^[01]*$/.test(value)) {
      setMessage(value)
    }

  }

  const translate = () => {
    let url = BASE_URL_API + 'translate/bit2human';
    axios.post(url, { text: message })
      .then(({ data: { code, response } }) => {
        if (code === 200) {
          setResult1(response)
        }
      }).catch(console.error)
    url = BASE_URL_API + 'translate/bit2morse';
    axios.post(url, { text: message })
      .then(({ data: { code, response } }) => {
        if (code === 200) {
          setResult2(response)
        }
      }).catch(console.error)
  }

  const ones = () => setTimeout(() => {
    setMessage(m => m + '1')
  }, 200);


  const zeros = () => setTimeout(() => {

    setMessage(m => m + '0')
  }, 200);





  useEffect(() => {
    let timeout;
    if (state === 1) {
      timeout = zeros()
    } else if (state === 2) {
      timeout = ones()
    }
    return () => clearInterval(timeout);
  })

  return (
    <>
      <Row >
        <Col flex="1 1 100px">
          <Divider>From: Binary</Divider>
          <TextArea autoSize
            value={message}
            onChange={handleChange}
            key='1'
            name='message'
          ></TextArea>
        </Col>
      </Row >
      <Row >
        <Col flex="1 1 100px">
          <Divider>To: Human</Divider>
          <TextArea autoSize
            name='result1'
            key='result1'
            value={result1}
          ></TextArea>
        </Col>
      </Row>
      <Row >
        <Col flex="1 1 100px">
          <Divider>To: Morse</Divider>
          <TextArea autoSize
            name='result2'
            key='result2'
            value={result2}
          ></TextArea>
        </Col>
      </Row>
      <Row>
        <Col flex="auto" />
        {state === 0 ?
          <>
            <Col flex="0 0 10px">
              <Tooltip title="Play">
                <Button shape="round" icon={<CaretRightFilled />}
                  onClick={() => { setstate(1) }} />
              </Tooltip>
            </Col>
            <Col flex="0 0 10px" />
          </>

          :
          <>
            <Col flex="0 0 10px">
              <Tooltip title="Stop">
                <Button shape="round" icon={<PauseOutlined />}
                  onClick={() => { setstate(0) }} />
              </Tooltip>
            </Col>
            <Col flex="0 0 10px" />
          </>
        }
        <Col flex="0 0 10px">
          <Button shape="round"
            disabled={state === 0}
            icon={<AimOutlined />}
            onMouseUp={() => {
              setstate(1)
            }}
            onMouseDown={() => {
              setstate(2)
            }}
          />
        </Col>
        <Col flex="0 0 10px" />
        <Col flex="0 0 10px">
          <Tooltip title="Translate">
            <Button shape="round" icon={<CloudUploadOutlined />}
              onClick={translate} />
          </Tooltip>
        </Col>
        <Col flex="auto" />
      </Row>

    </>
  )
}
