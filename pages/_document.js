// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* ✅ Favicons */}
                    <link rel="icon" href="/favicon.ico" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />

                    {/* ✅ Theme color (representing your gradient) */}
                    <meta name="theme-color" content="#3D1939" />

                    {/* ✅ Preconnect to external image domains */}
                    <link rel="preconnect" href="https://gfx.nrk.no" crossOrigin="" />
                    <link rel="preconnect" href="https://upload.wikimedia.org" crossOrigin="" />
                    <link rel="dns-prefetch" href="https://gfx.nrk.no" />
                    <link rel="dns-prefetch" href="https://upload.wikimedia.org" />

                    {/* ✅ SEO & Open Graph */}
                    <meta name="title" content="Hi-Res by Jasper Bates" />
                    <meta
                        name="description"
                        content="High-Resolution, High-Resilience, High-Resolve."
                    />

                    <meta property="og:title" content="Hi-Res by Jasper Bates" />
                    <meta
                        property="og:description"
                        content="High-Resolution, High-Resilience, High-Resolve."
                    />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://hi-res.vercel.app" />
                    <meta
                        property="og:image"
                        content="https://hi-res.vercel.app/og-image.jpg"
                    />

                    {/* ✅ Twitter card */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:title" content="Hi-Res by Jasper Bates" />
                    <meta
                        name="twitter:image"
                        content="https://hi-res.vercel.app/og-image.jpg"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
