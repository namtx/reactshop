import * as React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import "url-search-params-polyfill";
import { IProduct, products } from "../ProductData";
import { connect } from "react-redux";
import { IApplicationState } from "../Store";
import { getProducts } from "../ProductsActions";

interface IState {
  products: IProduct[];
  search: string;
}

interface IProps extends RouteComponentProps {
  getProducts: typeof getProducts;
  loading: boolean;
  products: IProduct[];
}
class ProductsPage extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      products: [],
      search: ""
    };
  }

  public componentDidMount() {
    this.props.getProducts();
  }

  public static getDerivedStateFromProps(props: IProps, state: IState) {
    const searchParams = new URLSearchParams(props.location.search);
    const search = searchParams.get("search") || "";
    return {
      products: state.products,
      search
    };
  }

  public render() {
    const searchParams = new URLSearchParams(this.props.location.search);
    const search = searchParams.get("search") || "";
    return (
      <div className="page-container">
        <p>
          Welcome to React Shop where you can get all your tools for ReactJS!
        </p>
        <ul className="product-list">
          {this.props.products.map(product => {
            if (
              !search ||
              (search &&
                product.name.toLowerCase().indexOf(search.toLowerCase())) > -1
            ) {
              return (
                <li key={product.id} className="product-list-item">
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (store: IApplicationState) => {
  return {
    loading: store.products.productsLoading,
    products: store.products.products
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProducts: () => dispatch(getProducts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage);
