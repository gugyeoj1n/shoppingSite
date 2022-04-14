import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Icon, Col, Card, Row } from 'antd'
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {

    const [products, setProducts] = useState([])

    useEffect(() => {
        let body = 
        Axios.post('/api/product/products', )
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.productInfo)
                } else {
                    alert("상품들을 가져오는데 실패했어요")
                }
            })
    })
    //                    <Card cover={<ImageSlider images={product.images}/>}>
    //cover={<a href={`/product/${product._id}`} ><ImageSlider images={product.images} /></a>
    const renderCards = products.map((product, index) => {
        return <Col lg={6} md={8} xs={24} key={ index }>
                    <Card cover={<a href={`/product/${product._id}`} ><ImageSlider images={product.images} /></a>}>
                        <Meta 
                            title={product.title}
                            description={`$ ${product.price}`}
                        />
                    </Card>
                </Col>
    })

    return (
        <div style={{
            width:' 75%', margin: '3rem auto'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h2>당신의 날개를 찾아 보세요 <Icon type='fire' /></h2><br/>
            </div>
            <Row gutter={[16, 16]}>
            { renderCards }
            </Row>
            <br/>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button style={{ 
                    backgroundColor: 'lavender', border: 'none', borderRadius: '15px', padding: '8px 16px'}}>
                        더보기
                </button>
            </div>

        </div>
    )
}

export default LandingPage
