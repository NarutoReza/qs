import { useState } from "react"
import './tags.css'

const TagsInput = () => {
    const [ tags, setTags ] = useState({
        tag: ['']
    })

    console.log(tags)

    const handleKeyDown = e => {
        if(e.key !== 'Enter') return

        const value = e.target.value
        if(!value.trim()) return

        setTags([...tags, value])
        e.target.value = ''
    }

    const removeTag = (arr, value) => {
        return arr.filter(function (geeks) {
            return geeks != value;
        });
    }


    return(
        <>
            <div className="tags-input-container">
                { tags.tag && tags.tag.map((tag, index) => {
                    return(
                        <div className="tag-item" key={index}>
                            <a className="text">{tag}</a>
                            <span className="close" onClick={() => removeTag(tags.tag, tag)}>&times;</span>
                        </div>
                    )
                })}

                <input onKeyDown={handleKeyDown} type="text" placeholder="Enter your tag" className="tags-input" />
            </div>
        </>
    )
}

export default TagsInput