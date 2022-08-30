import styles from './Paginated.module.scss'
function Paginated() {
  return (
    <div className={styles['paginated-container']}>
      <div>
        <label htmlFor=""> 1 of 2 </label>
      </div>

      <div>
        <ul className="flex">
          <li className={styles.button} /* onClick={() => backward(currentPage)} */>Antes</li>
          <li key={1}> {1}</li>
          <li key={1}>{2}</li>
          <li key={1}>{3}</li>
          <li className={styles.button}>Siguiente</li>
        </ul>
        {/*  )} */}
      </div>
    </div>
  )
}

export default Paginated
