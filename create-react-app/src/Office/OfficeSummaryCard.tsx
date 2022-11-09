import { Box, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getOffice } from "@vavassor/nws-client";
import React, { FC } from "react";

interface Props {
  officeId: string | undefined;
}

export const OfficeSummaryCard: FC<Props> = ({ officeId }) => {
  const { data: office } = useQuery(
    ["office", officeId],
    () => getOffice({ officeId: officeId! }),
    {
      enabled: !!officeId,
    }
  );

  return (
    <Box as="section" borderRadius="lg" borderWidth="1px" py={4}>
      {!!office && (
        <>
          <Heading as="h1" px={8} size="lg">
            {`NWS Forecast Office ${office.name}`}
          </Heading>
          <Box as="address" fontStyle="normal" mt={4} px={8}>
            {`Address ${office.address.streetAddress} ${office.address.addressLocality}, ${office.address.addressRegion} ${office.address.postalCode}`}
            <br />
            {`Telephone ${office.telephone}`}
            <br />
            {`Fax ${office.faxNumber}`}
          </Box>
        </>
      )}
    </Box>
  );
};
