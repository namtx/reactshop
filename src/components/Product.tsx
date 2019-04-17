import * as React from "react";
import { IProduct } from "../ProductData";
import Tabs from "./Tabs";
import withLoader from "../hocs/withLoader";

interface IProps {
  product: IProduct;
  inBasket: boolean;
  onAddToBasket: () => void;
}

interface ILikeState {
  likes: number;
  lastLike: Date | null;
}

const initialLikeState: ILikeState = {
  likes: 0,
  lastLike: null
};

enum LikeActionTypes {
  LIKE = "LIKE"
}

interface ILikeAction {
  type: LikeActionTypes.LIKE;
  now: Date;
}

type LikeActions = ILikeAction;

const reducer = (state: ILikeState = initialLikeState, action: LikeActions) => {
  switch (action.type) {
    case LikeActionTypes.LIKE:
      return { ...state, likes: state.likes + 1, lastLike: action.now };
    default:
      return state;
  }
};

const Product: React.SFC<IProps> = props => {
  const { product, inBasket, onAddToBasket } = props;
  const handleAddClick = () => {
    props.onAddToBasket();
  };

  const [{ likes, lastLike }, dispatch]: [
    ILikeState,
    (action: ILikeAction) => void
  ] = React.useReducer(reducer, initialLikeState);

  const handleLikeClick = () => {
    dispatch({ type: LikeActionTypes.LIKE, now: new Date() });
  };

  return (
    <React.Fragment>
      <h1>{product.name}</h1>
      <Tabs>
        <Tabs.Tab
          name="Description"
          initialActive={true}
          heading={() => <b>Description</b>}
        >
          {product.description}
        </Tabs.Tab>
        <Tabs.Tab name="Reviews" heading={() => "Reviews"}>
          <ul className="product-reviews">
            {product.reviews.map(review => (
              <li key={review.reviewer}>
                <i>"{review.comment}"</i> - {review.reviewer}
              </li>
            ))}
          </ul>
        </Tabs.Tab>
      </Tabs>
      <div />
      <p className="product-price">
        {new Intl.NumberFormat("en-US", {
          currency: "USD",
          style: "currency"
        }).format(product.price)}
      </p>
      {!inBasket && <button onClick={handleAddClick}>Add to basket</button>}
      <div className="like-container">
        {likes > 0 && (
          <div>{`I like this x ${likes}, last at ${lastLike}`}</div>
        )}
        <button onClick={handleLikeClick}>
          {likes > 0 ? "Like again" : "Like"}
        </button>
      </div>
    </React.Fragment>
  );
};

export default withLoader(Product);
