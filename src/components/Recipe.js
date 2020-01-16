import React from "react";
import Markdown from "react-markdown";
import { Image } from "react-datocms"
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "urql";

const recipeQuery = gql`
  query singleRecipe($slug: String!) {
    recipe: recipe(filter: { slug: { eq: $slug } }) {
      id
      slug
      title
      author {
        name
      }
      abstract
      ingredients
      coverImage {
        responsiveImage(imgixParams: { fit: crop, w: 1000, h: 1000 }) {
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
      content {
        ... on TextImageBlockRecord {
          id
          __typename
          image {
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
          text
        }
        ... on TextBlockRecord {
          id
          __typename
          text
        }
      }
    }
  }
`;

const Recipe = props => {
  const [res] = useQuery({
    query: recipeQuery,
    variables: { slug: props.match.params.slug }
  });

  if (res.fetching) {
    return "Loading...";
  } else if (res.error) {
    return "Oh no!";
  }

  const { recipe } = res.data;

  return (
    <section>
      {recipe && (
        <article>
          <h1 className="Recipe-title">{recipe.title}</h1>
          <strong>
            By <Link to={"/about"}>{recipe.author.name}</Link>
          </strong>
          <Markdown
            source={recipe.abstract}
            escapeHtml={false}
            className="Recipe-abstract"
          />
          <Image
            className="Recipe-cover"
            data={recipe.coverImage.responsiveImage}
          />
          <div className="Recipe-box">
            <h5 className="Recipe-box-title">Ingredients</h5>
            <Markdown source={recipe.ingredients} escapeHtml={false} />
          </div>
          {recipe.content.map((block, i) => {
            if (block.__typename === "TextImageBlockRecord") {
              return (
                <div key={block.id} className="Recipe-flag">
                  <div className="Recipe-flag-number">{i + 1}</div>
                  <Image
                    className="Recipe-flag-image"
                    data={block.image.responsiveImage}
                  />
                  <Markdown source={block.text} className="Recipe-flag-text" />
                </div>
              );
            } else if (block.__typename === "TextBlockRecord") {
              return (
                <div key={block.id} className="Recipe-flag">
                  <div className="Recipe-flag-number">{i + 1}</div>
                  <Markdown source={block.text} className="Recipe-flag-text" />
                </div>
              );
            }
            return <div key={block.id} />;
          })}
        </article>
      )}
    </section>
  );
};

export default Recipe;
