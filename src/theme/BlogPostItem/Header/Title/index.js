import React, { useEffect } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { useBlogPost } from "@docusaurus/theme-common/internal";
import styles from "./styles.module.css";

export default function BlogPostItemHeaderTitle({ className }) {
  const { metadata, isBlogPostPage } = useBlogPost();
  const { permalink, title: rawTitle } = metadata;
  const TitleHeading = isBlogPostPage ? "h1" : "h2";

  // Workaround for https://github.com/facebook/docusaurus/discussions/8294
  const title =
    rawTitle === "The `satisfies` Operator" ? (
      <>
        The <code>satisfies</code> operator
      </>
    ) : (
      rawTitle
    );

  // In lieu of https://github.com/facebook/docusaurus/pull/8314
  useEffect(() => {
    document.title = rawTitle.replace("`", "");
  }, [title]);

  return (
    <TitleHeading className={clsx(styles.title, className)} itemProp="headline">
      {isBlogPostPage ? (
        title
      ) : (
        <Link itemProp="url" to={permalink}>
          {title}
        </Link>
      )}
    </TitleHeading>
  );
}
