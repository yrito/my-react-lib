import { useState, FC } from "react";
import "./SmartRating.css";
import { SmartRatingProps } from "./SmartRating.types";
import HelperCalc from "../../helpers/helper_calc";

const SmartRating: FC<SmartRatingProps> = (props) => {
  const countStars = new HelperCalc().randomNumber();
  const stars = Array.from({ length: countStars }, (_, i) => i + 1);
  const [rating, setRating] = useState(0);
  return (
    <div className={`star-rating rating-${props.theme}`}>
      <h1>{props.title}</h1>
      {stars.map((star, index) => {
        const starCss = star <= rating ? "starActive" : "starInactive";
        return (
          <button
            disabled={props.disabled}
            data-testid={`${props.testIdPrefix}-${index}`}
            key={star}
            className={`${starCss}`}
            onClick={() => setRating(star)}
          >
            <span className="star">★</span>
          </button>
        );
      })}
    </div>
  );
};

export default SmartRating;