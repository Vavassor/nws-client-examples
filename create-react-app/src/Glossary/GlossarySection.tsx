import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getGlossary } from "@vavassor/nws-client";
import { FC, Fragment, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

interface FormValues {
  search: string;
}

export const GlossarySection: FC = () => {
  const { data: glossary } = useQuery(["glossary"], () => getGlossary({}));
  const { t } = useTranslation("glossary");
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit((values) => {
    setUrlSearchParams(values.search ? { query: values.search } : undefined);
  });

  const filteredDefinitions = useMemo(
    () =>
      glossary?.glossary.filter((definition) => {
        const query = urlSearchParams.get("query");
        return query
          ? definition.term
              .toLocaleLowerCase()
              .includes(query.toLocaleLowerCase())
          : true;
      }),
    [glossary, urlSearchParams]
  );

  return (
    <Box as="section" borderRadius="lg" borderWidth="1px" px={8} py={4}>
      <Heading as="h1" size="lg">
        {t("glossarySection.heading")}
      </Heading>
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={!!errors.search}>
          <FormLabel>{t("glossarySection.searchFieldLabel")}</FormLabel>
          <Input {...register("search")} />
          <FormErrorMessage>
            {errors.search && errors.search.message}
          </FormErrorMessage>
        </FormControl>
        <Button isLoading={isSubmitting} mt={4} type="submit">
          {t("glossarySection.submitButtonLabel")}
        </Button>
      </form>
      <dl>
        {filteredDefinitions &&
          filteredDefinitions.map((definition) => (
            <Fragment
              key={`${definition.term}-${definition.definition.length}`}
            >
              <Text as="dt" fontWeight="semibold" mt={4}>
                {definition.term}
              </Text>
              <dd dangerouslySetInnerHTML={{ __html: definition.definition }} />
            </Fragment>
          ))}
      </dl>
    </Box>
  );
};
