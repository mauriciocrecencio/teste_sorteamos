import Head from 'next/head'

const Usability = (props) => {
  const { title, description, image, robots, url, siteName } = props

  return (
    <Head>
      {title && (
        <>
          <title>{title}</title>
          <meta name="og:title" content={title} />
          <meta name="twitter:title" content={title} />
          <meta property="og:site_name" content={title} />
        </>
      )}

      {description && (
        <>
          <meta property="og:description" content={description} />
          <meta name="description" content={description} />
          <meta name="twitter:description" content={description} />
        </>
      )}

      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:image:width" content="600" />
          <meta property="og:image:height" content="600" />
        </>
      )}

      {url && <meta property="og:url" content="url" />}

      {robots && <meta name="robots" content={robots} />}

      {siteName && <meta name="og:site_name" content={siteName} />}
    </Head>
  )
}

export default Usability
