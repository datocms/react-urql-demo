import React from "react";
import gql from "graphql-tag";
import { useQuery } from "urql";
import { Image } from "react-datocms"

const authorsQuery = gql`
  query authors {
    authors: allAuthors {
      id
      description
      name
      avatar {
        responsiveImage(imgixParams: { fit: crop, w: 300, h: 300 }) {
          aspectRatio
          width
          sizes
          srcSet
          src
          webpSrcSet
          alt
          title
          base64
        }
      }
    }
  }
`;

const Authors = props => {
  const [res] = useQuery({
    query: authorsQuery
  });

  if (res.fetching) {
    return "Loading...";
  } else if (res.error) {
    return "Oh no!";
  }

  const { authors } = res.data;

  return (
    <section>
      <div>
        {authors.map(author => (
          <div className="About-author" key={author.id}>
            <div className="About-infoHeader">
              <Image
                className="About-img"
                data={author.avatar.responsiveImage}
              />
              <h2>{author.name}</h2>
            </div>
            <p>{author.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Authors;
