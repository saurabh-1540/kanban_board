import './Card.css'
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
      <div className='content'>
        <p className="title">{ticket.id}</p>
        <div className="priority">
          { groupBy !== "status" && <img src={"assets/" + groupToImageMap[ticket.status]} alt="profile" /> }
          <p className="description">{ticket.title}</p>
        </div>        
        <div className="tags">
          { groupBy !== "priority" && <img src={"assets/" + groupToImageMap[priorityLabels[ticket.priority]]} alt="profile" /> }
          <p>{ticket.tag.join(', ')}</p>
        </div>
      </div>
      <img className="profile1" src={"assets/user.svg"} alt="profile" />
    </section>
  )
}

export default Card