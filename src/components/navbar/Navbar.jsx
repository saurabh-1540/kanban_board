import { useState } from 'react'
import styles from './Navbar.module.css'

const Navbar = (props) => {
    const {groupBy, setGroupBy, sortBy, setSortBy} = props
  const [open, setOpen] = useState(false)
  return (
    <>
      <header className={styles.header}>
        <div className={styles.dropdown} onClick={() => setOpen(!open)}>
          <img className="profile" src={"assets/Display.svg"} alt="profile" />
          <p>Display</p>
          <img className="down" src={"assets/down.svg"} alt="profile" />
        </div>
      </header>
      {open && <div className={styles.select} >
        <div className={styles.grouping}>
          Grouping
          <select value={groupBy} onChange={e => setGroupBy(e.target.value)}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
        </div>
        <div className={styles.grouping}>
          Ordering
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
        </div>
      </div>}

    </>
  )
}

export default Navbar