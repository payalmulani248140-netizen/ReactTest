import React, {
  useEffect,
  useState
} from "react";

import {
  sanity,
  urlFor
} from "../sanity/client";

import "./HeroSection.css";

function HeroSection() {

  const [hero, setHero] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // FETCH HERO
  useEffect(() => {

    const query = `
      *[_type == "heroSection"][0]
    `;

    sanity.fetch(query)

      .then((data) => {

        console.log(
          "HERO:",
          data
        );

        setHero(data);

        setLoading(false);

      })

      .catch((err) => {

        console.error(err);

        setLoading(false);

      });

  }, []);

  if (loading) {

    return (
      <h2>
        Loading Hero...
      </h2>
    );

  }

  if (!hero) {

    return (
      <h2>
        No Hero Found
      </h2>
    );

  }

  return (

    <section className="hero">

      {/* IMAGE */}
      {hero.image && (

        <img
          className="hero_image"

          src={
            urlFor(
              hero.image
            ).url()
          }

          alt={hero.title}
        />

      )}

      {/* CONTENT */}
      <div className="hero_content">

        <h1>
          {hero.title}
        </h1>

        <p>
          {hero.subtitle}
        </p>

        <a href={hero.buttonLink}>

          <button>

            {
              hero.buttonText
            }

          </button>

        </a>

      </div>

    </section>
  );
}

export default HeroSection;