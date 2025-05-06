import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Star = ({ filled }: { filled: boolean }) => {
  return (
    <span
      data-testid="star"
      aria-label={filled ? "filled star" : "empty star"}
    >
      <FontAwesomeIcon
        icon={filled ? filledStar : emptyStar}
        role="img"
        data-testid={filled ? "filled-star" : "empty-star"}
      />
    </span>
  );
};

export default Star;
