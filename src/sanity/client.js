import { createClient }
  from "@sanity/client";

import {
  createImageUrlBuilder
} from "@sanity/image-url";

export const sanity =
  createClient({

    projectId: "m0pcq58o",

    dataset: "production",

    apiVersion: "2024-01-01",

    useCdn: false

  });

// IMAGE BUILDER
const builder =
  createImageUrlBuilder(sanity);

// IMAGE URL FUNCTION
export function urlFor(source) {

  return builder.image(source);

}