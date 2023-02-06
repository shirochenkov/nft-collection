import { FC, useEffect } from "react";

import { useRouter } from "next/router";

import { useForm, SubmitHandler } from "react-hook-form";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import styles from "./SearchForm.module.css";

export type SearchFormProps = {
  onSearch: (data?: string) => void;
};

type FormValues = {
  search?: string;
};

export const SearchForm: FC<SearchFormProps> = ({ onSearch }) => {
  const router = useRouter();
  const search = router.query.search as string | undefined;

  const { register, handleSubmit, setValue, watch } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = ({ search }) => {
    router.push(
      {
        pathname: router.pathname,
        query: { search },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    if (router.isReady) {
      setValue("search", search);
      onSearch(search);
    }
  }, [router.isReady, search]);

  const handleClear = () => {
    setValue("search", "");
  };

  return (
    <div className={styles.container}>
      <Input
        {...register("search")}
        placeholder="Search by address"
        autoComplete="off"
        hasValue={!!watch("search")}
        clearValue={handleClear}
      />
      <Button onClick={handleSubmit(onSubmit)} />
    </div>
  );
};
