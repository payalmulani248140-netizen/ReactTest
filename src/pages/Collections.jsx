import React, { useEffect, useState } from "react";
import "./custom.css";
import { Link } from "react-router-dom";

function Collections() {

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const SHOP_URL = "https://dev-plus-store-140.myshopify.com";
  const STOREFRONT_TOKEN = "e920dad7d2ed7d4789ab3038e6c48794";

  useEffect(() => {

    const query = `
    {
      collections(first: 6) {
        edges {
          node {
            id
            title
            handle

            image {
              url
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

        console.log('data-----'+data);

        const formatted =
          data?.data?.collections?.edges?.map((item) => ({
            id: item.node.id,
            title: item.node.title,
            handle: item.node.handle,

            image:
              item.node.image?.url ||
              "https://via.placeholder.com/400"
          })) || [];

        setCollections(formatted);

        setLoading(false);

      })
      .catch((error) => {

        console.error(error);

        setLoading(false);

      });

  }, []);

  return (

    <div className="collections_page">

      <h1>Collections</h1>

      {loading && <p>Loading...</p>}

      <div className="collections_grid">

        {collections.map((collection) => (
<Link to={`/collection/${collection.handle}`}>

          <div
            className="collection_card"
            key={collection.id}
          >

            <img
              src={collection.image}
              alt={collection.title}
            />

            <h2>{collection.title}</h2>

          </div>
</Link>
        ))}

      </div>

    </div>
  );
}

export default Collections;