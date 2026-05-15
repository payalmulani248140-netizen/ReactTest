import { useEffect, useState }
  from "react";

import { sanity }
  from "../sanity/client";

export default function usePage(slug) {

  const [page, setPage] =
    useState(null);

  useEffect(() => {

    const query = `
      *[_type == "page" &&
        slug.current == $slug][0]{

        title,

        sections[]{

          ...,

          image{
            asset->{
              url
            }
          },

          backgroundImage{
            asset->{
              url
            }
          }

        }

      }
    `;

    sanity
      .fetch(query, { slug })

      .then((data) => {

        console.log(
          "SANITY PAGE:",
          data
        );

        setPage(data);

      })

      .catch((err) => {

        console.error(err);

      });

  }, [slug]);

  return page;
}