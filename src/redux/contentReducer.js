const CHANGE_CONTENT = 'content/CHANGE_CONTENT'

let initialState = {
    content: [
        {
            id: 1,
            type: 'panel',
            props: {
                width: 500,
                height: 200,
                visible: true
            },
            content: [
                {
                    id: 2,
                    type: 'label',
                    props: {
                        caption: 'test',
                        visible: true
                    },
                }
            ]
        },
        {
            id: 3,
            type: 'label',
            props: {
                caption: 'test',
                visible: true
            },
        },
        {
            id: 4,
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
            let pathArr = action.path.split('.').filter(i => i !== '')
            let newValue = new Function('return' + `(${action.newValue})`)()
            
            return updateContent(pathArr, state) 
            
            function updateContent(arr, item){

                for (let itemArr of arr) {
                    if (itemArr === 'props'){
                        return {
                            ...item,
                            props: {...item.props,
                            [arr[arr.length - 1]]: newValue
                            }
                        }
                    } else if (itemArr === 'content'){
                        return {
                            ...item,
                            content: [...item.content, {...newValue, id: Date.now()}]
                        }
                    } 
                    let elementNumber = itemArr.split(/\W/)
                    .filter(i => i !== '' && i !== 'content').join()
                        
                    return{
                        ...item,
                        content: [...item.content.map(i => {
                            if  (i !== item.content[elementNumber]) {
                                return i
                            }

                            arr.shift()

                            return updateContent(arr, i)
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