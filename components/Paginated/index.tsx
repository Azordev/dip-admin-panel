import styles from './Paginated.module.scss'
function Paginated() {
  return (
    <div className={styles['paginated-container']}>
      <div className={styles['pages-number']}>
        <label htmlFor=""> 1 of 2 </label>
      </div>

      <div>
        <ul>
          <div className={styles.button}>
            <span>Antes</span>
          </div>
          <div className={styles['pages-list']}>
            <li key={1}>{1}</li>
            <li key={1}>{2}</li>
            <li key={1}>{3}</li>
            <li key={1}>{4}</li>
            <li key={1}>{5}</li>
          </div>
          <div className={styles.button}>
            <span>Siguiente</span>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Paginated
