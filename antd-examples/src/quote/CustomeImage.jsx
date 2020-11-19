import React from 'react'


function CustomeImage(props) {
    return (
        <img {...props} src={`/a?fileId=${props.fileId}`} />
    )
}
export { CustomeImage };
export default CustomeImage;