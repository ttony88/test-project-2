const CHANGE_CONTENT = 'content/CHANGE_CONTENT'

let initialState = {
    content: [
        {
            type: 'panel',
            props: {
                width: 500,
                height: 200,
                visible: true
            },
            content: [
                {
                    type: 'label',
                    props: {
                        caption: 'test',
                        visible: true
                    },
                }
            ]
        },
        {
            type: 'label',
            props: {
                caption: 'test',
                visible: true
            },
        },
        {
            type: 'button',
            props: {
                width: 100,
                height: 50,
                visible: true
            }
        }
    ] 
}

const contentReducer = (state=initialState, action) => {

    switch (action.type) {
        case CHANGE_CONTENT:
            let path = action.path
            let newValue = eval(`(${action.newValue})`)
            let pathArr = path.split(/\W/).filter(i => i !== '' && i !== 'content')
            let nestingLevel = path.split(/\W/).filter(i => i === 'content').length
            let currentElementNumber = 0
            
            if(typeof newValue !== 'object'){
                return {
                    ...state, 
                    content: [...state.content.map(contentItem => {
                        if(contentItem !== state.content[pathArr[0]]){ 
                            return contentItem
                        }
                        return updateValueElement(pathArr, contentItem)})]
                }
                
            }
            return addNewElement(pathArr, state)

            function updateValueElement (arr, item){

                if (nestingLevel === 1) {
                    return {
                        ...item,
                        props: {...item.props,
                        [arr[arr.length-1]]: newValue
                        }    
                    }
                }
                nestingLevel--
                currentElementNumber++
                return {
                    ...item,
                    content: [...item.content.map(i => {
                        if(i !== item.content[arr[currentElementNumber]]) return i
                        return updateValueElement(arr, i)
                        
                    })]
                }
            }
            
            function addNewElement(arr, item){
                
                if(nestingLevel === 1){
                    return {
                        ...item,
                        content: [...item.content, newValue]
                    }
                } else if(nestingLevel > 1){
                    nestingLevel--
                    
                    return {
                        ...item,
                        content: [...item.content.map(i => {
                            if(i !== item.content[arr[currentElementNumber]]){
                                currentElementNumber++
                                return i
                            }
                            return addNewElement(arr, i)
                        })]
                    }
                }
            }
    
        default:
            return state
    }
}
export default contentReducer

export const changeContent = (path, newValue) => ({type: CHANGE_CONTENT, path, newValue})