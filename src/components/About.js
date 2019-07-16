import React from "react";
import gql from "graphql-tag";
import { useQuery } from "urql";

const authorsQuery = gql`
  query authors {
    authors: allAuthors {
      id
      description
      name
      avatar {
        url
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
              <img
                className="About-img"
                alt={author.name}
                src={author.avatar.url}
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
