import { faStar as filledStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Star = ({ filled }: { filled: boolean }) => {
    return (
      <span>
        <FontAwesomeIcon
          icon={filled ? filledStar : emptyStar}
          data-testid="star"
          aria-hidden="false"
        />
      </span>
    );
  };
  
export default Star;