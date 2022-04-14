import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd'
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios'

const { Title } = Typography
const { TextArea } = Input

const kinds = [
  {key:1, value:'상의'},
  {key:2, value:'하의'},
  {key:3, value:'아우터'},
  {key:4, value:'신발'},
  {key:5, value:'모자'},
  {key:6, value:'액세서리'}
]

function UploadProductPage(props) {
  const [name, setName] = useState("")
  const [explain, setExplain] = useState("")
  const [price, setPrice] = useState(0)
  const [kind, setKind] = useState(1)
  const [image, setImage] = useState([])

  const nameChangeHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const explainChangeHandler = (event) => {
    setExplain(event.currentTarget.value)
  }

  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value)
  }

  const kindChangeHandler = (event) => {
    setKind(event.currentTarget.value)
  }

  const refreshFunction = (newImages) => {
    setImage(newImages)
  }

  const submitHandler = (event) => {
    event.preventDefault()

    if (!name || !explain || !price || !kind || !image) {
      console.log(name)
      console.log(explain)
      console.log(price)
      console.log(kind)
      console.log(image)
      return alert("모든 항목을 채워야 상품을 업로드할 수 있어요 :(")
    }

    const body = {
      writer: props.user.userData._id,
      title: name,
      description: explain,
      price: price,
      images: image, 
      kind: kind
    }

    Axios.post('/api/product', body)
      .then(response => {
        if (response.data.success) {
          alert("성공적으로 상품이 업로드되었어요!")
          props.history.push('/')
        } else {
          alert("상품 업로드에 실패했어요.")
        }
      })
  }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto'}}>
      <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
        <Title level={2}>판매할 상품을 올려 보아요</Title>
        <h4>이미지를 클릭하면 삭제할 수 있어요</h4>
      </div>
      <Form onSubmitCapture={ submitHandler }>
        <FileUpload refreshFunction={ refreshFunction }/>
        <br/>
        <br/>
        <label style={{ fontSize: "18px" }}>상품명 (제목)</label>
        <Input onChange={ nameChangeHandler } value={ name }/>
        <br/>
        <br/>
        <label style={{ fontSize: "18px" }}>상품에 대한 설명</label>
        <TextArea onChange={ explainChangeHandler } value={ explain }/>
        <br/>
        <br/>
        <label style={{ fontSize: "18px" }}>가격 ($)</label>
        <Input type='number' onChange={ priceChangeHandler } value={ price }/>
        <br/>
        <br/>
        <select onChange={ kindChangeHandler } value={ kind }>
          { kinds.map(item => (
            <option key={ item.key } value={ item.key }>
              { item.value }
            </option>
          ))}
        </select>
        <br/>
        <br/>
        <Button htmlType="submit">업로드</Button>
      </Form>
    </div>
  )
}

export default UploadProductPage