import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getStationsGeoJson } from "@vavassor/nws-client";
import { useTranslation } from "react-i18next";
import { usePoint } from "../Forecast/usePoint";

export const StationsSection = () => {
  const { state } = usePoint();
  const { data: stations } = useQuery(
    ["stations"],
    () =>
      getStationsGeoJson({
        limit: 25,
        state: [state!],
      }),
    { enabled: !!state }
  );
  const { t } = useTranslation("station");

  return (
    <Box as="section" borderRadius="lg" borderWidth="1px" py={4}>
      <Heading as="h2" px={8} size="lg">
        {t("stationsSection.heading")}
      </Heading>
      {!!stations && (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>{t("stationsSection.idTableHeader")}</Th>
                <Th>{t("stationsSection.nameTableHeader")}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {stations?.features.map((station) => (
                <Tr key={station.properties.stationIdentifier}>
                  <Td>{station.properties.stationIdentifier}</Td>
                  <Td>{station.properties.name}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};
