import styles from './App.module.scss'
import ContentForm from '../ContentForm';
import Content from '../Content';
import { changeValueItem } from '../../redux/contentReducer'
import { connect } from 'react-redux';

const App = (props) => {

  const{changeValueItem} = props

  const submit = (valueForm) => {
    changeValueItem(valueForm.path, valueForm.newValue)
  }
  return (
    <div className={styles.wrapper}>
      <ContentForm onSubmit={submit} />
      <Content />
    </div>
  )
}

const AppContainer = connect(null, {changeValueItem})(App)

export default AppContainer;
