import styles from './Card.module.css'

/**
 * @description A single card component representing a ticket. It displays the ticket ID, title, priority and tags.
 * @param {object} props - The props passed to the component.
 * @param {object} props.ticket - The ticket object containing the ID, title, priority and tags.
 * @param {string} props.groupBy - The field to group the tickets by. Can be either "status" or "priority". 
 * @returns {ReactElement} A React element representing the card component.
 */
const Card = (props) => {
  const { ticket, groupBy } = props; 

  const priorityLabels = {
    0: "No Priority",
    1: "Low",
    2: "Medium",
    3: "High",
    4: "Urgent",
  };

  const groupToImageMap = {
    "No Priority": "No-priority.svg",
    Low: "Img - Low Priority.svg",
    Medium: "Img - Medium Priority.svg",
    High: "Img - High Priority.svg",
    Urgent: "SVG - Urgent Priority colour.svg",
    Todo: "To-do.svg",
    "In progress": "in-progress.svg",
    Backlog: "Backlog.svg",
    Done: "Done.svg",
    Cancelled: "Cancelled.svg",
  };
  
  return (
    <section key={ticket.id}>
      <div className={styles.content}>
        <p className={styles.title}>{ticket.id}</p>
        <div className={styles.priority}>
          { groupBy !== "status" && <img src={"assets/" + groupToImageMap[ticket.status]} alt="profile" /> }
          <p className={styles.description}>{ticket.title}</p>
        </div>        
        <div className={styles.tags}>
          { groupBy !== "priority" && <img src={"assets/" + groupToImageMap[priorityLabels[ticket.priority]]} alt="profile" /> }
          <p>{ticket.tag.join(', ')}</p>
        </div>
      </div>
      <img className={styles.profile1} src={"assets/user.svg"} alt="profile" />
    </section>
  )
}

export default Card