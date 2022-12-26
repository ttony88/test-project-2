import styles from './App.module.scss'
import ContentForm from '../ContentForm';
import Content from '../Content';
import { changeContent } from '../../redux/contentReducer'
import { connect } from 'react-redux';

const App = (props) => {

  const{changeContent} = props

  const submit = (valueForm) => {
    changeContent(valueForm.path, valueForm.newValue)
  }
  return (
    <div className={styles.wrapper}>
      <ContentForm onSubmit={submit} />
      <Content />
    </div>
  )
}

const AppContainer = connect(null, {changeContent})(App)

export default AppContainer;
