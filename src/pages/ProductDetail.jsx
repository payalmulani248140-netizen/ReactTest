import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./custom.css";

function ProductDetail() {

  const { handle } = useParams();

  // =========================
  // STATES
  // =========================

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [selectedVariant, setSelectedVariant] =
    useState(null);

  // =========================
  // SHOPIFY
  // =========================

  const SHOP_URL =
    "https://dev-plus-store-140.myshopify.com";

  const STOREFRONT_TOKEN =
    "e920dad7d2ed7d4789ab3038e6c48794";

  // =========================
  // FETCH PRODUCT
  // =========================

  useEffect(() => {

    const query = `
    {
      product(handle: "${handle}") {

        id

        title

        handle

        description

        featuredImage {
          url
        }

        priceRange {

          minVariantPrice {

            amount

            currencyCode

          }

        }

        variants(first: 10) {

          edges {

            node {

              id

              title

            }

          }

        }

      }
    }
    `;

    fetch(`${SHOP_URL}/api/2024-01/graphql.json`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json",

        "X-Shopify-Storefront-Access-Token":
          STOREFRONT_TOKEN
      },

      body: JSON.stringify({ query })

    })
      .then((res) => res.json())

      .then((data) => {

        console.log("PRODUCT DATA:", data);

        const productData =
          data?.data?.product;

        setProduct(productData);

        // AUTO SELECT FIRST VARIANT
        const firstVariant =
          productData?.variants?.edges[0]?.node;

        setSelectedVariant(firstVariant);

        setLoading(false);

      })

      .catch((error) => {

        console.error(error);

        setLoading(false);

      });

  }, [handle]);

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = async () => {

    if (!selectedVariant) return;

    const mutation = `
    mutation {

      cartCreate(

        input: {

          lines: [

            {

              quantity: 1,

              merchandiseId:
                "${selectedVariant.id}"

            }

          ]

        }

      ) {

        cart {

          id

          checkoutUrl

        }

      }

    }
    `;

    try {

      const response = await fetch(
        `${SHOP_URL}/api/2024-01/graphql.json`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            "X-Shopify-Storefront-Access-Token":
              STOREFRONT_TOKEN
          },

          body: JSON.stringify({
            query: mutation
          })
        }
      );

      const data = await response.json();

      console.log("CART DATA:", data);

      const checkoutUrl =
        data?.data?.cartCreate?.cart
          ?.checkoutUrl;

      // OPEN CHECKOUT
      window.open(checkoutUrl, "_blank");

    } catch (error) {

      console.error(error);

    }

  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return <p>Loading...</p>;
  }

  // =========================
  // PRODUCT NOT FOUND
  // =========================

  if (!product) {
    return <p>Product not found</p>;
  }

  // =========================
  // JSX
  // =========================

  return (

    <div className="product_page">

      {/* IMAGE */}

      <div className="product_image">

        <img
          src={product.featuredImage?.url}
          alt={product.title}
        />

      </div>

      {/* CONTENT */}

      <div className="product_content">

        <h1>{product.title}</h1>

        {/* PRICE */}

        <p className="price">

          {
            product.priceRange
              .minVariantPrice.amount
          }

          {" "}

          {
            product.priceRange
              .minVariantPrice.currencyCode
          }

        </p>

        {/* DESCRIPTION */}

        <p>{product.description}</p>

        {/* VARIANTS */}

        <div className="variants">

          <h3>Variants</h3>

          {product.variants.edges.map((variant) => (

            <button
              key={variant.node.id}

              onClick={() =>
                setSelectedVariant(
                  variant.node
                )
              }
            >

              {variant.node.title}

            </button>

          ))}

        </div>

        {/* SELECTED VARIANT */}

        {selectedVariant && (

          <p>

            Selected:
            {" "}
            {selectedVariant.title}

          </p>

        )}

        {/* ADD TO CART */}

        <button
          className="add_to_cart"
          onClick={addToCart}
        >

          Add To Cart

        </button>

      </div>

    </div>
  );
}

export default ProductDetail;