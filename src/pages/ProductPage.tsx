import * as React from "react";
import { RouteComponentProps, Prompt } from "react-router-dom";
import { IProduct, getProduct } from "../ProductData";
import ProductWithLoader from "../components/Product";

type Props = RouteComponentProps<{ id: string }>;

interface IState {
  product?: IProduct;
  added: boolean;
  loading: boolean;
}

class ProductPage extends React.Component<Props, IState> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      added: false,
      loading: true
    };
  }

  public async componentDidMount() {
    if (this.props.match.params.id) {
      const id: number = parseInt(this.props.match.params.id, 10);
      const product = await getProduct(id);
      if (product !== null) {
        this.setState({
          product: product,
          loading: false
        });
      }
    }
  }

  public render() {
    const product = this.state.product;
    if (!product) {
      return null;
    }
    return (
      <div className="page-container">
        <Prompt when={!this.state.added} message={this.navAwayMessage} />
        {product || this.state.loading ? (
          <ProductWithLoader
            loading={this.state.loading}
            product={product}
            onAddToBasket={this.handleAddClick}
            inBasket={this.state.added}
          />
        ) : (
          <p>Product not found!</p>
        )}
      </div>
    );
  }

  private handleAddClick = () => {
    this.setState({ added: true });
  };

  private navAwayMessage = () =>
    "Are you sure you leave without buying this product?";
}

export default ProductPage;
