import { useState } from "react";
import useSWR from "swr";

import Head from "next/head";

import { SearchForm } from "@/components/SearchForm";
import { SkeletonLayer } from "@/components/SkeletonLayer";
import { Card } from "@/components/Card";
import { fetcher } from "@/helpers";
import { CollectionDataType } from "@/pages/api/nft-collection/[pid]";

import styles from "@/styles/Home.module.css";

export default function Home() {
  const [nftCollection, setNftCollection] = useState<string>();

  const { data, isLoading } = useSWR<CollectionDataType>(
    nftCollection ? `/api/nft-collection/${nftCollection}` : null,
    fetcher
  );
  const { data: collections, error } = data || {};

  const handleSearch = (data?: string) => {
    setNftCollection(data);
  };

  return (
    <>
      <Head>
        <title>NFT-collection</title>
        <meta name="description" content="Search NFT-collection" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div>
          <div className={styles.header}>
            Search <span>NFT-collection</span> by address
          </div>
          <SearchForm onSearch={handleSearch} />
        </div>

        <div className={styles.collections}>
          {error && <span className={styles.status}>{error}</span>}
          {isLoading && <span className={styles.status}>Wait a bit…</span>}
          {collections && (
            <div className={styles.collectionHeader}>
              My collections{" "}
              <span className={styles.status}>{collections.length}</span>
            </div>
          )}
          <div className={styles.grid}>
            {isLoading && <SkeletonLayer count={4} />}
            {collections?.map((collection) => (
              <Card key={collection.updateAuthority} {...collection} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
