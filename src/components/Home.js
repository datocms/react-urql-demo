import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "urql";
import qs from "qs";

const RECIPES_PER_PAGE = 2;
const homeQuery = gql`
  query recipes($first: IntType!, $skip: IntType!) {
    meta: _allRecipesMeta {
      count
    }
    recipes: allRecipes(orderBy: position_ASC, first: $first, skip: $skip) {
      id
      title
      slug
      abstract
      coverImage {
        url
      }
    }
  }
`;

const Home = props => {
  const [skip, setSkip] = useState(0);

  useEffect(
    () => {
      const skip =
        parseInt(
          qs.parse(props.location.search, { ignoreQueryPrefix: true }).skip,
          10
        ) || 0;
      setSkip(skip);
    },
    [props.location.search]
  );

  const [res] = useQuery({
    query: homeQuery,
    variables: {
      first: RECIPES_PER_PAGE,
      skip
    }
  });

  if (res.fetching) {
    return "Loading...";
  } else if (res.error) {
    return "Oh no!";
  }

  const { recipes } = res.data;

  return (
    <section>
      <ul className="Home-ul">
        {recipes.map(recipe => (
          <li className="Home-li" key={`recipe-${recipe.id}`}>
            <Link to={`/recipes/${recipe.slug}`} className="Home-link">
              <img
                alt={recipe.title}
                className="Home-img"
                src={recipe.coverImage.url}
              />
              <div>
                <h3 className="Home-li-title">{recipe.title}</h3>
                <p>
                  {recipe.abstract
                    .split(" ")
                    .slice(0, 10)
                    .join(" ")}
                  ...
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {res.data.meta.count > RECIPES_PER_PAGE && (
        <Link className="Home-button" to={`?skip=${skip + RECIPES_PER_PAGE}`}>
          Show More Recipes
        </Link>
      )}
    </section>
  );
};

export default Home;
