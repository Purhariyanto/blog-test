import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import { GatsbySeo } from "gatsby-plugin-next-seo"

const BlogIndex = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title
  const siteDes = data.site.siteMetadata?.description
  const siteUrl = data.site.siteMetadata?.siteUrl
  const author = data.site.siteMetadata?.author
  const imgLogo = data.site.siteMetadata?.imgLogo
  const { tag } = pageContext
  const tagUrl = (siteUrl + "tags/" + tag + "/").toLowerCase()
  const tags = tag + " | " + siteTitle
  const des =
    "Selamat datang di halaman kategori " +
    tag +
    " yang membahas seputar tutorial " +
    tag +
    ", dengan menyajikan tutorial yang menarik serta ada gambarnya."
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle} des={siteDes}>
      <GatsbySeo
        title={tags}
        description={des}
        canonical={tagUrl}
        openGraph={{
          url: { tagUrl },
          title: { tags },
          description: { des },
          images: [
            {
              url: imgLogo,
              width: 500,
              height: 500,
              alt: "WapPur",
            },
          ],
          site_name: { author },
        }}
      />
      {posts.map(post => {
        const { title, date, img } = post.frontmatter
        const image = img.childImageSharp.gatsbyImageData
        return (
          <section
            className="bg-white"
            key={post.fields.slug}
            itemScope
            itemType="http://schema.org/Article"
          >
            <div className="mx-auto">
              <div className="grid grid-cols-1 sm:grid-rows-1">
                <div className="sm:flex shadow-md hover:shadow-lg border border-gray-100 p-3 rounded-xl mt-3 mx-4 sm:mx-2">
                  <div className="sm:w-96 sm:my-auto">
                    <GatsbyImage
                      className="object-cover w-full rounded-lg"
                      image={image}
                      alt={title}
                    />
                  </div>

                  <div className="flex flex-col justify-between sm:ml-6">
                    <h2 className="mt-4 sm:mt-0">
                      <Link to={post.fields.slug} itemProp="url">
                        <span
                          className="text-xl font-semibold  text-gray-800 "
                          itemProp="headline"
                        >
                          {title}
                        </span>
                      </Link>
                    </h2>
                    <span className="text-sm text-gray-500 pb-3 text-justify">
                      {post.excerpt}
                    </span>

                    <span className="text-sm text-gray-500">
                      {" "}
                      <time>{date}</time>
                    </span>
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

export default BlogIndex

export const pageQuery = graphql`
  query ($tag: String) {
    site {
      siteMetadata {
        title
        description
        siteUrl
        imgLogo
      }
    }
    allMarkdownRemark(
      limit: 10
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD MMMM YYYY")
          title
          description
          img {
            childImageSharp {
              gatsbyImageData(width: 600, placeholder: BLURRED, formats: WEBP)
            }
          }
          tags
        }
      }
    }
  }
`
