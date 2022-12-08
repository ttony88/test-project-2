import { connect } from 'react-redux'
import { getContent } from '../../selectors' 
import styles from './Content.module.scss'


const Content = (props) => {
    const {content, renderItemByType} = props

    return(
        <div className={styles.contentWrapper}>
            <div className={styles.content}>
                {content.map(i => {
                    return renderItemByType(i.type, i)
                })}
            </div>
        </div>
    )
}

const createLabel = (item) => {
    return <span style={{display: item.props.visible ? 'block' : 'none'}}>
        {item.props.caption}
    </span>
}

const createButton = (item) => {
    return <button style={{width: item.props.width, height: item.props.height}}>
        push
    </button>
}

const createPanel = (item) => {
    return <div className={styles.panel} style={{width: item.props.width, height: item.props.height}}>
        {item.content && item.content.map(i => {
            return renderItemByType(i.type, i)
        })}
    </div>
}

const renderItemByType = (itemType, item) => {
    switch (itemType) {
        case 'label':
            return createLabel(item)
        
        case 'button':
            return createButton(item)

        case 'panel':
            return createPanel(item)
    
        default:
            return null
    }
}

const mapStateToProps = (state) => {
    return {
        content: getContent(state),
        renderItemByType: renderItemByType 
    }
}

const ContentContainer = connect(mapStateToProps)(Content)
export default ContentContainer