import { getNextStaticProps } from '@faustjs/next';

import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import React from 'react';
import { CTA, Footer, Header, Hero, Posts } from 'components';
import styles from 'scss/pages/home.module.scss';
import { client } from 'client';

export default function Page() {
  const { usePosts, useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const posts = usePosts({
    first: 8,
    where: {categoryNotIn: ["newsletter",]},
  });

  return (
    <>
      <Header
        title={generalSettings.title}
        description={generalSettings.description}
      />

      <Head>
        <title>
          {generalSettings.title} - {generalSettings.description}
        </title>
      </Head>

      <main className="content">
        <Hero
          title="Authority Bloggers"
          bgImage="https://wp.authoritybloggers.com/wp-content/uploads/2022/02/authoritybloggers.png"
          id={styles.home_hero}
        >
          <p>
            The leading Hive Blockchain community for professional bloggers, content creators,
            and online marketers.
          </p>
        </Hero>
       
        <Posts
          posts={posts.nodes}
          heading="Latest Posts"
          intro="Browse the latest posts from the Authority Bloggers Community"
          headingLevel="h2"
          postTitleLevel="h3"
          id={styles.post_list}
        />
        <CTA
          title="Questions or comments?"
          buttonText="Join the discussion on Hive"
          buttonURL="https://peakd.com/c/hive-103257"
          headingLevel="h2"
        >
        </CTA>
      </main>
      <Footer copyrightHolder={generalSettings.title} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
  });
}
