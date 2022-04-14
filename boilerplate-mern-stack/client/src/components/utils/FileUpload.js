import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Icon } from 'antd'
import Axios from 'axios'

function FileUpload(props) {
    const [Images, setImages] = useState([])

    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image)
        let newImages = [...Images]
        newImages.splice(currentIndex, 1)
        setImages(newImages)
        props.refreshFunction(Images)

    }
    const dropHandler = (files) => {
        let form_data = new FormData()
        form_data.append('file', files[0])
        const config = {
            header: {'content-type' : 'multipart/form-data'}
        }
    
        Axios.post('/api/product/image', form_data, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...Images, response.data.fileName])
                    props.refreshFunction([...Images, response.data.fileName])
                } else {
                    alert('파일을 저장하는데 실패했어요')
                }
            })
    }
  return (
    <div style={{ display: 'flex', justifyContent: 'center'}}>
        <Dropzone onDrop={ dropHandler }>
            {({getRootProps, getInputProps}) => (
                <div style={{
                    width:300, height:240, border: '4px solid lightgray', display: 'flex',
                    alignItems: 'center', justifyContent: 'center'
                }} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Icon type='plus' style={{ fontSize: '4rem ', color: "skyblue" }} />
                </div>
            )}
        </Dropzone>
        <div style={{ display: 'flex', width: '300px', height: '240px', overflowX: "scroll"}}>
                { Images.map((image, index) => (
                    <div onClick={ () => deleteHandler(image) } key={ index }>
                        <img style={{ minWidth:'300px', width:'300px', height:'240px'}}
                            src={`http://localhost:5000/uploads/${image}`}
                        />
                    </div>
                )) }
        </div>
    </div>
  )
}

export default FileUpload