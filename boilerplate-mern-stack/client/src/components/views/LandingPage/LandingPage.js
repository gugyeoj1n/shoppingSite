import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Icon, Col, Card, Row } from 'antd'
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { kinds, price } from './Sections/Datas'

function LandingPage() {

    const [products, setProducts] = useState([])
    const [skip, setSkip] = useState(0)
    const [limit, setLimit] = useState(4)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        kinds: [],
        price: []
    })

    const getProducts = (body) => {
        Axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    if (body.loadMore) {
                        setProducts([...products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert("상품들을 가져오는데 실패했어요")
                }
            })
    }

    useEffect(() => {
        let body = {
            skip: skip,
            limit: limit
        }
        getProducts(body)
    }, [])

    const loadMoreHandler = () => {
        let nextSkip = skip + limit
        let Limit = limit + limit
        let body = {
            skip: nextSkip,
            limit: Limit,
            loadMore: true
        }
        getProducts(body)
        setSkip(nextSkip)
    }

    //                    <Card cover={<ImageSlider images={product.images}/>}>
    //cover={<a href={`/product/${product._id}`} ><ImageSlider images={product.images} /></a>
    const renderCards = products.map((product, index) => {
        return <Col lg={6} md={8} xs={24} key={ index }>
                    <Card cover={<a href={`/product/${product._id}`} ><ImageSlider images={product.images} /></a>}>
                        <Meta 
                            title={product.title}
                            description={`$${product.price}`}
                        />
                    </Card>
                </Col>
    })

    const handlePrice = (value) => {
        const data = price;
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }
        return array
    }

    const showFilteredResults = (filter) => {
        let body = {
            skip: 0,
            limit: limit,
            filters: filter
        }
        getProducts(body)
        setSkip(0)
    }

    const handleFilters = (filter, category) => {
        const newFilters = { ...Filters }
        newFilters[category] = filter

        if (category === "price") {
            let priceValues = handlePrice(filter)
            newFilters[category] = priceValues

        }

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    return (
        <div style={{
            width:' 75%', margin: '3rem auto'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h2>당신의 날개를 찾아 보세요 <Icon type='fire' /></h2><br/>
            </div>

            <Row>
                <Col lg={12} xs={24}>
                    <CheckBox list={ kinds } handleFilters={ filters => handleFilters(filters, "kind")}/>
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox list={ price } handleFilters={ filters => handleFilters(filters, "price")}/>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
            { renderCards }
            </Row>
            <br/>
            { PostSize >= limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button style={{ 
                        backgroundColor: 'lavender', border: 'none', borderRadius: '15px', padding: '8px 16px'}}
                        onClick={ loadMoreHandler }>
                            더보기
                    </button>
                </div>
            }
        </div>
    )
}

export default LandingPage
