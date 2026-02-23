import React, { useState, useEffect } from "react";
import "./CustomCollection.css";


function CustomCollection() {
      const [collections, setCollection] = useState([]);
      const [loading, setLoading] = useState(true);
    
        useEffect(() => {
          fetch("https://picsum.photos/v2/list?page=1&limit=3")
            .then(res => res.json())
            .then(data => {
              const formatted = data.map(item => ({
                id: item.id,
                image: item.download_url,
                title: item.title,
                subtitle: "Shop Now"
              }));
              setCollection(formatted);
              setLoading(false);
            })
            .catch(error => {
              console.error("Error fetching banners:", error);
              setLoading(false);
            });
        }, []);

  return (
    <div className="collectin_List">
        <ul class="col_main">
        {collections.map((col) => (
            <li  key={col.id}>
            <img src={col.image} alt={col.title} />
              <h2>{col.title}</h2>
              </li>
        ))}
        </ul>
    </div>
  );
}

export default CustomCollection;

