import { useState, useRef } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { ListGroup } from "react-bootstrap";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import labs from "../../data/labs";

const displayLab = (item) => {
	return (<ul>
		{
			Object.keys(item).map(el => {
				if (typeof item[el] != 'string')
					return displayLab(item[el])
				return <li>{item[el]}</li>
			})
		}
	</ul>)
}

const popover = (content) => {
  return (
     <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
          {displayLab(content)}
      </Popover.Body>
    </Popover>
  )
}

function Sidebar({ show, handleClose }) {
  const [showO, setShowO] = useState(false);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} backdrop="static" className="sidebar__container">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Меню</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            {labs.map((lab) => (
              <>
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popover(lab.content)}
                >
                  <ListGroup.Item
                    action
                    key={lab.id}
                    onClick={() => setShowO(!showO)}
                  >
                    {lab.title}
                  </ListGroup.Item>
                </OverlayTrigger>
              </>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
