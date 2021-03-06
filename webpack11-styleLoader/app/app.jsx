
import styles from './index.scss';
import React from 'react';


export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>It Works!</h1>
        <p>This React project just works including <span className={styles.blueBg}>module</span> local styles.</p>
        <p>Global bootstrap css import works too as you can see on the following button.</p>
        <p>
          <a className={styles.buttonOk}></a>
          <a className="pure-button">Enjoy!</a>
        </p>
      </div>
    )
  }
}