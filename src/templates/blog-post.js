import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import { BlogPostJsonLd, GatsbySeo } from "gatsby-plugin-next-seo"
import AdsBot from "../components/ads-bot"

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post, allMarkdownRemark: p },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title
  const siteDes = site.siteMetadata?.description
  const siteUrl = site.siteMetadata?.siteUrl
  const author = site.siteMetadata?.author
  const imgLogo = site.siteMetadata?.imgLogo
  const posts = p.nodes
  const url = siteUrl + post.fields.slug

  return (
    <Layout location={location} title={siteTitle} des={siteDes}>
      <GatsbySeo
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        canonical={url}
        openGraph={{
          url: url,
          title: post.frontmatter.title,
          description: post.frontmatter.description,
          images: [
            {
              url: post.frontmatter.img.childImageSharp.gatsbyImageData.images
                .fallback.src,
              width: 500,
              height: 500,
              alt: "WapPur",
            },
          ],
          site_name: author,
        }}
      />

      <BlogPostJsonLd
        url={url}
        title={post.frontmatter.title}
        keywords={post.frontmatter.title}
        images={
          post.frontmatter.img.childImageSharp.gatsbyImageData.images.fallback
            .src
        }
        datePublished={post.frontmatter.date}
        dateModified={post.frontmatter.date}
        authorName={author}
        publisherName={author}
        publisherLogo={imgLogo}
        description={post.frontmatter.description}
      />
      <hr className="mb-2 h-px bg-gray-200 border-0 dark:bg-gray-700" />
      <article
        className="w-full p-3"
        itemScope
        itemType="http://schema.org/Article"
      >
        <div className="text-center">
          <h1 className="text-2xl text-gray-700 font-bold" itemProp="headline">
            {post.frontmatter.title}
          </h1>
          <span className="mt-3 text-sm text-gray-700">
            <time>{post.frontmatter.date}</time>
          </span>
        </div>
        <hr className="my-2 -mx-3 h-px bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="p-2 mb-6 rounded-xl">
          <div className="text-xl font-bold text-gray-600">Daftar Isi</div>
          <div
            dangerouslySetInnerHTML={{ __html: post.tableOfContents ?? "" }}
          />
        </div>

        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
      </article>
      <AdsBot />
      <hr />
      <div className="flex flex-row p-3 my-2 rounded-xl">
        {previous && (
          <div className="flex-1">
            <div className="inline-block text-base font-bold">
              ←{" "}
              <Link to={previous.fields.slug} rel="prev">
                {previous.frontmatter.title}
              </Link>
            </div>
          </div>
        )}
        {next && (
          <div className="flex-1">
            <div className="inline-block text-base font-bold float-right">
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title}
              </Link>{" "}
              →
            </div>
          </div>
        )}
      </div>
      <hr />

      {posts.map(post => {
        const { title, img } = post.frontmatter
        const image = img.childImageSharp.gatsbyImageData
        return (
          <section
            className="bg-white"
            key={post.fields.slug}
            itemScope
            itemType="http://schema.org/Article"
          >
            <div className="mx-auto">
              <div className="flex shadow-md hover:shadow-lg border border-gray-100 p-3 rounded-xl mt-3 mx-2">
                <div className="flex w-3/12 h-24">
                  <GatsbyImage
                    className="object-cover w-full rounded-lg"
                    image={image}
                    alt={title}
                  />
                </div>
                <div className="flex w-9/12 ">
                  <div className="mx-5 my-auto">
                    <Link to={post.fields.slug} itemProp="url">
                      <span
                        className="text-lg font-semibold  text-gray-800"
                        itemProp="headline"
                      >
                        {title}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        description
        siteUrl
        author
        imgLogo
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 5) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          img {
            childImageSharp {
              gatsbyImageData(width: 600, placeholder: BLURRED, formats: WEBP)
            }
          }
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      tableOfContents
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        description
        img {
          childImageSharp {
            gatsbyImageData(width: 600, placeholder: BLURRED, formats: WEBP)
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
