import React from 'react'

const ImageForm = ({ onSubmit, inputValue, onChange }) => {
    return(
        <div className='flex flex-column items-center'>
            <div>
                <p>This is a face dectection app, give it a try!</p>
            </div>
            <form 
                className='w-100 w-75-m w-50-ns'
                onSubmit={onSubmit}
            >
                <input 
                    className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" 
                    placeholder="Enter an URL" 
                    type="text" 
                    name="image-url"
                    id="image-url" 
                    value={inputValue}
                    onChange={onChange}
                />
                <input 
                    className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 white pointer w-100 w-25-m w-20-l br2-ns br--right-ns" 
                    type="submit" 
                    value="Detect" 
                />
            </form>
        </div>
    )
}

export default ImageForm