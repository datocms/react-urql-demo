import React, { useEffect, useState } from "react";
import client from "../client.js";

const Authors = () => {
  const [authors, setAuthors] = useState();
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const result = await client.request(query);
        setAuthors(result.authors);
        setIsFetching(false);
      } catch (error) {
        console.error(JSON.stringify(error, undefined, 2));
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      {isFetching ? (
        <p className="Home-li-title">...Loading</p>
      ) : (
        <div>
          {authors &&
            authors.map(author => (
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
      )}
    </section>
  );
};

const query = `
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

export default Authors;
