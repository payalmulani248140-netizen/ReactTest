import React, { useState, useEffect } from "react";
import "./CustomCollection.css";

function CustomCollection() {

  const [collections, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  const SHOP_URL = "https://dev-plus-store-140.myshopify.com";
  const STOREFRONT_TOKEN = "e920dad7d2ed7d4789ab3038e6c48794";

  useEffect(() => {

    const query = `
    {
      products(first: 6) {
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
    `;

    fetch(`${SHOP_URL}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN
      },
      body: JSON.stringify({ query })
    })
      .then((res) => res.json())
      .then((data) => {

        console.log("SHOPIFY DATA:", data);

        const formatted =
          data?.data?.products?.edges?.map((item) => ({
            id: item.node.id,
            image: item.node.featuredImage?.url,
            title: item.node.title
          })) || [];

        console.log("FORMATTED:", formatted);

        setCollection(formatted);

        setLoading(false);

      })
      .catch((error) => {

        console.error(error);

        setLoading(false);

      });

  }, []);

  console.log('collections----',collections);

  return (

    <div className="collectin_List">

      {loading && <p>Loading...</p>}

      <ul className="col_main">

        {collections.map((col) => (
          <li key={col.id}>

            <img src={col.image} alt={col.title} />

            <h2>{col.title}</h2>

          </li>
        ))}

      </ul>

    </div>
  );
}

export default CustomCollection;