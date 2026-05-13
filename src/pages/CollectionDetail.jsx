import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function CollectionDetail() {

  const { handle } = useParams();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const SHOP_URL =
    "https://dev-plus-store-140.myshopify.com";

  const STOREFRONT_TOKEN =
    "e920dad7d2ed7d4789ab3038e6c48794";

  useEffect(() => {

    const query = `
    {
      collection(handle: "${handle}") {

        title

        products(first: 52) {

          edges {

            node {

              id
              title
              handle
              featuredImage {
                url
              }

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

        console.log(data);

        const formatted =
          data?.data?.collection?.products?.edges?.map(
            (item) => ({

              id: item.node.id,

              title: item.node.title,
             handle: item.node.handle,
              image:
                item.node.featuredImage?.url ||
                "https://via.placeholder.com/300"

            })
          ) || [];

        setProducts(formatted);

        setLoading(false);

      })

      .catch((error) => {

        console.error(error);

        setLoading(false);

      });

  }, [handle]);

  return (

    <div>

      <h1>
        Collection:
        {" "}
        {handle}
      </h1>

      {loading && <p>Loading...</p>}

      <div className="collections_grid">

        {products.map((product) => (
            <Link to={`/product/${product.handle}`}>
                <div
                className="collection_card"
                key={product.id}
                >

                <img
                    src={product.image}
                    alt={product.title}
                />

                <h2>{product.title}</h2>

                </div>
            </Link>
        ))}

      </div>

    </div>
  );
}

export default CollectionDetail;