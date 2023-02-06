import type { NextApiRequest, NextApiResponse } from "next";

import { fetcher } from "@/helpers";

const API_URL = "https://dev.solhall.io/v1";

type NftsType = {
  key: number;
  address: string;
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  primarySaleHappened: number;
  isMutable: number;
  updateAuthority: string;
  creators: {
    address: string;
    verified: number;
    share: number;
  }[];
};

type CollectionType = {
  blockchain: string;
  nfts: NftsType[];
};

type CollectionAPIType = { data: CollectionType; error: string };

type CollectionByUpdateAuthorityType = { [key: string]: NftsType[] };

type NftMetadataType = {
  metadata: {
    name: string;
    image: string;
  };
};

type NftMetadataAPIType = { data: NftMetadataType };

type collectionsNameAndImgType = {
  updateAuthority: string;
  name?: string;
  imageSrc?: string;
};

export type CollectionDataType = {
  data?: collectionsNameAndImgType[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CollectionDataType>
) {
  const { pid } = req.query;

  const { data, error } = await fetcher<CollectionAPIType>(
    `${API_URL}/nft/solana/address/${pid}`
  );

  if (error) {
    return res.status(400).send({ error });
  }

  const collectionsByUpdateAuthority =
    data?.nfts?.reduce<CollectionByUpdateAuthorityType>((acc, curr) => {
      const { updateAuthority } = curr;
      if (!acc[updateAuthority]) acc[updateAuthority] = [];
      acc[updateAuthority].push(curr);
      return acc;
    }, {});

  const collectionEntries = Object.entries(collectionsByUpdateAuthority);
  const collectionPromises = collectionEntries.map(([, [firstNft]]) =>
    fetcher<NftMetadataAPIType>(
      `${API_URL}/nft/solana/metadata/?nftAddress=${firstNft.address}&url=${firstNft.uri}&holderAddress=${pid}`
    )
  );

  const promisesResult = await Promise.allSettled(collectionPromises);

  const collectionsNameAndImg: collectionsNameAndImgType[] = promisesResult.map(
    (result, index) => {
      const updateAuthority = collectionEntries[index][0];
      if (result.status === "fulfilled") {
        const successResult =
          result as PromiseFulfilledResult<NftMetadataAPIType>;
        const { name, image } = successResult.value.data?.metadata || {};
        return { updateAuthority, name, imageSrc: image };
      }

      return { updateAuthority };
    }
  );

  res.status(200).json({ data: collectionsNameAndImg });
}
