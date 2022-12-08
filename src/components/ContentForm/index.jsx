import { Field, reduxForm } from 'redux-form'
import styles from './ContentForm.module.scss'

const ContentForm = (props) => {
    const {handleSubmit} = props
    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.path}>
                <div>Путь</div>
                <Field component='input' name='path' type='text' />
            </div>
            <div className={styles.newValue}>
                <div>Новое значение</div>
                <Field component='input' name='newValue' type='text' />
            </div>
            
            <button>Применить</button>
        </form>
    )
}
const ContentReduxForm = reduxForm({form: 'content'})(ContentForm)
export default ContentReduxForm 